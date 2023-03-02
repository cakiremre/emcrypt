package com.beam.emcryptcore.model.comm.mail;

import com.beam.emcryptcore.base.Base;
import com.beam.emcryptcore.model.comm.exception.TemplateException;
import com.beam.emcryptcore.model.common.Language;
import com.beam.emcryptcore.model.common.Settings;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document("Template")
@TypeAlias("Template")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Template extends Base {

    private Map<Language, Content> content;
    private Type type;
    private Sender sender;
    private boolean embed;


    public Content language(Language prefer) throws TemplateException {
        if (content.containsKey(prefer)) {
            return content.get(prefer);
        } else if (content.containsKey(Settings.DEFAULT_LANGUAGE)) {
            return content.get(Settings.DEFAULT_LANGUAGE);
        } else {
            throw new TemplateException(this.type, prefer);
        }
    }

    public Sender getSender() {
        if (sender != null) {
            return sender;
        } else {
            return Settings.DEFAULT_SENDER;
        }
    }
}
