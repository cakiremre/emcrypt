package com.beam.emcryptcore.model.comm.mail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Content {
    private String body;
    private String subject;

    public Content copy() {
        return Content.builder()
                .body(this.body)
                .subject(this.subject)
                .build();
    }

    public String getBody(String key, String value) {
        return body.replace(key, value);
    }

    public void transformBody(String key, String value){
        this.body = getBody(key, value);
    }
}
