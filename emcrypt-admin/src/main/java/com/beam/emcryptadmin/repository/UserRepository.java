package com.beam.emcryptadmin.repository;

import com.beam.emcryptcore.model.admin.company.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
