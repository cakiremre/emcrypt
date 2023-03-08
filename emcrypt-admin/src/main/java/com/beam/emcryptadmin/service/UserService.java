package com.beam.emcryptadmin.service;

import com.beam.emcryptadmin.repository.UserRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.model.admin.company.User;
import org.springframework.stereotype.Service;

@Service
public class UserService extends BaseService<UserRepository, User> {
}
