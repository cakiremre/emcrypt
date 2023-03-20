package com.beam.emcryptbox;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = {"com.beam.emcryptcore.service", "com.beam.emcryptbox.service"})
@RequiredArgsConstructor
@EnableDiscoveryClient
@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class EmcryptBoxApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmcryptBoxApplication.class, args);
    }

}
