package com.example.emcryptweb.config;

import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Collections;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Bean
    ErrorViewResolver redirectToIndex() {
        return (request, status, model) -> status == HttpStatus.NOT_FOUND
                ? new ModelAndView("forward:/", Collections.<String, Object>emptyMap(), HttpStatus.OK)
                : null;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/webaddin/resources/**")
                .addResourceLocations("classpath:/webaddin/");
    }
}