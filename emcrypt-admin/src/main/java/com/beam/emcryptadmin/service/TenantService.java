package com.beam.emcryptadmin.service;

import com.beam.emcryptadmin.repository.TenantRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.keyman.KeyRequest;
import com.beam.emcryptcore.model.admin.tenant.Db;
import com.beam.emcryptcore.model.admin.tenant.Tenant;
import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.Role;
import com.beam.emcryptcore.model.keyman.EmKeyType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;

import static com.beam.emcryptadmin.config.DbConfig.PRIMARY_DATABASE_URI;

@Service
@RequiredArgsConstructor
public class TenantService extends BaseService<TenantRepository, Tenant> {

    private final AccountService accountService;
    private final DbService dbService;
    private final KeyService keyService;

    @Override
    public Tenant create(Tenant item) {
        // create tenant data
        item.setIdentifier(item.getDomain().replace(".", ""));
        item = super.create(item);

        // create database configuration
        Db db = Db.builder()
                .tenant(item.getIdentifier())
                .url(PRIMARY_DATABASE_URI)
                .databaseName(item.getIdentifier())
                .build();
        dbService.create(db);

        // create organization root-key
        keyService.create(item.getIdentifier(),
                KeyRequest.builder()
                        .owner(item.getIdentifier())
                        .type(EmKeyType.ORG)
                        .build());

        // TODO create storage configuration


        // create account - at gw.
        accountService.create(Account.builder()
                .username(item.getOwner())
                .tenant(item.getIdentifier())
                .enabled(true)
                .credentialsNonExpired(true)
                .accountNonLocked(true)
                .accountNonExpired(true)
                .authorities(Arrays.asList(Role.manager()))
                .build());
        return item;
    }
}
