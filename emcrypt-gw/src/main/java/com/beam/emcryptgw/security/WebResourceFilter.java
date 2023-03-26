package com.beam.emcryptgw.security;


import com.beam.emcryptcore.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;

@RequiredArgsConstructor
@RefreshScope
@Component
@Slf4j
public class WebResourceFilter extends AbstractGatewayFilterFactory<WebResourceFilter.Config> {

    private final JwtService jwtService;

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            // get/set tenant for webaddin clients
            List<String> tenantHeaders = exchange.getRequest().getHeaders().get("X-TENANT");

            if (tenantHeaders == null || tenantHeaders.size() == 0) {
                String originalHost = null;
                List<String> xForwardedHostHeaders = exchange.getRequest().getHeaders().get("X-Forwarded-Host");
                if(xForwardedHostHeaders.size() > 0){
                    originalHost = xForwardedHostHeaders.get(0);
                }else{
                    originalHost = exchange.getRequest().getURI().getHost();
                }
                String tenant = originalHost.substring(0, originalHost.indexOf("."));
                if (StringUtils.hasText(tenant)) {
                    ServerHttpRequest request = exchange.getRequest()
                            .mutate()
                            .header("X-TENANT", tenant)
                            .build();
                    return chain.filter(exchange.mutate().request(request).build());
                }
            }
            return chain.filter(exchange);
        });


    }

    public static class Config {


    }
}
