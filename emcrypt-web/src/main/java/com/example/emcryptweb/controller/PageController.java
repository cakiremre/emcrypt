package com.example.emcryptweb.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class PageController {

    @GetMapping(value = {"/"})
    public String index() {
        return "index";
    }
}