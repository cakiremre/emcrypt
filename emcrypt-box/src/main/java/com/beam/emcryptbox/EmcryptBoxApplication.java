package com.beam.emcryptbox;

import com.beam.emcryptbox.service.EmKeyService;
import com.beam.emcryptcore.dto.box.KeyRequest;
import com.beam.emcryptcore.dto.box.KeyResponse;
import com.beam.emcryptcore.model.box.crypto.EmKeyType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@Slf4j
@EnableFeignClients(basePackages = {"com.beam.emcryptcore.service", "com.beam.emcryptbox.service"})
@RequiredArgsConstructor
@EnableDiscoveryClient
@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class EmcryptBoxApplication implements CommandLineRunner {

    @Autowired
    private EmKeyService emKeyService;

    public static void main(String[] args) {
        SpringApplication.run(EmcryptBoxApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        KeyResponse response = emKeyService.create(KeyRequest.builder()
                .owner("ROOT")
                .type(EmKeyType.ROOT)
                .build());

        switch (response.getCode()){
            case 0:
                log.info("Successfully created root key");
                break;
            case 99:
                log.info("Root has already a key");
                break;
            default:
                log.error("Error occurred during root key generation");
                break;
        }

    }
}
