package com.beam.emcryptcore.model.inbox;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Decrypted {

    private Subject from;

    private String subject;
    private String content;

    private List<Attachment> attachments;
}
