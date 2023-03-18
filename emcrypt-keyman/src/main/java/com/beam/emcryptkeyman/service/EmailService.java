package com.beam.emcryptkeyman.service;

import com.beam.emcryptcore.dto.GenericResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import static com.beam.emcryptcore.db.DbConfigurerInterceptor.TENANT_HEADER;

@FeignClient(name = "inbox", path = "/api/inb/email")
public interface EmailService {

    @GetMapping("should-decrypt")
    GenericResponse shouldDecrypt(@RequestHeader(TENANT_HEADER) String tenant, @RequestParam String messageId, @RequestParam String address);
}
