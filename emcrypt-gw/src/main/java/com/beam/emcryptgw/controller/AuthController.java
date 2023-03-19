package com.beam.emcryptgw.controller;

import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.gw.*;
import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.Reader;
import com.beam.emcryptcore.service.JwtService;
import com.beam.emcryptgw.service.AccountService;
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

        return accountToken(response);
    }

    @GetMapping("/me")
    public GenericResponse me(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        String username = jwtService.extractUsername(token);
        String usertype = jwtService.extractUsertype(token);

        switch (usertype){
            default:
            case "account":
                Account account = accountService.loadByUsername(username)
                        .orElse(null);
                return GenericResponse.success(account);
            case "reader":
                Reader reader = Reader.builder().address(username).build();
                return GenericResponse.success(reader);
        }


    }

    @PostMapping("/forgot")
    public GenericResponse forgot(@RequestParam String username) {
        return accountService.reset(username);
    }

    @PostMapping("/set-password")
    public AuthResponse setPassword(@RequestBody SetPasswordRequest request){
        GenericResponse<Account> response = accountService.setPassword(request);
        return accountToken(response);
    }

    @PostMapping("/otp-reader")
    public GenericResponse readerOtp(@RequestParam String address){
        return accountService.readerOtp(address);
    }

    @PostMapping("/authenticate-reader")
    public ReaderResponse authenticateReader(@RequestBody ReaderRequest request){
        GenericResponse<Reader> response = accountService.authenticateReader(request);

        return readerToken(response);
    }

    private AuthResponse accountToken(GenericResponse<Account> response) {
        if (response.getCode() == 0) {
            String token = jwtService.generateToken(response.getData());
            return AuthResponse.builder()
                    .code(0)
                    .token(token)
                    .account(response.getData())
                    .build();
        } else {
            return AuthResponse.code(10);
        }
    }

    private ReaderResponse readerToken(GenericResponse<Reader> response){
        if (response.getCode() == 0) {
            String token = jwtService.generateToken(response.getData());
            return ReaderResponse.builder()
                    .code(0)
                    .token(token)
                    .reader(response.getData())
                    .build();
        } else {
            return ReaderResponse.code(10);
        }
    }
}