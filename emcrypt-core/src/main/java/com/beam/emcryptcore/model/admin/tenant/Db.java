package com.beam.emcryptcore.model.admin.tenant;

import com.beam.emcryptcore.base.Base;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Db")
@TypeAlias("Db")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Db extends Base {

    private String tenant; // Tenant identifier
    private String url;
    private String databaseName;

    private DbLocation dbLocation;

    @Transient
    private MongoClient _client;

    @Transient
    @JsonIgnore
    public MongoClient getClient() {
        if (_client == null) {
            _client = MongoClients.create(url);
        }
        return _client;
    }
}
