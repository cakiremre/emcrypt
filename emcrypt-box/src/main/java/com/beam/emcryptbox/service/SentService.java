package com.beam.emcryptbox.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.box.mail.Email;
import com.beam.emcryptbox.repository.EmailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class SentService extends BaseService<EmailRepository, Email> {

    public List<Email> findAll(String username) {
        List<Email> emails = repository.findByFromAddress(username);
        emails.forEach(email -> email.clearPayload()); // clear attachment-key-data
        return emails;
    }

    public GenericResponse<Email> revoke(String messageId, String address) {
        Optional<Email> query = repository.findById(messageId);
        if(query.isPresent()){
            Email email = query.get();
            email.recipients().forEach(recipient -> {
                if(recipient.getAddress().equals(address)){
                    recipient.setRevoked(true);
                }
            });
            repository.save(email);
            email.clearPayload();
            return GenericResponse.success(email);
        }else{
            return GenericResponse.code(404);
        }
    }
}
