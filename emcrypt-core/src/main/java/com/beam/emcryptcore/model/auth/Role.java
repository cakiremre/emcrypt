package com.beam.emcryptcore.model.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Role {

    private String name;

    public static Role admin(){
        return Role.builder()
                .name("ROLE_ADMIN")
                .build();
    }

    public static Role manager(){
        return Role.builder()
                .name("ROLE_MANAGER")
                .build();
    }

    public static Role user(){
        return Role.builder()
                .name("ROLE_USER")
                .build();
    }
}
