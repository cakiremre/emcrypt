package com.beam.emcryptcore.model.keyman.mail;

import com.beam.emcryptcore.base.Base;
import com.beam.emcryptcore.model.common.Language;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Transient;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Document("Content")
@TypeAlias("Content")
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
@Data
@Builder
public class Content extends Base {

    private Type type;
    private Map<Language, String> html;

    @Transient
    private boolean missing;

    @Override
    public Content newIdAndCreated() {
        super.newIdAndCreated();
        missing = true;
        html = new HashMap<>();
        Arrays.stream(Language.values()).forEach(l -> html.put(l, null));
        return this;
    }
}
