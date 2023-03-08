package com.beam.emcryptcore.model.auth;

import com.beam.emcryptcore.base.Base;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import static java.util.Collections.emptyList;

@Document("Account")
@TypeAlias("Account")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Account extends Base {

    private String username;
    private String password;

    private List<Role> authorities;
    private Profile profile;

    @Override
    public Account newIdAndCreated() {
        profile = Profile.init();

        return super.newIdAndCreated();
    }

    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;
}
