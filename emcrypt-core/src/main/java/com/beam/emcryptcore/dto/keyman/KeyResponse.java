package com.beam.emcryptcore.dto.keyman;

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
public class KeyResponse<T> {

    private int code;
    private String owner;
    private String message;
    private T data;
}
