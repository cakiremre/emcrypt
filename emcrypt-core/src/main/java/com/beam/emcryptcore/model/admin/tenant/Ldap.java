package com.beam.emcryptcore.model.admin.tenant;


import com.beam.emcryptcore.base.Base;
import lombok.Data;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Endpoint")
@TypeAlias("Ldap")
@Data
@Accessors(chain = true)
public class Ldap extends Endpoint {

    private String url;
    private String basedn;

    private boolean trust;
    private String userdn;
    private String userCategory;
    private String firstNameAttr;
    private String lastNameAtr;
    private String emailAttr;
    private String languageAttr;

    @Override
    public <T extends Base> T newIdAndCreated() {
        setType(Type.LDAP);
        return super.newIdAndCreated();
    }
}
