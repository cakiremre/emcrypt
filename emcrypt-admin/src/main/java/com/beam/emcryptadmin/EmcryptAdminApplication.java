package com.beam.emcryptadmin;

import com.beam.emcryptadmin.repository.TenantRepository;
import com.beam.emcryptcore.model.admin.tenant.Tenant;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

import java.util.Arrays;

@EnableFeignClients
@RequiredArgsConstructor
@EnableDiscoveryClient
@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class EmcryptAdminApplication implements CommandLineRunner {

    @Autowired
    private TenantRepository tenantRepository;

    public static void main(String[] args) {
        SpringApplication.run(EmcryptAdminApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        tenantRepository.deleteAll();

        Tenant oltala = Tenant.builder()
                .name("Olta.La")
                .domain("olta.la")
                .identifier("oltala")
                .owner("team@olta.la")
                .build();
        oltala.newIdAndCreated();

        Tenant beamteknolojicom = Tenant.builder()
                .name("BEAM Teknoloji AS")
                .domain("beamteknoloji.com")
                .identifier("beamteknolojicom")
                .owner("emre@beamteknoloji.com")
                .build();
        beamteknolojicom.newIdAndCreated();

        tenantRepository.saveAll(Arrays.asList(oltala, beamteknolojicom));
    }
}
