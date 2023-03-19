package com.beam.emcryptinbox.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.model.inbox.Email;
import com.beam.emcryptinbox.repository.EmailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SentService extends BaseService<EmailRepository, Email> {

    public List<Email> findAll(String username) {
        return repository.findByFromAddress(username);
    }
}
