package com.beam.emcryptbox.controller;

import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.db.AccountContext;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.inbox.Email;
import com.beam.emcryptbox.service.SentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/box/sent")
public class SentController extends BaseController<SentService, Email> {


    @GetMapping("list")
    public List<Email> list() {
        return service.findAll(AccountContext.getUsername());
    }

    @PostMapping("revoke")
    public GenericResponse<Email> revoke(@RequestParam String messageId, @RequestParam String address){
        return service.revoke(messageId, address);
    }
}
