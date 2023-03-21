package com.beam.emcryptbox.config;

import com.beam.emcryptcore.db.DbConfigurerInterceptor;
import com.beam.emcryptcore.service.JwtService;
import com.jlefebure.spring.boot.minio.MinioConfigurationProperties;
import com.jlefebure.spring.boot.minio.MinioService;
import io.minio.MinioClient;
import io.minio.errors.InvalidEndpointException;
import io.minio.errors.InvalidPortException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Value("${spring.minio.url}")
    private String url;

    @Value("${spring.minio.bucket}")
    private String bucket;

    @Value("${spring.minio.access-key}")
    private String accessKey;

    @Value("${spring.minio.secret-key}")
    private String secretKey;


    @Bean
    public DbConfigurerInterceptor dbConfigurerInterceptor(){
        return new DbConfigurerInterceptor(jwtService());
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addWebRequestInterceptor(dbConfigurerInterceptor());
    }


    @Bean
    public JwtService jwtService(){
        return new JwtService();
    }

    @Bean
    public MinioClient minioClient() throws InvalidPortException, InvalidEndpointException {
        return new MinioClient(url, accessKey, secretKey);
    }
    @Bean
    public MinioService minioService(){
        return new MinioService();
    }

    @Bean
    public MinioConfigurationProperties minioConfigurationProperties(){
        MinioConfigurationProperties props = new MinioConfigurationProperties();
        props.setUrl(url);
        props.setBucket(bucket);
        props.setAccessKey(accessKey);
        props.setSecretKey(secretKey);
        return props;
    }
}