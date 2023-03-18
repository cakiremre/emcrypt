package com.beam.emcryptcore.model.inbox;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@SuperBuilder
public class Recipient extends Subject {

    private boolean revoked;
    private boolean accessed;
    private List<Recipient> to;
    private List<Recipient> cc;
    private List<Recipient> bcc;
}
