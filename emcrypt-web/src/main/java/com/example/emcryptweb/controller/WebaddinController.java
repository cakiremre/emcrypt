package com.example.emcryptweb.controller;

import com.example.emcryptweb.service.WebAddinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
@RequestMapping("webaddin")
public class WebaddinController {

    private final WebAddinService webAddinService;

    @GetMapping("manifest.xml")
    public ResponseEntity test(@RequestParam("tenant") String tenant,
                               @RequestHeader("X-Forwarded-Host") String origin){
        return webAddinService.manifest(origin, tenant);
    }

}
