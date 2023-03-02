package com.beam.emcryptadmin;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@RequiredArgsConstructor
@EnableDiscoveryClient
@SpringBootApplication
public class EmcryptAdminApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmcryptAdminApplication.class, args);
    }

}
