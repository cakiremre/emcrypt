package com.beam.emcryptcore.dto.comm.mail;

import com.beam.emcryptcore.model.comm.mail.Recipient;
import com.beam.emcryptcore.model.comm.mail.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SingleRequest {

    private Recipient recipient;
    private Type type;
    private Options options;
}
