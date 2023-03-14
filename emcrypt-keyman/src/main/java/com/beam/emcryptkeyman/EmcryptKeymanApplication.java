package com.beam.emcryptkeyman;

import com.beam.emcryptcore.dto.keyman.KeyRequest;
import com.beam.emcryptcore.model.keyman.crypto.EmKeyType;
import com.beam.emcryptkeyman.service.EmKeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@RequiredArgsConstructor
@EnableDiscoveryClient
@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class EmcryptKeymanApplication implements CommandLineRunner {

    @Autowired
    EmKeyService emKeyService;

    public static void main(String[] args) {
        SpringApplication.run(EmcryptKeymanApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        emKeyService.create(KeyRequest.builder()
                .owner("ROOT")
                .type(EmKeyType.ROOT)
                .build());
    }
}
