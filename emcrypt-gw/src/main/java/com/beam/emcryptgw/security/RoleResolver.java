package com.beam.emcryptgw.security;

import com.beam.emcryptcore.model.auth.Role;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

public class RoleResolver {

    public static List<Role> resolve(List<LinkedHashMap<String, String>> from) {
        List<Role> roles = new ArrayList<>();

        from.forEach(item -> {
            roles.add(Role.builder().name(item.get("name")).build());
        });

        return roles;
    }
}
