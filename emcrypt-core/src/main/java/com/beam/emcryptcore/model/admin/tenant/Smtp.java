package com.beam.emcryptcore.model.admin.tenant;


import com.beam.emcryptcore.base.Base;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Endpoint")
@TypeAlias("Smtp")
@Getter
@Setter
@Accessors(chain = true)
public class Smtp extends Endpoint {

    private String host;
    private int port;
    private boolean ssl;
    private boolean auth;
    private String username;


    @Override
    public <T extends Base> T newIdAndCreated() {
        setType(Type.SMTP);
        return super.newIdAndCreated();
    }
}
