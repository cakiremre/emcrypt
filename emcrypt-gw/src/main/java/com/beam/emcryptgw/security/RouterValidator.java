package com.beam.emcryptgw.security;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouterValidator {

    public static final List<String> publicApis = List.of(
            "/api/gw/auth/authenticate",
            "/api/gw/auth/forgot",
            "/api/adm/user/activate",
            "/api/ekm/emkey/encrypt-key-html",
            "/api/ekm/emkey/decrypt-key"
    );

    public Predicate<String> isSecured =
            path -> publicApis
                    .stream()
                    .noneMatch(uri -> path.contains(uri));
}
