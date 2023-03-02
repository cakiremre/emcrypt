package com.example.emcryptcomm.repository;

import com.beam.emcryptcore.model.comm.mail.Mail;
import com.beam.emcryptcore.model.comm.mail.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface MailRepository extends MongoRepository<Mail, String> {

    List<Mail> findFirst1000ByStatusAndTriedLessThanAndEstimatedBefore(Status pending, int count, Date estimated);
}
