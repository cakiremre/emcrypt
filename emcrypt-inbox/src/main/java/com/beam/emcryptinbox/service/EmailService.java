package com.beam.emcryptinbox.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.model.inbox.Email;
import com.beam.emcryptinbox.repository.EmailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class EmailService extends BaseService<EmailRepository, Email> {
}
