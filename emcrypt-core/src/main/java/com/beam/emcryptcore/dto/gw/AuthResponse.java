package com.beam.emcryptcore.dto.gw;

import com.beam.emcryptcore.model.auth.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class AuthResponse {

    private int code;
    private String token;
    private Account account;

    public static AuthResponse code(int code){
        return AuthResponse.builder()
                .code(code)
                .build();
    }
}
