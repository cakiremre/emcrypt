package com.beam.emcryptgw.service;

import com.beam.emcryptcore.dto.comm.SingleMailRequest;
import com.beam.emcryptcore.model.comm.mail.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "comm", path = "/api/comm/mail")
public interface MailService {

    @PostMapping("system")
    Result system(@RequestBody SingleMailRequest request);
}
