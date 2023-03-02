package com.example.emcryptcomm.controller;

import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.comm.MultipleMailRequest;
import com.beam.emcryptcore.dto.comm.SingleMailRequest;
import com.beam.emcryptcore.model.comm.mail.*;
import com.example.emcryptcomm.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/comm/mail")
public class MailController {

    private final MailService service;

    @PostMapping("test")
    public Result test(@RequestParam boolean save,
                       @RequestBody Recipient recipient) {
        return service.singleSend(recipient, Type.TEST, Options.builder().saved(save).build());
    }


    @PostMapping("system")
    public Result system(@RequestBody SingleMailRequest request){
        return service.singleSend(request.getRecipient(), request.getType(), request.getOptions());
    }

    @PostMapping("system-multiple")
    public List<Result> system(@RequestBody MultipleMailRequest request){
        return service.multipleSend(request.getRecipientList(), request.getType(), request.getOptions());
    }

    @GetMapping("status")
    public GenericResponse<Result> status(@RequestParam String id){
        return service.status(id);
    }
}
