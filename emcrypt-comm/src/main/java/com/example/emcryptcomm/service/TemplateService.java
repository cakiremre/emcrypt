package com.example.emcryptcomm.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.model.comm.mail.Content;
import com.beam.emcryptcore.model.comm.mail.Template;
import com.beam.emcryptcore.model.comm.mail.Type;
import com.beam.emcryptcore.model.common.Language;
import com.example.emcryptcomm.repository.TemplateRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.beam.emcryptcore.model.comm.mail.Type.*;
import static com.beam.emcryptcore.model.common.Settings.DEFAULT_SENDER;

@RequiredArgsConstructor
@Slf4j
@Service
public class TemplateService extends BaseService<TemplateRepository, Template> {

    public static final Map<Type, Template> FILE_TEMPLATES = new HashMap<>();
    private final TemplateEngine templateEngine;

    @PostConstruct
    public void readMailTypes() {
        List<Type> types = Arrays.asList(TEST, FORGOT, ACTIVATION, OTP);

        types.forEach(t -> {
            Map<Language, Content> map = new HashMap<>();
            map.put(Language.TR, Content.builder()
                    .subject(t.toString())
                    .body(templateEngine.process(t.toString().toLowerCase(), new Context()))
                    .build());
            FILE_TEMPLATES.put(t, Template.builder()
                    .content(map)
                    .sender(DEFAULT_SENDER)
                    .build());
        });
    }

    public Template findByType(Type type) {
        Template template = repository.findByType(type);

        // for development purposes
        if (template == null) {
            template = FILE_TEMPLATES.get(type);
        }

        return template;
    }
}
