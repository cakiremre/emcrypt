package com.beam.emcryptcore.db;

import com.beam.emcryptcore.model.admin.tenant.Db;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import jakarta.annotation.PostConstruct;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.HashMap;
import java.util.Map;

import static com.beam.emcryptcore.db.TenantContext.COMMON;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

public class DbCachedMongoClients extends CachedMongoClients {

    private final MongoClient mongoClient;
    private final String databaseName;
    private final IPrimaryDbConfigurator configurator;

    private Map<String, Db> tenantDbMap = new HashMap<>();
    private MongoTemplate primaryMongoTemplate;

    private Db primary;

    public DbCachedMongoClients(MongoClient mongoClient, String databaseName, IPrimaryDbConfigurator configurator){
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

        primaryMongoTemplate = new MongoTemplate(mongoClient, databaseName);
        primaryMongoTemplate.findAll(Db.class)
                .forEach(db -> tenantDbMap.put(db.getTenant(), db));
    }

    public MongoDatabase getMongoDatabaseForCurrentContext() {
        String tenant = TenantContext.getTenant();
        Db db = tenantDbMap.get(tenant);

        if (db == null) {
            Db missed = primaryMongoTemplate.findOne(query(where("tenant").is(tenant)), Db.class);
            if (missed != null) {
                db = missed;
                tenantDbMap.put(tenant, db);
            } else {
                db = primary;
            }
        }

        return db.getClient()
                .getDatabase(db.getDatabaseName());
    }
}
