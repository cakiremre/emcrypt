package com.beam.emcryptcore.db;

import com.beam.emcryptcore.model.admin.tenant.Db;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import jakarta.annotation.PostConstruct;

import java.util.HashMap;
import java.util.Map;

import static com.beam.emcryptcore.db.TenantContext.COMMON;

public class ServiceCachedMongoClients extends CachedMongoClients {

    private final MongoClient mongoClient;
    private final String databaseName;
    private final IPrimaryDbConfigurator configurator;

    private Map<String, Db> tenantDbMap = new HashMap<>();
    private IDbService dbService;

    private Db primary;

    public ServiceCachedMongoClients(IDbService dbService,
                                     MongoClient mongoClient,
                                     String databaseName,
                                     IPrimaryDbConfigurator configurator) {
        this.dbService = dbService;

        this.mongoClient = mongoClient;
        this.databaseName = databaseName;
        this.configurator = configurator;

        primary = Db.builder()
                .tenant(COMMON)
                .url(configurator.getPrimaryDatabaseUri())
                .databaseName(configurator.getPrimaryDatabaseName())
                .build();
    }

    @PostConstruct
    public void init() {
        tenantDbMap.put(COMMON, primary);
    }

    public MongoDatabase getMongoDatabaseForCurrentContext() {
        String tenant = TenantContext.getTenant();
        Db db = null;
        if (tenant == null) {
            db = primary;
        } else {
            db = tenantDbMap.get(tenant);

            if (db == null) {
                Db missed = dbService.findByTenant(tenant);
                if (missed != null) {
                    db = missed;
                    tenantDbMap.put(tenant, db);
                } else {
                    db = primary;
                }
            }
        }

        return db.getClient()
                .getDatabase(db.getDatabaseName());
    }
}
