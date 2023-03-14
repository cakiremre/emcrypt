package com.beam.emcryptkeyman.controller;

import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.model.keyman.mail.Content;
import com.beam.emcryptkeyman.service.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/ekm/content")
public class ContentController extends BaseController<ContentService, Content> {
}
