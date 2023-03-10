package com.beam.emcryptcore.db;

import com.beam.emcryptcore.model.admin.tenant.Db;

import java.util.List;

public interface IDbService {

    List<Db> list();

    Db findByTenant(String owner);
}
