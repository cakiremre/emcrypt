package com.beam.emcryptcore.model.admin.tenant;

import com.beam.emcryptcore.base.Base;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Tenant")
@TypeAlias("Tenant")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Tenant extends Base {

    private String name;
    private String domain;
    private Status status;
    private String owner;
    private String identifier; // simply domain name without dot.

    @Override
    public Tenant newIdAndCreated() {
        setStatus(Status.DEMO);
        return super.newIdAndCreated();
    }
}
