package com.beam.emcryptgw;

import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.Profile;
import com.beam.emcryptcore.model.auth.Role;
import com.beam.emcryptcore.model.common.Language;
import com.beam.emcryptgw.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.UUID;

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
                .profile(Profile.builder()
                        .firstName("Team")
                        .lastName("Olta.La")
                        .prefer(Language.TR)
                        .build())
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        admin.setId(UUID.randomUUID().toString());

        Account emre = Account.builder()
                .username("emre@beamteknoloji.com")
                .password(passwordEncoder.encode("12345678"))
                .authorities(Arrays.asList(Role.manager()))
                .profile(Profile.builder()
                        .firstName("Emre")
                        .lastName("Cakir")
                        .prefer(Language.EN)
                        .build())
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build();
        emre.setId(UUID.randomUUID().toString());
        accountRepository.saveAll(Arrays.asList(admin, emre));
    }
}
