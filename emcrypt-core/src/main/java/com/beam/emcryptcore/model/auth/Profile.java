package com.beam.emcryptcore.model.auth;

import com.beam.emcryptcore.model.common.Language;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Transient;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Profile {

    private String firstName;
    private String lastName;
    private Language prefer;

    public static Profile init() {
        return Profile.builder()
                .firstName("")
                .lastName("")
                .prefer(Language.TR)
                .build();
    }

    @Transient
    public String fullName() {
        return (firstName != null ? firstName : "") + (lastName != null ? " " + lastName : "");
    }
}
