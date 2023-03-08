package com.beam.emcryptadmin.util;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TenantContext {

    public static final String COMMON="common";

    public static final ThreadLocal<String> CONTEXT = new ThreadLocal<>();

    public static void setTenant(String tenant){
        log.debug("Setting tenant id: " + tenant);
    }

    public static String getTenant(){
        return CONTEXT.get();
    }

    public static void clear(){
        CONTEXT.remove();
    }
}
