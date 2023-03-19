package com.beam.emcryptgw.repository;

import com.beam.emcryptcore.model.auth.Otp;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OtpRepository extends MongoRepository<Otp, String> {
    Optional<Otp> findByAddress(String address);
}


