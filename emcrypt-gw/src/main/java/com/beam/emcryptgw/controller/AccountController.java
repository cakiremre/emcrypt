package com.beam.emcryptgw.controller;

import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptgw.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/gw/account")
public class AccountController extends BaseController<AccountService, Account> {


}
