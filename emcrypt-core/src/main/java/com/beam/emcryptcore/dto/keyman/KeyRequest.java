package com.beam.emcryptcore.dto.keyman;

import com.beam.emcryptcore.model.keyman.crypto.EmKeyType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class KeyRequest {
    private EmKeyType type;
    private String owner;
}
