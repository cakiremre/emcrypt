package com.beam.emcryptgw.config;

import com.beam.emcryptgw.security.AuthenticationFilter;
import com.beam.emcryptgw.security.WebResourceFilter;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;

@Configuration
public class RouteConfig {


    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder, AuthenticationFilter authFilter, WebResourceFilter webResourceFilter) {
        return builder.routes()
                .route(p -> p
                        .path("/", "/*.css", "/*.js")
                        .uri("lb://web.emc")
                )
                .route(p -> p
                        .path("/webaddin/**")
                        .filters(f -> f.filter(webResourceFilter.apply(new WebResourceFilter.Config())))
                        .uri("lb://web.emc")
                )
                .route( p -> p
                        .path("/api/comm/**")
                        .filters(f->f.filter(authFilter.apply(new AuthenticationFilter.Config())))
                        .uri("lb://comm.emc")
                )
                .route( p -> p
                        .path("/api/adm/**")
                        .filters(f->f.filter(authFilter.apply(new AuthenticationFilter.Config())))
                        .uri("lb://admin.emc")
                )
                .route( p -> p
                        .path("/api/box/**")
                        .filters(f->f
                                .filter(authFilter.apply(new AuthenticationFilter.Config()))
                                .filter(webResourceFilter.apply(new WebResourceFilter.Config())))
                        .uri("lb://box.emc")
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
                        .uri("lb://web.emc")
                )
                .build();
    }

}
