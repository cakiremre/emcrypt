package com.beam.emcryptcore.model.common;


import com.beam.emcryptcore.model.comm.mail.Sender;

/**
 * These will be dynamic later.
 * */
public class Settings {
    public static final Sender DEFAULT_SENDER = Sender.builder()
            .firstName("Team")
            .lastName("Encrypt")
            .email("team@emcrypt.com")
            .build();

    public static final Language DEFAULT_LANGUAGE = Language.TR;
}
