package com.beam.emcryptinbox.repository;

import com.beam.emcryptcore.model.inbox.Email;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmailRepository extends MongoRepository<Email, String> {
}
