package com.beam.emcryptcore.db;

import com.mongodb.client.MongoDatabase;

public abstract class CachedMongoClients {

    public abstract MongoDatabase getMongoDatabaseForCurrentContext();

}
