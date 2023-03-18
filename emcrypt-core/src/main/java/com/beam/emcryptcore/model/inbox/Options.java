package com.beam.emcryptcore.model.inbox;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Options {

    private boolean emcrypt;
    private boolean forward;
    private boolean expire;

    private Date expireAt;

    private boolean delay;

    private int delayInMinutes;
    private Date delayAt;

}
