package com.beam.emcryptcore.model.comm.mail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Options<T> {

    private boolean saved;
    private T data;
}
