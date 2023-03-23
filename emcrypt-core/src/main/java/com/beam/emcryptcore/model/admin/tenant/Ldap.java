package com.beam.emcryptcore.model.admin.tenant;


import com.beam.emcryptcore.base.Base;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Endpoint")
@TypeAlias("Ldap")
@Getter
@Setter
@Accessors(chain = true)
public class Ldap extends Endpoint {

    private String url;
    private String basedn;

    private boolean trust;
    private String userdn;
    private String userCategory;
    private String firstNameAttr;
    private String lastNameAttr;
    private String emailAttr;
    private String languageAttr;

    @Override
    public <T extends Base> T newIdAndCreated() {
        setType(Type.LDAP);
        return super.newIdAndCreated();
    }

    public boolean configurationOk(){
        return StringUtils.isNotBlank(getUrl())
                && StringUtils.isNotBlank(getUserdn())
                && StringUtils.isNotBlank(getPassword());
    }
}
