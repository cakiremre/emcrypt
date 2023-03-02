package com.beam.emcryptcore.dto.comm.mail;

import com.beam.emcryptcore.model.comm.mail.Recipient;
import com.beam.emcryptcore.model.comm.mail.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MultipleRequest {

    private List<Recipient> recipientList;
    private Type type;
    private Options options;
}
