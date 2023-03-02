package com.beam.emcryptcore.exception.comm;

import com.beam.emcryptcore.model.comm.mail.Type;
import com.beam.emcryptcore.model.common.Language;

public class TemplateException extends Exception {

    public static final String NOT_FOUND = "Template of type {} not found in store";
    public static final String CONTENT_NOT_FOUND = "Template content of type {} in language {} not found in store";

    public TemplateException(Type type){
        super(String.format(NOT_FOUND));
    }

    public TemplateException(Type type, Language language) {
        super(String.format(CONTENT_NOT_FOUND, type, language));
    }

}
