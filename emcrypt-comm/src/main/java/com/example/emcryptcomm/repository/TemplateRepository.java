package com.example.emcryptcomm.repository;

import com.beam.emcryptcore.model.comm.mail.Template;
import com.beam.emcryptcore.model.comm.mail.Type;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TemplateRepository extends MongoRepository<Template, String> {
    Template findByType(Type type);
}
