package com.beam.emcryptinbox.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.keyman.DecryptRequest;
import com.beam.emcryptcore.dto.keyman.KeyResponse;
import com.beam.emcryptcore.model.inbox.Decrypted;
import com.beam.emcryptcore.model.inbox.Email;
import com.beam.emcryptinbox.repository.EmailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService extends BaseService<EmailRepository, Email> {

    private final KeyManService keyManService;
    private final DecryptionService decryptionService;

    public GenericResponse<Decrypted> readDecrypted(String messageId, String tenant) {
        Optional<Email> query = repository.findById(messageId);
        if (query.isPresent()) {
            Email email = query.get();

            KeyResponse<String> response = keyManService.decryptKey(tenant, DecryptRequest.builder()
                    .key(email.getKey())
                    .owner(tenant)
                    .build());

            if(response.getCode() == 0){
                String aesKeyAndIV = response.getData();
                try {
                    String html = decryptionService.decryptMessage(email.getData(), aesKeyAndIV);

                    return GenericResponse.<Decrypted>builder()
                            .code(0)
                            .data(Decrypted.builder()
                                    .from(email.getFrom())
                                    .subject(email.getSubject())
                                    .content(html)
                                    .build())
                            .build();
                }catch (Exception exc){
                    log.error("Message could not be encrypted. [Id: {}, Message: {}]", messageId, exc.getMessage());
                    exc.printStackTrace();
                    return GenericResponse.code(101);
                }
            }else{
                log.error("Key could not be decrypted. [Id: {}]", messageId);
                return GenericResponse.code(100);
            }
        } else {
            log.error("Email not found. [Id: {}]", messageId);
            return GenericResponse.code(404);
        }
    }
}
