package com.beam.emcryptbox.repository;

import com.beam.emcryptcore.model.box.mail.Email;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmailRepository extends MongoRepository<Email, String> {
    List<Email> findByFromAddress(String username);
}
