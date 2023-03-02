package com.beam.emcryptcore.model.comm.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Transient;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Sender {
    private String firstName;
    private String lastName;
    private String email;

    @Transient
    public String getFullName() {
        return (firstName != null ? firstName : "") + (lastName != null ? " " + lastName : "");
    }


}
