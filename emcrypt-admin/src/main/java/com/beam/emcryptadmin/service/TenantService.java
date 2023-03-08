package com.beam.emcryptadmin.service;

import com.beam.emcryptadmin.repository.TenantRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.model.admin.Tenant;
import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class TenantService extends BaseService<TenantRepository, Tenant> {

    private final AccountService accountService;

    @Override
    public Tenant create(Tenant item) {
        // create tenant data
        item = super.create(item);

        // create account - at gw.
        accountService.create(Account.builder()
                .username(item.getOwner())
                .enabled(true)
                .credentialsNonExpired(true)
                .accountNonLocked(true)
                .accountNonExpired(true)
                .authorities(Arrays.asList(Role.manager()))
                .build());
        return item;
    }
}
