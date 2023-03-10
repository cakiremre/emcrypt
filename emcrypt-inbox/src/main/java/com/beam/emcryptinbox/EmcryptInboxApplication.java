package com.beam.emcryptinbox;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = {"com.beam.emcryptcore.service", "com.beam.emcryptinbox.service"})
@RequiredArgsConstructor
@EnableDiscoveryClient
@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class EmcryptInboxApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmcryptInboxApplication.class, args);
    }

}
