package com.beam.emcryptcore.db;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AccountContext {
    public static final ThreadLocal<String> CONTEXT = new ThreadLocal<>();

    public static void setUsername(String username) {
        CONTEXT.set(username);
        log.debug("Setting account: " + username);
    }

    public static String getUsername() {
        return CONTEXT.get();
    }

    public static void clear() {
        CONTEXT.remove();
    }
}
