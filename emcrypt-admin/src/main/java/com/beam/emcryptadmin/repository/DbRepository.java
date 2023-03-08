package com.beam.emcryptadmin.repository;

import com.beam.emcryptcore.model.admin.tenant.Db;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DbRepository extends MongoRepository<Db, String> {
    Optional<Db> findByTenant(String tenant);

}
