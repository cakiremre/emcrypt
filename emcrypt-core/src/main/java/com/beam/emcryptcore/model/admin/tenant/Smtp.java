package com.beam.emcryptcore.model.admin.tenant;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Smtp {

    private String host;
    private int port;
    private boolean ssl;
    private boolean auth;
    private String username;
    private String password;
}
