package com.beam.emcryptinbox.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.keyman.DecryptRequest;
import com.beam.emcryptcore.dto.keyman.KeyResponse;
import com.beam.emcryptcore.model.common.Accessible;
import com.beam.emcryptcore.model.inbox.*;
import com.beam.emcryptinbox.repository.EmailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService extends BaseService<EmailRepository, Email> {

    private final KeyManService keyManService;
    private final DecryptionService decryptionService;

    public GenericResponse<Options> readOptions(String messageId) {
        Optional<Email> query = repository.findById(messageId);
        if (query.isPresent()) {
            return GenericResponse.<Options>builder()
                    .code(0)
                    .data(query.get().getOptions())
                    .build();
        } else {
            return GenericResponse.code(404);
        }
    }

    public GenericResponse<Decrypted> readDecrypted(String messageId, String tenant) {
        Optional<Email> query = repository.findById(messageId);
        if (query.isPresent()) {
            Email email = query.get();
            email.getAttachments().forEach(attachment -> attachment.setData(null));

            KeyResponse<String> response = keyManService.decryptKey(tenant, DecryptRequest.builder()
                    .key(email.getKey())
                    .tenant(tenant)
                    .build());

            if (response.getCode() == 0) {
                String aesKeyAndIV = response.getData();
                try {
                    String html = decryptionService.decryptMessage(email.getData(), aesKeyAndIV);

                    return GenericResponse.<Decrypted>builder()
                            .code(0)
                            .data(Decrypted.builder()
                                    .from(email.getFrom())
                                    .subject(email.getSubject())
                                    .content(html)
                                    .attachments(email.getAttachments())
                                    .build())
                            .build();
                } catch (Exception exc) {
                    log.error("Message could not be encrypted. [Id: {}, Message: {}]", messageId, exc.getMessage());
                    exc.printStackTrace();
                    return GenericResponse.code(101);
                }
            } else {
                log.error("Key could not be decrypted. [Id: {}]", messageId);
                return GenericResponse.code(100);
            }
        } else {
            log.error("Email not found. [Id: {}]", messageId);
            return GenericResponse.code(404);
        }
    }

    public ResponseEntity<byte[]> readAttachment(String messageId, String tenant, String attachmentId) {
        Optional<Email> query = repository.findById(messageId);
        if (query.isPresent()) {
            Email email = query.get();
            KeyResponse<String> response = keyManService.decryptKey(tenant, DecryptRequest.builder()
                    .key(email.getKey())
                    .tenant(tenant)
                    .build());

            if (response.getCode() == 0) {
                String aesKeyAndIV = response.getData();
                try {
                    Optional<Attachment> attachmentQ = email.getAttachments().stream()
                            .filter(attachment -> attachment.getId().equals(attachmentId))
                            .findFirst();
                    if (attachmentQ.isPresent()) {
                        String data = decryptionService.decryptMessage(attachmentQ.get().getData(), aesKeyAndIV);
                        return ResponseEntity.ok(Base64.getDecoder().decode(data));
                    } else {
                        return ResponseEntity
                                .notFound()
                                .build();
                    }
                } catch (Exception exc) {
                    log.error("Message could not be encrypted. [Id: {}, Message: {}]", messageId, exc.getMessage());
                    exc.printStackTrace();
                    return ResponseEntity.status(501).build();
                }
            } else {
                log.error("Key could not be decrypted. [Id: {}]", messageId);
                return ResponseEntity.status(500).build();
            }
        } else {
            log.error("Email not found. [Id: {}]", messageId);
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Returns:
     * 0    => success
     * 404  => email not found
     * 500  => Access is delayed
     * 501  => Access is expired
     * 502  => Revoked from user
     * 503  => Forward not allowed
     */
    public GenericResponse shouldDecrypt(String messageId, String address) {
        Optional<Email> query = repository.findById(messageId);
        if (query.isPresent()) {
            Email email = query.get();

            /**
             * Cases:
             * 1. email could be delayed, or expired.
             * 2. check for original recipients if address exists
             * 3. if forward enabled, check for forward recipients.
             * */
            Accessible accessibleNow = email.getOptions().accessibleNow();
            if (accessibleNow == Accessible.TRUE) {
                List<Recipient> original = email.recipients();
                Optional<Recipient> rQuery = original.stream().filter(recipient -> recipient.getAddress().equals(address)).findFirst();

                if (rQuery.isPresent()) {
                    Recipient r = rQuery.get();
                    if (!r.isRevoked()) {
                        r.setAccessed(true);
                        repository.save(email);

                        return GenericResponse.success();
                    } else {
                        return GenericResponse.code(502);
                    }
                } else {
                    if (email.getOptions().isForward()) {
                        return GenericResponse.success();
                    } else {
                        return GenericResponse.code(503);
                    }
                }
            } else {
                return GenericResponse.code(accessibleNow == Accessible.DELAY ? 500 : 501);
            }
        } else {
            return GenericResponse.error(404, "Email not found");
        }
    }
}
