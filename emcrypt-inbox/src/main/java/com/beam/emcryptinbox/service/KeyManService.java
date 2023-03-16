package com.beam.emcryptinbox.service;

import com.beam.emcryptcore.dto.keyman.DecryptRequest;
import com.beam.emcryptcore.dto.keyman.KeyResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import static com.beam.emcryptcore.db.DbConfigurerInterceptor.TENANT_HEADER;

@FeignClient(name = "keyman", path = "/api/ekm/emkey")
public interface KeyManService {

    @PostMapping("decrypt-key")
    KeyResponse<String> decryptKey(@RequestHeader(TENANT_HEADER) String tenant, @RequestBody DecryptRequest request);
}
