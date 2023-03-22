package com.beam.emcryptbox.repository;

import com.beam.emcryptcore.model.admin.mail.Content;
import com.beam.emcryptcore.model.admin.mail.Type;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ContentRepository extends MongoRepository<Content, String> {
    Optional<Content> findByType(Type type);
}
