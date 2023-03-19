package com.beam.emcryptinbox.controller;

import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.inbox.Decrypted;
import com.beam.emcryptcore.model.inbox.Email;
import com.beam.emcryptcore.model.inbox.Options;
import com.beam.emcryptinbox.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("options")
    private GenericResponse<Options> options(@RequestParam String tenant, @RequestParam String messageId){
        return service.readOptions(messageId);
    }

    @GetMapping("decrypt-read")
    public GenericResponse<Decrypted> readDecrypted(@RequestParam String messageId,
                                                    @RequestParam String tenant,
                                                    @RequestParam String address){
        return service.readDecrypted(messageId, tenant, address);
    }

    @GetMapping("decrypt-attachment")
    public ResponseEntity<byte[]> readAttachment(@RequestParam String messageId,
                                                 @RequestParam String tenant,
                                                 @RequestParam String attachmentId,
                                                 @RequestParam String address){
        return service.readAttachment(messageId, tenant, attachmentId, address);
    }

    @GetMapping("should-decrypt")
    public GenericResponse shouldDecrypt( @RequestParam String messageId, @RequestParam String address){
        return service.shouldDecrypt(messageId, address);
    }
}
