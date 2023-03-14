package com.beam.emcryptkeyman.controller;

import com.beam.emcryptcore.dto.keyman.DecryptRequest;
import com.beam.emcryptcore.dto.keyman.KeyRequest;
import com.beam.emcryptcore.dto.keyman.KeyResponse;
import com.beam.emcryptcore.model.keyman.crypto.KeyType;
import com.beam.emcryptkeyman.service.EmKeyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/ekm/emkey")
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

    @GetMapping("read")
    public KeyResponse<String> readKey(@RequestParam String owner, @RequestParam KeyType keyType) {
        return service.findByOwner(owner, keyType);
    }

    @PostMapping("decrypt-key")
    public KeyResponse<String> decryptKey(@RequestBody DecryptRequest request){
        return service.decryptKey(request.getOwner(), request.getKey());
    }
}
