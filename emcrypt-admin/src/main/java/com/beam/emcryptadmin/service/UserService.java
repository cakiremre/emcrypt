package com.beam.emcryptadmin.service;

import com.beam.emcryptadmin.repository.UserRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.BatchSave;
import com.beam.emcryptcore.dto.BatchSaveOut;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.admin.ActivateRequest;
import com.beam.emcryptcore.model.admin.company.User;
import com.beam.emcryptcore.model.admin.tenant.Ldap;
import com.beam.emcryptcore.model.admin.tenant.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserService extends BaseService<UserRepository, User> {

    private final EndpointService endpointService;

    public GenericResponse activate(ActivateRequest request) {
        String email = request.getEmail();

        User user = repository.findByEmail(email);

        if (user == null) {
            return GenericResponse.code(404);
        } else {
            user.setActivated(true);
            repository.save(user);
            return GenericResponse.success();
        }
    }

    public GenericResponse saveAll(List<User> users) {

        Map<String, User> existingUserMap = repository.findAll()
                .stream()
                .collect(Collectors.toMap(User::getEmail, Function.identity()));

        List<User> toAdd = new ArrayList<>();
        List<User> toUpdate = new ArrayList<>();
        users.forEach(user -> {
            if (!existingUserMap.containsKey(user.getEmail())) {
                toAdd.add(user.newIdAndCreated());
            } else {
                User existing = existingUserMap.get(user.getEmail());
                existing.updateFrom(user);
                toUpdate.add(existing);
            }
        });

        List<User> all = new ArrayList<>();
        all.addAll(toAdd);
        all.addAll(toUpdate);
        repository.saveAll(all);

        BatchSaveOut bso = new BatchSaveOut();
        if (toAdd.size() > 0) {
            bso.getOut().add(BatchSave.builder().code(0).count(toAdd.size()).build());
        }
        if (toUpdate.size() > 0) {
            bso.getOut().add(BatchSave.builder().code(1).count(toUpdate.size()).build());
        }

        return GenericResponse.success(bso);
    }

    public GenericResponse<List<User>> ldapAll() {
        Ldap ldap = endpointService.findByTypeDecrypted(Type.LDAP, Ldap.class);
        if (ldap != null) {
            LdapService ldapService = LdapService.build(ldap);
            List<User> users = ldapService.getAllPeopleWithEmail();
            return GenericResponse.success(users);
        } else {
            return GenericResponse.code(404);
        }
    }
}
