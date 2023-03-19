package com.beam.emcryptinbox.controller;

import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.db.AccountContext;
import com.beam.emcryptcore.model.inbox.Email;
import com.beam.emcryptinbox.service.SentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/inb/sent")
public class SentController extends BaseController<SentService, Email> {


    @GetMapping("list")
    public List<Email> list() {
        return service.findAll(AccountContext.getUsername());
    }
}
