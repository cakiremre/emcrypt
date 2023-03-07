package com.beam.emcryptadmin.service;

import com.beam.emcryptcore.model.auth.Account;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "gw", path = "/api/gw/account")
public interface AccountService {

    @PostMapping
    Account create(@RequestBody Account account);
}
