package com.beam.emcryptcore.db;

import com.beam.emcryptcore.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.WebRequestInterceptor;

@Slf4j
@RequiredArgsConstructor
public class DbConfigurerInterceptor implements WebRequestInterceptor {

    public static final String TENANT_HEADER = "X-TENANT";

    private final JwtService jwtService;

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

        // FIXME Authetication setter
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authHeader != null) {
            String token = authHeader.substring(7);
            AccountContext.setUsername(jwtService.extractUsername(token));
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
