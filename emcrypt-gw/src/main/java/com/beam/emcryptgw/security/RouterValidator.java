package com.beam.emcryptgw.security;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;

@Component
public class RouterValidator {

    public static final List<String> publicApis = List.of(
            "/api/g/auth/authenticate"
    );

    public Predicate<String> isSecured =
            path -> publicApis
                    .stream()
                    .noneMatch(uri -> path.contains(uri));
}
