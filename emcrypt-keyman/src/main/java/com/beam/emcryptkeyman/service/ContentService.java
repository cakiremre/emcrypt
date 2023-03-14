package com.beam.emcryptkeyman.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.model.keyman.mail.Content;
import com.beam.emcryptcore.model.keyman.mail.Type;
import com.beam.emcryptkeyman.repository.ContentRepository;
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
