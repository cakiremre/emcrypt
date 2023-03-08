package com.beam.emcryptcore.model.auth;

import lombok.*;
import lombok.experimental.Accessors;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Builder
@Data
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return Objects.equals(name, role.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
