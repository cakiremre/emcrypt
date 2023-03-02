package com.example.emcryptcomm.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.comm.exception.TemplateException;
import com.beam.emcryptcore.model.comm.mail.*;
import com.example.emcryptcomm.repository.MailRepository;
import com.example.emcryptcomm.util.SmtpUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.*;

import static com.beam.emcryptcore.model.comm.exception.TemplateException.CONTENT_NOT_FOUND;
import static com.beam.emcryptcore.model.comm.exception.TemplateException.NOT_FOUND;
import static com.example.emcryptcomm.util.SmtpUtils.convertSenderToInternetAddress;
import static com.example.emcryptcomm.util.SmtpUtils.convertSendersToInternetAddresses;
import static jakarta.mail.Message.RecipientType.TO;

@RequiredArgsConstructor
@Slf4j
@Service
public class MailService extends BaseService<MailRepository, Mail> {

    private final TemplateService templateService;
    private final SmtpUtils smtpUtils;

    public List<Result> multipleSend(List<Recipient> recipientList, Type type, Options options) {
        List<Result> results = new ArrayList<>();
        recipientList.forEach(r -> results.add(singleSend(r, type, options)));
        return results;
    }

    public Result singleSend(Recipient recipient, Type type, Options options) {
        Template template = templateService.findByType(type);
        Assert.notNull(template, String.format(NOT_FOUND, type));

        try {
            Content content = template.language(recipient.getPrefer())
                    .copy();

            switch (type) {
                case TEST -> content.transformBody("{{fullName}}", recipient.getFullName());
                case ACTIVATION, FORGOT -> {
                    content.transformBody("{{fullName}}", recipient.getFullName());
                    content.transformBody("{{link}}", options.getData().toString());
                }
            }

            // generate mail
            Mail mail = Mail.builder()
                    .recipient(Arrays.asList(recipient))
                    .estimated(new Date())
                    .content(content)
                    .priority(Mail.HIGH)
                    .sender(template.getSender())
                    .status(Status.PENDING)
                    .type(type)
                    .build();

            // store or send
            if (options.isSaved()) {
                mail.setId(UUID.randomUUID().toString());
                mail = repository.save(mail);
                return Result.builder()
                        .id(mail.getId())
                        .status(mail.getStatus())
                        .build();
            } else {
                sendMail(mail, options.isSaved());
                return Result.builder()
                        .status(Status.SENT)
                        .build();
            }
        } catch (TemplateException exc) {
            log.error(exc.getMessage());
            exc.printStackTrace();

            return Result.builder()
                    .status(Status.ERROR)
                    .message(String.format(CONTENT_NOT_FOUND, template.getType()))
                    .build();
        } catch (MailException exc) {
            log.error(exc.getMessage());
            exc.printStackTrace();

            return Result.builder()
                    .status(Status.ERROR)
                    .message(exc.getMessage())
                    .build();
        }
    }

    public void sendMail(Mail mail, boolean stored) {
        JavaMailSender sender = smtpUtils.getSender();

        try {
            sender.send(mimeMessage -> {
                mimeMessage.setFrom(convertSenderToInternetAddress(mail.getSender()));
                mimeMessage.setRecipients(TO, convertSendersToInternetAddresses(mail.getRecipient()));
                mimeMessage.setSubject(mail.getContent().getSubject());
                mimeMessage.setContent(mail.getContent().getBody(), "text/html; charset=UTF-8");
            });
            mail.setStatus(Status.SENT);
        } catch (RuntimeException exc) {
            log.error(exc.getMessage());
            exc.printStackTrace();

            if (mail.getTried() < 5) {
                mail.incrementTryCount(1);
            } else {
                mail.setStatus(Status.ERROR);
            }
        } finally {

            if (stored) {
                repository.save(mail);
            }
        }

    }


    public GenericResponse<Result> status(String id) {
        Mail mail = repository.findById(id).orElse(null);
        if (mail == null) {
            return GenericResponse.<Result>builder()
                    .code(10)
                    .data(Result.builder()
                            .message("Mail with id not found")
                            .build())
                    .build();
        } else {
            return GenericResponse.<Result>builder()
                    .code(0)
                    .data(Result.builder()
                            .id(id)
                            .status(mail.getStatus())
                            .message("Tried: " + mail.getTried())
                            .build())
                    .build();
        }
    }
}
