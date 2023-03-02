package com.beam.emcryptgw.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;

@Configuration
public class RouteConfig {


    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route(p -> p
                        .path("/", "/*.css", "/*.js")
                        .uri("lb://web")
                )
                .route( p -> p
                        .path("/api/comm/**")
                        .uri("lb://comm")
                )
                .route(p -> p
                        .path("/eureka/web")
                        .filters(f->f.setPath("/"))
                        .uri("http://localhost:8761")
                )
                .route(p -> p
                        .path("/eureka/**")
                        .uri("http://localhost:8761")
                )
                .route(p -> p
                        .predicate(r -> r.getRequest().getHeaders().getAccept().contains(MediaType.TEXT_HTML))
                        .uri("lb://web")
                )
                .build();
    }

}
