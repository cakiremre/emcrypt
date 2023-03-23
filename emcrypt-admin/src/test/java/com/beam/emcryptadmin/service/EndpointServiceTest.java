package com.beam.emcryptadmin.service;

import com.beam.emcryptcore.db.TenantContext;
import com.beam.emcryptcore.model.admin.tenant.Endpoint;
import com.beam.emcryptcore.model.admin.tenant.Ldap;
import com.beam.emcryptcore.model.admin.tenant.Smtp;
import com.beam.emcryptcore.model.admin.tenant.Type;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class EndpointServiceTest {

    @Autowired
    private EndpointService endpointService;

    @Test
    public void testRead(){

        TenantContext.setTenant("beamteknolojicom");

        Ldap ldap = endpointService.findByType(Type.LDAP, Ldap.class);
        assertNotNull(ldap);

        Smtp smtp = endpointService.findByType(Type.SMTP, Smtp.class);
        assertNotNull(smtp);

        List<Endpoint> eps = endpointService.findAll();
        assertTrue(eps.size() > 0);
    }
}
