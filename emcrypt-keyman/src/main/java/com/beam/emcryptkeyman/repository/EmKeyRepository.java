package com.beam.emcryptkeyman.repository;

import com.beam.emcryptcore.model.keyman.EmKey;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface EmKeyRepository extends MongoRepository<EmKey, String> {
    Optional<EmKey> findByOwner(String owner);

    void deleteByOwner(String owner);
}
