package com.beam.emcryptkeyman.repository;

import com.beam.emcryptcore.model.keyman.mail.Content;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContentRepository extends MongoRepository<Content, String> {
}
