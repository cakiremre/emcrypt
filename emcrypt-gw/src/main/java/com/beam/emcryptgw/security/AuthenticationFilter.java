package com.beam.emcryptgw.security;


import com.beam.emcryptcore.model.auth.Role;
import com.beam.emcryptcore.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Objects;

import static com.beam.emcryptcore.service.JwtService.CLAIM_ROLE_KEY;
import static com.beam.emcryptcore.service.JwtService.CLAIM_TENANT_KEY;
import static com.beam.emcryptgw.security.RoleResolver.resolve;

@RequiredArgsConstructor
@RefreshScope
@Component
@Slf4j
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

    private final RouterValidator routerValidator;
    private final JwtService jwtService;

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            if (routerValidator.isSecured.test(exchange.getRequest().getPath().value())) {
                if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
                    throw new RuntimeException("Missing Authorisation Header");
                }

                String authHeader = Objects.requireNonNull(exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION)).get(0);
                String token = authHeader.substring(7);
                try {
                    jwtService.validateToken(token);

                    // If user is not ADMIN = > then add header
                    List<Role> roles = resolve((List<LinkedHashMap<String, String>>) jwtService.extractClaim(token, claims -> claims.get(CLAIM_ROLE_KEY)));

                    if (!roles.contains(Role.admin())) {
                        String identifier = jwtService.extractClaim(token, claims -> claims.get(CLAIM_TENANT_KEY).toString());
                        ServerHttpRequest request = exchange.getRequest()
                                .mutate()
                                .header("X-TENANT", identifier)
                                .build();
                        return chain.filter(exchange.mutate().request(request).build());
                    }
                } catch (Exception ex) {
                    log.error("Error Validating Authentication Header", ex);
                    ServerHttpResponse response = exchange.getResponse();
                    response.setStatusCode(HttpStatus.UNAUTHORIZED);
                    return response.setComplete();
                }
            }

            return chain.filter(exchange);
        });


    }


    public static class Config {


    }
}
