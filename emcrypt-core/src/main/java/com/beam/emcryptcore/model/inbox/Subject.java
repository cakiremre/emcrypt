package com.beam.emcryptcore.model.inbox;

import lombok.AllArgsConstructor;
import lombok.Builder;
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
