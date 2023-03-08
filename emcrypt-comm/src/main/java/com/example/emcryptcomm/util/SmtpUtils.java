package com.example.emcryptcomm.util;

import com.beam.emcryptcore.model.comm.mail.Sender;
import com.beam.emcryptcore.model.admin.tenant.Smtp;
import jakarta.mail.Authenticator;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

@Component
public class SmtpUtils {

    @Value("${app.mail.host}")
    private String host;

    @Value("${app.mail.port}")
    private int port;

    @Value("${app.mail.auth}")
    private boolean auth;

    @Value("${app.mail.ssl}")
    private boolean ssl;

    public JavaMailSender getSender() {
        JavaMailSenderImpl sender = new JavaMailSenderImpl();
        sender.setSession(getSession());
        return sender;
    }

    private Session getSession() {
        Smtp smtp = getConfig();
        Properties properties = new Properties();

        properties.put("mail.smtp.host", smtp.getHost());
        properties.put("mail.smtp.port", smtp.getPort());
        properties.put("mail.smtp.auth", smtp.isAuth());
        properties.put("mail.smtp.connectiontimeout", 50000);
        properties.put("mail.smtp.timeout", 50000);

        if (smtp.isSsl()) {
            properties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
        }

        if (smtp.isAuth()) {
            return Session.getInstance(properties, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(smtp.getUsername(), smtp.getPassword());
                }
            });
        } else {
            return Session.getInstance(properties);
        }

    }

    private Smtp getConfig() {
        return Smtp.builder()
                .host(host)
                .port(port)
                .ssl(ssl)
                .build();
    }

    public static InternetAddress convertSenderToInternetAddress(Sender sender) throws UnsupportedEncodingException {
        return new InternetAddress(sender.getEmail(), sender.getFullName(), "UTF-8");

    }

    public static <T extends Sender> InternetAddress[] convertSendersToInternetAddresses(List<T> senderList) {
        return senderList.stream()
                .map(sender -> {
                    try {
                        return convertSenderToInternetAddress(sender);
                    }catch (UnsupportedEncodingException exc){
                        return "";
                    }
                })
                .filter(r -> !r.equals(""))
                .collect(Collectors.toList())
                .toArray(InternetAddress[]::new);
    }
}
