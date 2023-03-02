package com.beam.emcryptgw;

import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.Role;
import com.beam.emcryptgw.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@EnableFeignClients
@RequiredArgsConstructor
@EnableDiscoveryClient
@SpringBootApplication
public class EmcryptGwApplication implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;

    public static void main(String[] args) {
        SpringApplication.run(EmcryptGwApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        accountRepository.deleteAll();
        Account admin = Account.builder()
                .username("team@olta.la")
                .password(passwordEncoder.encode("12345678"))
                .authorities(Arrays.asList(Role.admin()))
                .build();

        Account emre = Account.builder()
                .username("emre@beamteknoloji.com")
                .password(passwordEncoder.encode("12345678"))
                .authorities(Arrays.asList(Role.admin()))
                .build();
        accountRepository.saveAll(Arrays.asList(admin, emre));
    }
}
