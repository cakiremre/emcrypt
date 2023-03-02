package com.beam.emcryptcore.model.comm.mail;

import com.beam.emcryptcore.base.Base;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document("Mail")
@TypeAlias("Mail")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Mail extends Base {

    public static final int HIGH = 5;
    public static final int MEDIUM = 3;
    public static final int LOW = 1;

    private Sender sender;
    private List<Recipient> recipient = new ArrayList<>();
    private Content content;
    private Date estimated;
    private Date sent;
    private Status status = Status.PENDING;
    private int tried = 0;
    private Type type;
    private int priority = LOW;

    public void incrementTryCount(int level) {
        tried++;
    }
}
