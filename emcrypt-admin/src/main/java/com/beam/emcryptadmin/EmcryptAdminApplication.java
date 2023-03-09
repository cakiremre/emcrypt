package com.beam.emcryptadmin;

import com.beam.emcryptcore.model.admin.tenant.Db;
import com.beam.emcryptcore.model.admin.tenant.Tenant;
import com.mongodb.client.MongoClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Arrays;

import static com.beam.emcryptadmin.config.DbConfig.PRIMARY_DATABASE_URI;

@EnableFeignClients
@RequiredArgsConstructor
@EnableDiscoveryClient
@SpringBootApplication(exclude = MongoAutoConfiguration.class)
public class EmcryptAdminApplication implements CommandLineRunner {

    @Autowired
    private MongoClient mongoClient;

    @Autowired
    private String databaseName;

    public static void main(String[] args) {
        SpringApplication.run(EmcryptAdminApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        MongoTemplate mongoTemplate = new MongoTemplate(mongoClient, databaseName);
        mongoTemplate.dropCollection(Tenant.class);
        mongoTemplate.dropCollection(Db.class);

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

        Db db = Db.builder()
                .url(PRIMARY_DATABASE_URI)
                .databaseName(beamteknolojicom.getIdentifier())
                .tenant(beamteknolojicom.getIdentifier())
                .build();
        db.newIdAndCreated();

        mongoTemplate.insertAll(Arrays.asList(oltala, beamteknolojicom));
        mongoTemplate.insert(db);
    }
}
