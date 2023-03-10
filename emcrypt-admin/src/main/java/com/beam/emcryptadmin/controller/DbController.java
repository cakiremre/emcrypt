package com.beam.emcryptadmin.controller;

import com.beam.emcryptadmin.service.DbService;
import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.model.admin.tenant.Db;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/adm/db")
public class DbController extends BaseController<DbService, Db> {

    @GetMapping("by-tenant")
    public Db findByTenant(@RequestParam String tenant) {
        return service.findByTenant(tenant);
    }
}
