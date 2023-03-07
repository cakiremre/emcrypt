package com.beam.emcryptadmin.repository;

import com.beam.emcryptcore.model.admin.Tenant;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TenantRepository extends MongoRepository<Tenant, String> {
}
