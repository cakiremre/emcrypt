package com.beam.emcryptcore.model.inbox;

import com.beam.emcryptcore.base.Base;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("Email")
@TypeAlias("Email")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Email extends Base {

    private String identifier; // tenant

    private String from;
    private List<String> to;
    private String subject;

    private String key; // encrypted key
    private String data; // encrypted data
}
