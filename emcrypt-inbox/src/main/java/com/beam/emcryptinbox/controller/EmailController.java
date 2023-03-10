package com.beam.emcryptinbox.controller;

import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.model.inbox.Email;
import com.beam.emcryptinbox.service.EmailService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inb/email")
public class EmailController extends BaseController<EmailService, Email> {
}
