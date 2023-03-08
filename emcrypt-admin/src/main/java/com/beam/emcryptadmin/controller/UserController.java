package com.beam.emcryptadmin.controller;

import com.beam.emcryptadmin.service.UserService;
import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.model.admin.company.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/adm/user")
public class UserController extends BaseController<UserService, User> {
}
