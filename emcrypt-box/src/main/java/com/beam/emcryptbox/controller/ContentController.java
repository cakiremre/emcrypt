package com.beam.emcryptbox.controller;

import com.beam.emcryptbox.service.ContentService;
import com.beam.emcryptcore.base.BaseController;
import com.beam.emcryptcore.model.keyman.mail.Content;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/box/content")
public class ContentController extends BaseController<ContentService, Content> {
}
