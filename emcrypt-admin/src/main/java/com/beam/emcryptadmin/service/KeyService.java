package com.beam.emcryptadmin.service;

import com.beam.emcryptcore.dto.box.KeyRequest;
import com.beam.emcryptcore.dto.box.KeyResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import static com.beam.emcryptcore.db.DbConfigurerInterceptor.TENANT_HEADER;

@FeignClient(name = "box", path = "/api/box/emkey")
public interface KeyService {

    @PostMapping("create")
    KeyResponse create(@RequestHeader(TENANT_HEADER) String tenant, @RequestBody KeyRequest keyRequest);

    @PostMapping("encrypt-root")
    KeyResponse<String> encryptRoot(@RequestParam String plain);

    @PostMapping("decrypt-root")
    KeyResponse<String> decryptRoot(@RequestParam String cipher);
}
