package com.beam.emcryptcore.db;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

public class MultiTenantMongoDbFactory extends SimpleMongoClientDatabaseFactory {

    private CachedMongoClients cachedMongoClients;

    public MultiTenantMongoDbFactory(CachedMongoClients cachedMongoClients, MongoClient mongoClient, String databaseName) {
        super(mongoClient, databaseName);
        this.cachedMongoClients = cachedMongoClients;
    }

    @Override
    protected MongoDatabase doGetMongoDatabase(String dbName) {
        return cachedMongoClients.getMongoDatabaseForCurrentContext();
    }
}
