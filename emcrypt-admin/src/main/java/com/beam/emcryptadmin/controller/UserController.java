package com.beam.emcryptadmin.controller;

import com.beam.emcryptadmin.service.UserService;
import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.dto.BatchSaveOut;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.admin.ActivateRequest;
import com.beam.emcryptcore.model.admin.company.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/adm/user")
public class UserController extends BaseController<UserService, User> {


    @PostMapping("activate")
    public GenericResponse activate(@RequestBody ActivateRequest activateRequest){
        return service.activate(activateRequest);
    }

    @PostMapping("save-all")
    public GenericResponse<BatchSaveOut> saveAll(@RequestBody List<User> users){
        return service.saveAll(users);
    }
}
