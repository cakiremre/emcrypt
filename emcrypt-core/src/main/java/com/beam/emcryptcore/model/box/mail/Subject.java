package com.beam.emcryptcore.model.box.mail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@SuperBuilder
public class Subject {
    private String address;
    private String name;
}
