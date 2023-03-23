package com.beam.emcryptadmin.repository;

import com.beam.emcryptcore.model.admin.tenant.Endpoint;
import com.beam.emcryptcore.model.admin.tenant.Type;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EndpointRepository extends MongoRepository<Endpoint, String> {
    <T extends Endpoint> T findByType(Type type);

    void deleteByType(Type type);

}
