package com.beam.emcryptadmin.service;

import com.beam.emcryptcore.dto.box.KeyRequest;
import com.beam.emcryptcore.dto.box.KeyResponse;
import com.beam.emcryptcore.model.box.crypto.KeyType;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.beam.emcryptcore.db.DbConfigurerInterceptor.TENANT_HEADER;

@FeignClient(name = "box", path = "/api/box/emkey")
public interface KeyService {

    @PostMapping("create")
    KeyResponse create(@RequestHeader(TENANT_HEADER) String tenant, @RequestBody KeyRequest keyRequest);

    @PostMapping("create-all")
    List<KeyResponse> createAll(@RequestHeader(TENANT_HEADER) String tenant, @RequestBody List<KeyRequest> keyRequests);

    @GetMapping("read")
    KeyResponse<String> read(@RequestHeader(TENANT_HEADER) String tenant, @RequestParam String owner, @RequestParam KeyType keyType);
}
