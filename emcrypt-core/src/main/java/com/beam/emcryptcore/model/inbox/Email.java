package com.beam.emcryptcore.model.inbox;

import com.beam.emcryptcore.base.Base;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

@Document("Email")
@TypeAlias("Email")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Email extends Base {

    private String identifier; // tenant

    private Subject from;
    private List<Recipient> to;
    private List<Recipient> cc;
    private List<Recipient> bcc;


    private String subject;

    private String key; // encrypted key
    private String data; // encrypted data

    private Options options;

    private List<Attachment> attachments;

    @JsonIgnore
    @Transient
    public List<Recipient> recipients(){
        return Stream.of(to, cc, bcc)
                .flatMap(Collection::stream)
                .toList();
    }
}
