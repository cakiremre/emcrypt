package com.example.emcryptcomm;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableFeignClients
@RequiredArgsConstructor
@EnableDiscoveryClient
@EnableAsync
@EnableScheduling
@SpringBootApplication
public class EmcryptCommApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmcryptCommApplication.class, args);
    }

}
