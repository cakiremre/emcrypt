package com.beam.emcryptcore.db;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.WebRequestInterceptor;

@Slf4j
public class DbConfigurerInterceptor implements WebRequestInterceptor {

    public static final String TENANT_HEADER = "X-TENANT";

    @Override
    public void preHandle(WebRequest request) {
        String identifier = request.getHeader(TENANT_HEADER);

        if (StringUtils.hasText(identifier)) {
            log.info("Tenant header: {}", identifier);
            TenantContext.setTenant(identifier);
        } else {
            log.info("Tenant header not set. Using common database");
            TenantContext.setTenant(TenantContext.COMMON);
        }
    }

    @Override
    public void postHandle(WebRequest request, ModelMap model) {
        TenantContext.clear();
    }

    @Override
    public void afterCompletion(WebRequest request, Exception ex) {
    }
}
