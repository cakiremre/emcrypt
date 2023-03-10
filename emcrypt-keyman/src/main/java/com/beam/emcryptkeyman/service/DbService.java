package com.beam.emcryptkeyman.service;

import com.beam.emcryptcore.db.IDbService;
import com.beam.emcryptcore.model.admin.tenant.Db;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "admin", path = "/api/adm/db")
public interface DbService extends IDbService {

    @GetMapping("list")
    List<Db> list();

    @GetMapping("by-tenant")
    Db findByTenant(@RequestParam String tenant);
}
