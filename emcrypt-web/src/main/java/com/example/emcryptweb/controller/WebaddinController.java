package com.example.emcryptweb.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("webaddin")
public class WebaddinController {

    @GetMapping("manifest.xml")
    public ResponseEntity test(HttpServletRequest request){
        return ResponseEntity.ok().build();
    }

}
