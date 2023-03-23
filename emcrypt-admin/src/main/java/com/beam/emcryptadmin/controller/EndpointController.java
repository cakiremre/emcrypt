package com.beam.emcryptadmin.controller;

import com.beam.emcryptadmin.service.EndpointService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.admin.tenant.Ldap;
import com.beam.emcryptcore.model.admin.tenant.Smtp;
import com.beam.emcryptcore.model.admin.tenant.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/adm/endpoint")
public class EndpointController {

    private final EndpointService service;

    @GetMapping("smtp")
    public Smtp get(){
        return service.findByType(Type.SMTP, Smtp.class);
    }

    @PostMapping("smtp")
    public Smtp insert(@RequestBody  Smtp smtp){
        return service.insert(smtp);
    }

    @PutMapping("smtp")
    public Smtp update(@RequestBody Smtp smtp){
        return service.update(smtp);
    }

    @DeleteMapping("smtp")
    public void deleteSmtp(){
        service.delete(Type.SMTP);
    }

    @GetMapping("ldap")
    public Ldap ldap(){
        return service.findByType(Type.LDAP, Ldap.class);
    }

    @PostMapping("ldap")
    public Ldap insert(@RequestBody  Ldap ldap){
        return service.insert(ldap);
    }

    @PutMapping("ldap")
    public Ldap update(@RequestBody Ldap ldap){
        return service.update(ldap);
    }

    @DeleteMapping("ldap")
    public void deleteLdap(){
        service.delete(Type.LDAP);
    }

    @PostMapping("ldap-test")
    public GenericResponse test(@RequestBody Ldap ldap){
        return service.test(ldap);
    }
}
