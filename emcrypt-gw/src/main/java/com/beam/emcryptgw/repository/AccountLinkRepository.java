package com.beam.emcryptgw.repository;

import com.beam.emcryptcore.model.auth.AccountLink;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AccountLinkRepository extends MongoRepository<AccountLink, String> {
    AccountLink findByLink(String link);
}
