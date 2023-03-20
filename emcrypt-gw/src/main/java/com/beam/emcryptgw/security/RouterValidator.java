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
            "/api/box/emkey/encrypt-key-html",
            "/api/box/emkey/decrypt-key",
            "/api/box/email/save",
            "/api/box/email/options",
            "/api/box/email/decrypt-read",
            "/api/box/email/decrypt-attachment"
    );

    public Predicate<String> isSecured =
            path -> publicApis
                    .stream()
                    .noneMatch(uri -> path.contains(uri));
}
