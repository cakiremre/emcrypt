package com.beam.emcryptbox.service;

import com.beam.emcryptbox.repository.ContentRepository;
import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.model.admin.mail.Content;
import com.beam.emcryptcore.model.admin.mail.Type;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ContentService extends BaseService<ContentRepository, Content> {

    /**
     * This method is overriden because it should always return full list.
     *
     */
    @Override
    public List<Content> findAll() {
        List<Content> contents = repository.findAll();
        Arrays.stream(Type.values()).forEach(t -> {
            if(contents.stream().noneMatch(c -> c.getType() == t)){
                Content content = Content.builder().type(t).build();
                content.newIdAndCreated();
                contents.add(content);
            }
        });
        return contents;
    }
}
