package com.example.emcryptcomm.service;

import com.beam.emcryptcore.dto.comm.mail.Options;
import com.beam.emcryptcore.model.comm.mail.Recipient;
import com.beam.emcryptcore.model.comm.mail.Type;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MailServiceTest {

    @Autowired
    private MailService mailService;

    @Test
    public void testMail() {
        mailService.singleSend(Recipient.builder()
                .firstName("emre")
                .lastName("cakir")
                .email("emre@beamteknoloji.com")
                .build(),
                Type.TEST,
                Options.builder().saved(false).build());
    }

    @Test
    public void testActivation() {
        mailService.singleSend(Recipient.builder()
                        .firstName("emre")
                        .lastName("cakir")
                        .email("emre@beamteknoloji.com")
                        .build(),
                Type.ACTIVATION,
                Options.<String>builder()
                        .data("linklinklink")
                        .saved(true)
                        .build());
    }
}
