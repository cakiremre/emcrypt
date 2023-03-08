package com.beam.emcryptadmin.config;

import com.beam.emcryptadmin.util.TenantContext;
import com.beam.emcryptcore.model.admin.tenant.Db;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.HashMap;
import java.util.Map;

import static com.beam.emcryptadmin.config.DbConfig.PRIMARY_DATABASE_URI;
import static com.beam.emcryptadmin.util.TenantContext.COMMON;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@RequiredArgsConstructor
@Configuration
public class CachedMongoClients {

    private final MongoClient mongoClient;
    private final String databaseName;

    private Map<String, Db> tenantDbMap = new HashMap<>();

    private Db primary = Db.builder()
            .tenant(COMMON)
            .url(PRIMARY_DATABASE_URI)
            .build();

    private MongoTemplate primaryMongoTemplate;

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
                .getDatabase(db.databaseName());
    }

}
