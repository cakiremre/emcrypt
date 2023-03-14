package com.beam.emcryptcore.model.keyman.crypto;


import com.beam.emcryptcore.base.Base;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("EmKey")
@TypeAlias("EmKey")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class EmKey extends Base {

    private EmKeyType keyType;

    /**
     * identifier for tenant
     * email for user
     * */
    private String owner;

    private String pubkey;
    private String prikey;
}
