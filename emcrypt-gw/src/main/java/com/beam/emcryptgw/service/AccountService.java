package com.beam.emcryptgw.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.comm.SingleMailRequest;
import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.AccountLink;
import com.beam.emcryptcore.model.comm.mail.Options;
import com.beam.emcryptcore.model.comm.mail.Recipient;
import com.beam.emcryptcore.model.comm.mail.Type;
import com.beam.emcryptcore.util.RandomStringGenerator;
import com.beam.emcryptgw.repository.AccountLinkRepository;
import com.beam.emcryptgw.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AccountService extends BaseService<AccountRepository, Account> {

    private final PasswordEncoder passwordEncoder;
    private final AccountLinkRepository accountLinkRepository;
    private final MailService mailService;

    public GenericResponse<Account> authenticate(String username, String password) {
        Optional<Account> query = repository.findByUsername(username);
        if (query.isEmpty()) {
            return GenericResponse.<Account>builder()
                    .code(10)
                    .build();
        } else {
            Account account = query.get();
            if (passwordEncoder.matches(password, account.getPassword())) {
                return GenericResponse.<Account>builder()
                        .code(0)
                        .data(account)
                        .build();
            } else {
                return GenericResponse.<Account>builder()
                        .code(11)
                        .build();
            }
        }
    }

    public GenericResponse<Account> loadByUsername(String username) {
        Optional<Account> query = repository.findByUsername(username);
        if (query.isEmpty()) {
            return GenericResponse.<Account>builder()
                    .code(10)
                    .build();
        } else {
            return GenericResponse.<Account>builder()
                    .code(0)
                    .data(query.get())
                    .build();
        }
    }


    public GenericResponse forgot(String username) {
        Optional<Account> query = repository.findByUsername(username);
        if (query.isPresent()) {
            AccountLink link = AccountLink.builder()
                    .link(RandomStringGenerator.generateRandomString())
                    .username(username)
                    .build();
            link.setId(UUID.randomUUID().toString());
            accountLinkRepository.save(link);

            // request to mail-service
            mailService.system(SingleMailRequest.builder()
                    .type(Type.FORGOT)
                    .recipient(Recipient.builder()
                            .email(username)
                            .firstName("emre")
                            .lastName("cakir")
                            .build())
                    .options(Options.<String>builder()
                            .data(link.getLink())
                            .build())
                    .build());
        }
        return GenericResponse.<Account>builder()
                .code(0)
                .build();
    }
}
