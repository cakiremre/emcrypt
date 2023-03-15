package com.beam.emcryptinbox.controller;

import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.inbox.Email;
import com.beam.emcryptinbox.service.EmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inb/email")
public class EmailController extends BaseController<EmailService, Email> {

    @PostMapping("save")
    public GenericResponse<String> receive(@RequestBody  Email item) {
        Email email = super.insert(item);
        return GenericResponse.<String>builder()
                .code(0)
                .data(email.getId())
                .build();
    }
}
