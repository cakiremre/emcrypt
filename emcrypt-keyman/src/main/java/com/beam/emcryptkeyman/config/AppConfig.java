package com.beam.emcryptkeyman.config;

import com.beam.emcryptcore.db.DbConfigurerInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Bean
    public DbConfigurerInterceptor dbConfigurerInterceptor(){
        return new DbConfigurerInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addWebRequestInterceptor(dbConfigurerInterceptor());
    }
}
