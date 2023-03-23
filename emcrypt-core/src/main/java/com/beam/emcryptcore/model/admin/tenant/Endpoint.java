package com.beam.emcryptcore.model.admin.tenant;

import com.beam.emcryptcore.base.Base;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Endpoint")
@TypeAlias("Endpoint")
@Data
@Accessors(chain = true)
public class Endpoint extends Base {

    private Type type;

    private String password;

    @Transient
    private boolean encrypted;
}
