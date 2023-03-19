package com.beam.emcryptgw.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.comm.mail.Options;
import com.beam.emcryptcore.dto.comm.mail.SingleRequest;
import com.beam.emcryptcore.dto.gw.ReaderRequest;
import com.beam.emcryptcore.dto.gw.SetPasswordRequest;
import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.AccountLink;
import com.beam.emcryptcore.model.auth.Otp;
import com.beam.emcryptcore.model.auth.Reader;
import com.beam.emcryptcore.model.comm.mail.Recipient;
import com.beam.emcryptcore.model.comm.mail.Type;
import com.beam.emcryptcore.util.RandomStringGenerator;
import com.beam.emcryptgw.repository.AccountLinkRepository;
import com.beam.emcryptgw.repository.AccountRepository;
import com.beam.emcryptgw.repository.OtpRepository;
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

    private final OtpRepository otpRepository;
    private final MailService mailService;

    public GenericResponse<Account> authenticate(String username, String password) {
        Optional<Account> query = repository.findByUsername(username);
        if (query.isEmpty()) {
            return GenericResponse.code(10);
        } else {
            Account account = query.get();
            if (passwordEncoder.matches(password, account.getPassword())) {
                return GenericResponse.success(account);
            } else {
                return GenericResponse.code(11);
            }
        }
    }

    public GenericResponse<Reader> authenticateReader(ReaderRequest request) {
        Optional<Otp> query = otpRepository.findByAddress(request.getAddress());
        if (query.isEmpty()) {
            return GenericResponse.code(10);
        } else {
            Otp otp = query.get();
            if (passwordEncoder.matches(request.getCode(), otp.getCode())) {
                return GenericResponse.success(Reader.builder()
                        .address(request.getAddress())
                        .build());
            } else {
                return GenericResponse.code(111);
            }
        }
    }

    public Optional<Account> loadByUsername(String username) {
        return repository.findByUsername(username);
    }

    public GenericResponse reset(String username) {
        Optional<Account> query = repository.findByUsername(username);
        if (query.isPresent()) {
            sendResetPasswordMail(query.get(), Type.FORGOT);
        }
        return GenericResponse.success();
    }

    @Override
    public Account create(Account item) {
        item = super.create(item);
        sendResetPasswordMail(item, Type.ACTIVATION);
        return item;
    }

    private void sendResetPasswordMail(Account account, Type type) {
        AccountLink link = AccountLink.builder()
                .link(RandomStringGenerator.generateRandomString())
                .username(account.getUsername())
                .build();
        link.setId(UUID.randomUUID().toString());
        accountLinkRepository.save(link);

        // request to mail-service
        mailService.system(SingleRequest.builder()
                .type(type)
                .recipient(Recipient.builder()
                        .email(account.getUsername())
                        .firstName(account.getProfile().getFirstName())
                        .lastName(account.getProfile().getLastName())
                        .build())
                .options(Options.<String>builder()
                        .data(link.getLink())
                        .saved(true)
                        .build())
                .build());
    }

    public GenericResponse<Account> setPassword(SetPasswordRequest request) {
        AccountLink link = accountLinkRepository.findByLink(request.getLink());

        if (link == null) {
            return GenericResponse.code(10);
        } else {
            String username = link.getUsername();
            Optional<Account> query = repository.findByUsername(username);
            if (query.isEmpty()) {
                return GenericResponse.code(11);
            } else {
                Account account = query.get();
                account.setPassword(passwordEncoder.encode(request.getPassword()));
                account = repository.save(account);
                return GenericResponse.success(account);
            }
        }
    }


    public GenericResponse readerOtp(String address) {

        Optional<Otp> query = otpRepository.findByAddress(address);
        Otp otp;
        if (query.isPresent()) {
            otp = query.get();
        } else {
            otp = Otp.builder()
                    .address(address)
                    .build();
            otp.newIdAndCreated();
        }

        String code = RandomStringGenerator.getRandomCode(6);

        otp.setCode(passwordEncoder.encode(code));
        otpRepository.save(otp);


        mailService.system(SingleRequest.builder()
                .type(Type.OTP)
                .recipient(Recipient.builder()
                        .email(address)
                        .build())
                .options(Options.<String>builder()
                        .data(code)
                        .saved(true)
                        .build())
                .build());

        return GenericResponse.success();
    }


}
