package com.beam.emcryptgw.security;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouterValidator {

    public static final List<String> publicApis = List.of(
            "/api/gw/auth/authenticate",
            "/api/gw/auth/forgot",
            "/api/gw/auth/otp-reader",
            "/api/gw/auth/authenticate-reader",
            "/api/adm/user/activate",
            "/api/ekm/emkey/encrypt-key-html",
            "/api/ekm/emkey/decrypt-key",
            "/api/inb/email/save",
            "/api/inb/email/options",
            "/api/inb/email/decrypt-read",
            "/api/inb/email/decrypt-attachment"
    );

    public Predicate<String> isSecured =
            path -> publicApis
                    .stream()
                    .noneMatch(uri -> path.contains(uri));
}
