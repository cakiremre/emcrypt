package com.beam.emcryptgw.controller;

import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.AuthRequest;
import com.beam.emcryptcore.model.auth.AuthResponse;
import com.beam.emcryptgw.service.AccountService;
import com.beam.emcryptgw.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/gw/auth")
public class AuthController {

    private final AccountService accountService;
    private final JwtService jwtService;

    @PostMapping("/authenticate")
    public AuthResponse authenticate(@RequestBody AuthRequest request) {
        GenericResponse<Account> response = accountService.authenticate(request.getUsername(), request.getPassword());

        if (response.getCode() == 0) {
            String token = jwtService.generateToken(response.getData());
            return AuthResponse.builder()
                    .code(0)
                    .token(token)
                    .account(response.getData())
                    .build();
        } else {
            return AuthResponse.builder()
                    .code(10)
                    .build();
        }
    }

    @GetMapping("/me")
    public GenericResponse<Account> me(@RequestHeader("Authorization") String header) {
        String username = jwtService.extractUsername(header.substring(7));
        return accountService.loadByUsername(username);
    }

    @PostMapping("/forgot")
    public GenericResponse forgot(@RequestParam String username) {
        return accountService.forgot(username);
    }
}