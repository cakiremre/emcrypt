package com.beam.emcryptcore.dto.comm.mail;

import com.beam.emcryptcore.model.comm.mail.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Result {

    private String id;
    private Status status;
    private String message;
}
