package com.beam.emcryptcore.dto.gw;

import com.beam.emcryptcore.model.auth.Reader;
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
public class ReaderResponse {
    private int code;
    private String token;
    private Reader reader;

    public static ReaderResponse code(int code){
        return ReaderResponse.builder()
                .code(code)
                .build();
    }
}
