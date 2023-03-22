package com.beam.emcryptcore.model.box.mail;

import com.beam.emcryptcore.model.common.Accessible;
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

    /** true if forward is disabled */
    private boolean forward;
    private boolean expire;

    private Date expireAt;

    private boolean delay;

    private int delayInMinutes;
    private Date delayAt;

    public Accessible accessibleNow() {

        Date now = new Date();
        if (isDelay() && delayAt.after(now)) {
            return Accessible.DELAY;
        }

        if (isExpire() && expireAt.before(now)) {
            return Accessible.EXPIRE;
        }

        return Accessible.TRUE;
    }
}
