package com.beam.emcryptcore.dto.comm;

import com.beam.emcryptcore.model.comm.mail.Options;
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
public class SingleMailRequest {

    private Recipient recipient;
    private Type type;
    private Options options;
}
