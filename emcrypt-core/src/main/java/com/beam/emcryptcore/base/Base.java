package com.beam.emcryptcore.base;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

public class Base {

    @Getter
    @Setter
    private String id;

    @Getter
    @Setter
    private Date created;

    public <T extends Base> T newIdAndCreated(){
        this.setId(UUID.randomUUID().toString());
        this.setCreated(new Date());
        return (T)this;
    }
}
