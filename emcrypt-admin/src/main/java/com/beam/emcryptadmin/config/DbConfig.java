package com.beam.emcryptadmin.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DbConfig {

    public static final String PRIMARY_DATABASE_URI = "mongodb://localhost/";
    public static final String PRIMARY_DATABASE_NAME = "emcrypt-admin";


    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(PRIMARY_DATABASE_URI);
    }

    @Bean
    public String databaseName() {
        return PRIMARY_DATABASE_NAME;
    }


}
