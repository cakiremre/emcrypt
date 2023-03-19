package com.beam.emcryptcore.model.auth;

import com.beam.emcryptcore.base.Base;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.temporal.ChronoUnit;
import java.util.Date;

@Document("Otp")
@TypeAlias("Otp")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Otp extends Base {

    private String address;

    private String code;

    private Date until;

    @Override
    public Otp newIdAndCreated() {
        super.newIdAndCreated();
        until = Date.from(new Date().toInstant().plus(30, ChronoUnit.MINUTES));
        return this;
    }
}
