package com.beam.emcryptcore.model.admin.company;

import com.beam.emcryptcore.base.Base;
import com.beam.emcryptcore.model.auth.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
@TypeAlias("User")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User extends Base {

    private String email;
    private Profile profile;
    private boolean activated;
}
