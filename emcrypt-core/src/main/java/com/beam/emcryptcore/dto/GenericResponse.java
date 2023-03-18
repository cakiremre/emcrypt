package com.beam.emcryptcore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GenericResponse<T> {

    private int code;
    private String message;
    private T data;

    public static GenericResponse code(int code) {
        return GenericResponse.builder()
                .code(code)
                .build();
    }

    public static GenericResponse success() {
        return GenericResponse.builder()
                .code(0)
                .build();
    }

    public static <T> GenericResponse success(T data) {
        return GenericResponse.<T>builder()
                .code(0)
                .data(data)
                .build();
    }

    public static GenericResponse error(int code, String message) {
        return GenericResponse.builder()
                .code(code)
                .message(message)
                .build();
    }
}