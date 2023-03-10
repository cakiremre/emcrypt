package com.beam.emcryptadmin.service;

import com.beam.emcryptadmin.repository.UserRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.db.TenantContext;
import com.beam.emcryptcore.dto.keyman.KeyRequest;
import com.beam.emcryptcore.model.admin.company.User;
import com.beam.emcryptcore.model.keyman.EmKeyType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService extends BaseService<UserRepository, User> {

    private final KeyService keyService;

    @Override
    public User create(User item) {
        item = super.create(item);

        keyService.create(TenantContext.getTenant(),
                KeyRequest.builder()
                        .type(EmKeyType.USER)
                        .owner(item.getEmail())
                        .build());

        return item;
    }
}
