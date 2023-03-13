package com.beam.emcryptadmin.service;

import com.beam.emcryptadmin.repository.UserRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.db.TenantContext;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.admin.ActivateRequest;
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

    public GenericResponse activate(ActivateRequest request) {
        String email = request.getEmail();

        User user = repository.findByEmail(email);

        if(user == null){
            return GenericResponse.code(404);
        }else{
            user.setActivated(true);
            repository.save(user);
            return GenericResponse.success();
        }
    }
}
