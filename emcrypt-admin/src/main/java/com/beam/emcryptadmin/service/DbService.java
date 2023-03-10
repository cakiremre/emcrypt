package com.beam.emcryptadmin.service;

import com.beam.emcryptadmin.repository.DbRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.model.admin.tenant.Db;
import org.springframework.stereotype.Service;

@Service
public class DbService extends BaseService<DbRepository, Db> {
    public Db findByTenant(String tenant) {
        return repository.findByTenant(tenant)
                .orElse(null);
    }
}
