package com.example.emcryptcomm.service;

import com.beam.emcryptcore.model.comm.mail.Mail;
import com.beam.emcryptcore.model.comm.mail.Status;
import com.example.emcryptcomm.repository.MailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class TaskService {

    private final MailRepository mailRepository;
    private final MailService mailService;

    @Scheduled(fixedRate = 5000)
    public void sendStoredMails() {
        List<Mail> mails = mailRepository.findFirst1000ByStatusAndTriedLessThanAndEstimatedBefore(Status.PENDING, 24, new Date());

        if (mails.size() > 0) {
            mails.forEach(mail -> mailService.sendMail(mail, true));
        }
    }


}
