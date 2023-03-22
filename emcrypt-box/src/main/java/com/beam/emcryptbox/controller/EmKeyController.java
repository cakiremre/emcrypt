package com.beam.emcryptbox.controller;

import com.beam.emcryptbox.service.EmKeyService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.box.DecryptRequest;
import com.beam.emcryptcore.dto.box.EncryptResponse;
import com.beam.emcryptcore.dto.box.KeyRequest;
import com.beam.emcryptcore.dto.box.KeyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/box/emkey")
public class EmKeyController {

    private final EmKeyService service;

    @PostMapping("create")
    public KeyResponse create(@RequestBody KeyRequest keyRequest) {
        return service.create(keyRequest);
    }

    @PostMapping("create-all")
    public List<KeyResponse> createAll(@RequestBody List<KeyRequest> keyRequests) {
        return service.createAll(keyRequests);
    }

    @GetMapping("encrypt-key-html")
    public EncryptResponse encryptRequest(@RequestParam String owner) {
        return service.readEncryptionMaterial(owner);
    }

    @PostMapping("decrypt-key")
    public KeyResponse<String> decryptKey(@RequestBody DecryptRequest request){
        return service.decryptKey(request);
    }

    @GetMapping("should-decrypt")
    public GenericResponse shouldDecrypt(@RequestParam String messageId, @RequestParam String address){
        return service.shouldDecrypt(messageId, address);
    }
}
