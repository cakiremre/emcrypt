package com.beam.emcryptadmin.controller;

import com.beam.emcryptadmin.service.TenantService;
import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.model.admin.Tenant;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/adm/tenant")
public class TenantController extends BaseController<TenantService, Tenant> {
}
