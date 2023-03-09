package com.beam.emcryptkeyman.config;

import com.beam.emcryptcore.db.CachedMongoClients;
import com.beam.emcryptcore.db.MultiTenantMongoDbFactory;
import com.beam.emcryptcore.db.PrimaryDbConfigurator;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DbConfig implements PrimaryDbConfigurator {

    public static final String PRIMARY_DATABASE_URI = "mongodb://localhost/";
    public static final String PRIMARY_DATABASE_NAME = "emcrypt-keyman";


    @Bean
    public MultiTenantMongoDbFactory multiTenantMongoDbFactory() {
        return new MultiTenantMongoDbFactory(cachedMongoClients(), mongoClient(), databaseName());
    }

    @Bean
    public CachedMongoClients cachedMongoClients() {
        return new CachedMongoClients(mongoClient(), databaseName(), this);
    }

    @Bean
    public MongoClient mongoClient() {
        return MongoClients.create(PRIMARY_DATABASE_URI);
    }

    @Bean
    public String databaseName() {
        return PRIMARY_DATABASE_NAME;
    }

    public String getPrimaryDatabaseUri() {
        return PRIMARY_DATABASE_URI;
    }

    public String getPrimaryDatabaseName() {
        return PRIMARY_DATABASE_NAME;
    }

}