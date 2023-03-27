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

import static javax.crypto.Cipher.DECRYPT_MODE;
import static javax.crypto.Cipher.ENCRYPT_MODE;

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

    @PostMapping("encrypt-root")
    public KeyResponse encryptRoot(@RequestParam String plain){
        return service.cryptRoot(ENCRYPT_MODE, plain);
    }

    @PostMapping("decrypt-root")
    public KeyResponse decryptRoot(@RequestParam String cipher){
        return service.cryptRoot(DECRYPT_MODE, cipher);
    }

    @GetMapping("encrypt-key-html")
    public EncryptResponse encryptRequest(@RequestHeader("X-TENANT") String owner) {
        return service.readEncryptionMaterial(owner);
    }

    @PostMapping("decrypt-key")
    public KeyResponse<String> decryptKey(@RequestHeader("X-TENANT") String tenant, @RequestBody DecryptRequest request){
        return service.decryptKey(tenant, request);
    }

    @GetMapping("should-decrypt")
    public GenericResponse shouldDecrypt(@RequestParam String messageId, @RequestParam String address){
        return service.shouldDecrypt(messageId, address);
    }
}
