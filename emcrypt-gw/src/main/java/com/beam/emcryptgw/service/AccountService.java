package com.beam.emcryptgw.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.Role;
import com.beam.emcryptgw.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AccountService extends BaseService<AccountRepository, Account> {

    private final PasswordEncoder passwordEncoder;

    public GenericResponse<Account> authenticate(String username, String password){
        Optional<Account> query = repository.findByUsername(username);
        if(query.isEmpty()){
            return GenericResponse.<Account>builder()
                    .code(10)
                    .build();
        }else{
            Account account = query.get();
            if(passwordEncoder.matches(password, account.getPassword())){
                return GenericResponse.<Account>builder()
                        .code(0)
                        .data(account)
                        .build();
            }else{
                return GenericResponse.<Account>builder()
                        .code(11)
                        .build();
            }
        }
    }

    public GenericResponse createManager(String email) {
        //create account & create email
        Account account = Account.builder()
                .username(email)
                .password(passwordEncoder.encode(email))
                .authorities(Arrays.asList(Role.manager()))
                .enabled(true)
                .build();
        account.setId(UUID.randomUUID().toString());
        repository.insert(account);

        return GenericResponse.builder()
                .code(0)
                .build();
    }
}
