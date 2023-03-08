package com.beam.emcryptadmin.config;

import com.beam.emcryptadmin.util.DbConfigurerInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class AppConfig implements WebMvcConfigurer {

    private final DbConfigurerInterceptor dbConfigurerInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addWebRequestInterceptor(dbConfigurerInterceptor);
    }
}
