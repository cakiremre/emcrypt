package com.beam.emcryptgw.security;


import com.beam.emcryptgw.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;

import java.util.Objects;

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
				}
				catch (Exception ex) {
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
