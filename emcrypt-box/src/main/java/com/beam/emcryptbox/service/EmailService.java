package com.beam.emcryptbox.service;

import com.beam.emcryptbox.repository.EmailRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.box.DecryptRequest;
import com.beam.emcryptcore.dto.box.KeyResponse;
import com.beam.emcryptcore.model.box.mail.Attachment;
import com.beam.emcryptcore.model.box.mail.Decrypted;
import com.beam.emcryptcore.model.box.mail.Email;
import com.beam.emcryptcore.model.box.mail.Options;
import com.jlefebure.spring.boot.minio.MinioException;
import com.jlefebure.spring.boot.minio.MinioService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.nio.charset.Charset;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService extends BaseService<EmailRepository, Email> {

    private final EmKeyService emKeyService;
    private final DecryptionService decryptionService;

    private final MinioService minioService;

    @Override
    public Email create(Email item) {
        if (item.getAttachments().size() > 0) {
            String pathPrefix = item.getIdentifier() + "/" + item.getFrom().getAddress();
            item.getAttachments().forEach(attachment -> {
                String filename = pathPrefix + "/" + UUID.randomUUID().toString() + "." + FilenameUtils.getExtension(attachment.getName());
                ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(Base64.getDecoder().decode(attachment.getData()));
                try {
                    minioService.upload(Paths.get(filename), byteArrayInputStream, attachment.getFormat());
                    attachment.setData(filename);
                } catch (MinioException e) {
                    log.error(e.getMessage());
                    e.printStackTrace();
                    throw new RuntimeException(e);
                }
            });
        }
        return super.create(item);
    }

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

    public GenericResponse<Decrypted> readDecrypted(String messageId, String tenant, String address) {
        Optional<Email> query = repository.findById(messageId);
        if (query.isPresent()) {
            Email email = query.get();
            email.getAttachments().forEach(attachment -> attachment.setData(null));

            KeyResponse<String> response = emKeyService.decryptKey(tenant, DecryptRequest.builder()
                    .key(email.getKey())
                    .address(address)
                    .messageId(messageId)
                    .build());
            switch (response.getCode()) {
                case 0:
                    String aesKeyAndIV = response.getData();
                    try {
                        byte[] content = decryptionService.decryptMessage(email.getData(), aesKeyAndIV);
                        String html = new String(content, Charset.forName("UTF-8"));

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
                        return GenericResponse.code(204);
                    }
                default:
                case 404:
                    log.error("Email not found. [Id: {}]", messageId);
                    return GenericResponse.code(404);
                case 500:
                    log.info("Access is delayed");
                    return GenericResponse.code(205);
                case 501:
                    log.info("Access is expired");
                    return GenericResponse.code(206);
                case 502:
                    log.info("Access is revoked from user");
                    return GenericResponse.code(207);
                case 503:
                    log.info("Forward not allowed");
                    return GenericResponse.code(208);
            }
        } else {
            log.error("Email not found. [Id: {}]", messageId);
            return GenericResponse.code(404);
        }
    }

    public ResponseEntity<byte[]> readAttachment(String messageId, String tenant, String attachmentId, String address) {
        Optional<Email> query = repository.findById(messageId);
        if (query.isPresent()) {
            Email email = query.get();
            KeyResponse<String> response = emKeyService.decryptKey(tenant, DecryptRequest.builder()
                    .key(email.getKey())
                    .address(address)
                    .messageId(messageId)
                    .build());

            switch (response.getCode()) {
                case 0:
                    String aesKeyAndIV = response.getData();
                    try {
                        Optional<Attachment> attachmentQ = email.getAttachments().stream()
                                .filter(attachment -> attachment.getId().equals(attachmentId))
                                .findFirst();
                        if (attachmentQ.isPresent()) {
                            // read data from minio
                            byte[] encrypted = IOUtils.toByteArray(minioService.get(Paths.get(attachmentQ.get().getData())));
                            byte[] plain = decryptionService.decryptMessage(encrypted, aesKeyAndIV);
                            return ResponseEntity.ok(Base64.getDecoder().decode(plain));
                        } else {
                            return ResponseEntity
                                    .notFound()
                                    .build();
                        }
                    } catch (Exception exc) {
                        log.error("Message could not be encrypted. [Id: {}, Message: {}]", messageId, exc.getMessage());
                        exc.printStackTrace();
                        return ResponseEntity.status(204).build();
                    }
                default:
                case 404:
                    log.error("Email not found. [Id: {}]", messageId);
                    return ResponseEntity.notFound().build();
                case 500:
                    log.info("Access is delayed");
                    return ResponseEntity.status(205).build();
                case 501:
                    log.info("Access is expired");
                    return ResponseEntity.status(206).build();
                case 502:
                    log.info("Access is revoked from user");
                    return ResponseEntity.status(207).build();
                case 503:
                    log.info("Forward not allowed");
                    return ResponseEntity.status(208).build();
            }
        } else {
            log.error("Email not found. [Id: {}]", messageId);
            return ResponseEntity.notFound().build();
        }
    }


}
