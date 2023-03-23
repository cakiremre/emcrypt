package com.beam.emcryptadmin.service;

import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.model.admin.company.User;
import com.beam.emcryptcore.model.admin.tenant.Ldap;
import com.beam.emcryptcore.model.common.Language;
import com.beam.emcryptcore.util.CryptoUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ldap.control.PagedResultsDirContextProcessor;
import org.springframework.ldap.core.AttributesMapper;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.core.support.LdapContextSource;
import org.springframework.ldap.core.support.SingleContextSource;
import org.springframework.ldap.filter.AndFilter;
import org.springframework.ldap.filter.Filter;
import org.springframework.ldap.filter.HardcodedFilter;
import org.springframework.ldap.filter.OrFilter;

import javax.naming.NamingException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.SearchControls;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static io.micrometer.common.util.StringUtils.isNotEmpty;
import static org.springframework.ldap.query.LdapQueryBuilder.query;

@Slf4j
public class LdapService {

    private Logger logger = LoggerFactory.getLogger(LdapService.class);

    private LdapTemplate ldapTemplate = null;
    private Ldap ldap = null;
    private boolean configurationOk = false;

    private final static List<String> DISABLED_UAC = Arrays.asList("2", "514", "546", "66050", "66082", "262658", "262690", "328194", "328226");

    private LdapService() {
    }

    private void createLdapTemplate(Ldap ldap) {
        try {
            if (ldap.configurationOk()) {
                LdapContextSource ctx = new LdapContextSource();

                ctx.setUrl(ldap.getUrl());
                ctx.setPassword(ldap.getPassword());
                ctx.setUserDn(ldap.getUserdn());

                ctx.setBase(ldap.getBasedn());

                if (ldap.isTrust()) {
                    SSLContext tx = CryptoUtils.trustAllSSLContext();

                    HttpsURLConnection.setDefaultSSLSocketFactory(tx.getSocketFactory());
                    HttpsURLConnection.setDefaultHostnameVerifier(new NoopHostnameVerifier());

                    SSLContext.setDefault(tx);
                    System.setProperty("com.sun.jndi.ldap.object.disableEndpointIdentification", "true");
                }

                ctx.afterPropertiesSet();

                LdapTemplate ldapTemplate = new LdapTemplate(ctx);
                ldapTemplate.setDefaultTimeLimit(30000);

                ldapTemplate.setIgnorePartialResultException(true);
                ldapTemplate.setIgnoreNameNotFoundException(true);
                ldapTemplate.setIgnoreSizeLimitExceededException(true);

                this.ldapTemplate = ldapTemplate;
                this.configurationOk = true;
            } else {
                logger.info("LDAP Configuration is Not OK. Credentials missing.");
            }
        } catch (Exception exc) {
            logger.error(exc.getClass().getSimpleName() + "-" + exc.getMessage());
            throw new RuntimeException(exc.getClass().getSimpleName() + "-" + exc.getMessage());
        }
    }

    public LdapTemplate getLdapTemplate() {
        if (this.configurationOk) {
            return ldapTemplate;
        } else {
            return null;
        }
    }

    public static LdapService build(Ldap ldap) throws RuntimeException {
        LdapService ldapService = new LdapService();
        ldapService.createLdapTemplate(ldap);
        ldapService.ldap = ldap;
        return ldapService;
    }

    public static GenericResponse test(Ldap ldap) {
        try {
            LdapService ldapService = build(ldap);

            if (ldapService != null && ldapService.configurationOk) {
                ldapService.getLdapTemplate().getContextSource().getContext(ldap.getUserdn(), ldap.getPassword());
                return GenericResponse.success();
            } else {
                return GenericResponse.code(100);
            }
        } catch (Exception exc) {
            return GenericResponse.error(101, exc.getClass().getSimpleName() + "-" + exc.getMessage());
        }
    }

    public List<User> getAllPeople() {
        if (this.configurationOk) {
            final SearchControls sc = new SearchControls();
            sc.setSearchScope(SearchControls.SUBTREE_SCOPE);
            sc.setReturningAttributes(getReturningAttributes());

            final PagedResultsDirContextProcessor processor =
                    new PagedResultsDirContextProcessor(900);


            return SingleContextSource.doWithSingleContext(ldapTemplate.getContextSource(), operations -> {
                List<User> result = new ArrayList<>();

                do {
                    // FIXME Gokhan please fix me.
                    if (operations instanceof LdapTemplate) {
                        ((LdapTemplate) operations).setIgnorePartialResultException(true);
                    }
                    List<User> oneResult = operations.search(
                            "",
                            getObjectCategoryFilter(ldap.getUserCategory(), Arrays.asList("Person")).encode(),
                            sc,
                            new PersonAttributesMapper(),
                            processor
                    );
                    result.addAll(oneResult);
                } while (processor.hasMore());
                return result;
            });
        } else {
            throw new RuntimeException("LDAP Configuration missing.");
        }
    }

    private Filter getObjectCategoryFilter(String input, List<String> def) {

        List<String> inputParts;
        if (input != null) {
            inputParts = Arrays.asList(input.split(","));
        } else {
            inputParts = def;
        }

        OrFilter orFilter = new OrFilter();
        inputParts.forEach(ip -> orFilter.or(query().where("objectClass").is(ip).filter()));

        return orFilter;
    }

    private String getEmailFilter(String email) {

        OrFilter filter = new OrFilter();

        // or AD user email
        if (StringUtils.isNotBlank(ldap.getEmailAttr())) {
            String[] emailAttr = ldap.getEmailAttr().split(",");

            for (String attr : emailAttr) {
                filter.or(query().where(attr).is(email).filter());
            }
        }
        return filter.encode();
    }

    public List<User> getAllPeopleWithEmail() {
        return getAllPeople()
                .stream()
                .filter(u -> StringUtils.isNotBlank(u.getEmail()))
                .collect(Collectors.toList());
    }

    public List<User> searchByEmail(String email) {
        return searchByFilter(getEmailFilter(email));
    }

    public List<User> searchByFilter(String filter) {
        if (this.configurationOk) {
            return ldapTemplate.search(
                    query()
                            .attributes(getReturningAttributes())
                            .filter(filter)
                    , new PersonAttributesMapper());
        } else {
            throw new RuntimeException("LDAP Configuration missing.");
        }
    }

    public List<User> searchAllPeople(String filter) {
        if (this.configurationOk) {
            final SearchControls sc = new SearchControls();
            sc.setSearchScope(SearchControls.SUBTREE_SCOPE);
            sc.setReturningAttributes(getReturningAttributes());

            final PagedResultsDirContextProcessor processor =
                    new PagedResultsDirContextProcessor(900);
            return SingleContextSource.doWithSingleContext(ldapTemplate.getContextSource(), operations -> {
                List<User> result = new ArrayList<>();

                do {
                    // FIXME Gokhan please fix me.
                    if (operations instanceof LdapTemplate) {
                        ((LdapTemplate) operations).setIgnorePartialResultException(true);
                    }

                    AndFilter f = new AndFilter();
                    f.and(getObjectCategoryFilter(ldap.getUserCategory(), Arrays.asList("Person")));
                    f.and(new HardcodedFilter(filter));

                    List<User> oneResult = operations.search(
                            "",
                            f.encode(),
                            sc,
                            new PersonAttributesMapper(),
                            processor
                    );
                    result.addAll(oneResult);
                } while (processor.hasMore());
                return result;
            });
        } else {
            throw new RuntimeException("LDAP Configuration missing.");
        }
    }

    public List<User> searchAllPeopleWithEmail(String filter) {
        if (StringUtils.isNotBlank(filter) && filter.charAt(0) != '(' && filter.charAt(filter.length() - 1) != ')') {
            filter = "(" + filter + ")";
        }
        return searchAllPeople(filter)
                .stream()
                .filter(u -> StringUtils.isNotBlank(u.getEmail()))
                .collect(Collectors.toList());
    }

    private class PersonAttributesMapper implements AttributesMapper<User> {

        @Override
        public User mapFromAttributes(Attributes attrs) throws NamingException {
            User user = new User();
            user.newIdAndCreated();

            String valueMail = getValue(attr(attrs, ldap.getEmailAttr()));
            if (StringUtils.isNotBlank(valueMail)) {
                user.setEmail(valueMail);
            }

            String uac = getValue(attr(attrs, "userAccountControl"));
            if (StringUtils.isNotBlank(uac)) {
                if (DISABLED_UAC.contains(uac)) {
                    logger.info("{} is disabled. UAC : {}", valueMail, uac);
                    return new User();
                }
            }

            user.getProfile().setFirstName(getValue(attr(attrs, ldap.getFirstNameAttr())));
            user.getProfile().setLastName(getValue(attr(attrs, ldap.getLastNameAttr())));

            if (isNotEmpty(ldap.getLanguageAttr())) {
                String langString = getValue(attr(attrs, ldap.getLanguageAttr()));
                if (isNotEmpty(langString)) {
                    Language language = Language.fromString(langString.toUpperCase());
                    if (language != null) {
                        user.getProfile().setPrefer(language);
                    }
                }
            }
            return user;
        }
    }

    private String getValue(Attribute attr) throws NamingException {
        if (attr != null) {
            return attr.get().toString();
        } else {
            return null;
        }
    }

    private Attribute attr(Attributes attrs, String key) {
        if (key != null) {
            if (key.contains(",")) {
                List<String> keyList = Arrays.asList(key.split(","));
                for (String k : keyList) {
                    if (attrs.get(k) != null) {
                        return attrs.get(k);
                    }
                }
                return null;
            } else {
                return attrs.get(key);
            }
        } else {
            return null;
        }
    }

    private String[] getReturningAttributes() {
        List<String> ra = new ArrayList<>();
        if (StringUtils.isNotBlank(ldap.getEmailAttr())) {
            ra.addAll(new ArrayList<>(Arrays.asList(ldap.getEmailAttr().split(","))));
        } else {
            ra.add("userPrincipalName");
        }
        ra.add(ldap.getFirstNameAttr());
        ra.add(ldap.getLastNameAttr());
        if (isNotEmpty(ldap.getLanguageAttr())) {
            ra.add(ldap.getLanguageAttr());
        }

        ra.add("userAccountControl");

        return ra.toArray(new String[0]);
    }

    /*
    public List<LdapGroup> getLdapGroups() {
        if (this.configurationOk) {
            final SearchControls sc = new SearchControls();
            sc.setSearchScope(SearchControls.SUBTREE_SCOPE);
            sc.setReturningAttributes(getReturningAttributes());

            final PagedResultsDirContextProcessor processor =
                    new PagedResultsDirContextProcessor(900);


            List<LdapGroup> groups = SingleContextSource.doWithSingleContext(ldapTemplate.getContextSource(), operations -> {
                List<LdapGroup> result = new ArrayList<>();

                do {
                    // FIXME Gokhan please fix me.
                    if (operations instanceof LdapTemplate) {
                        ((LdapTemplate) operations).setIgnorePartialResultException(true);
                    }

                    List<LdapGroup> oneResult = operations.search(
                            "",
                            getObjectCategoryFilter(ldapConfig.getGroupObjectCategory(), Arrays.asList("Group")).encode(),
                            sc,
                            new GroupAttributesMapper(),
                            processor
                    );
                    result.addAll(oneResult);
                } while (processor.hasMore());
                return result;
            });

            groups.add(getRoot());

            fixBastards(groups);
            return groups;
        } else {
            throw new JsonException("LDAP Configuration missing.");
        }
    }




    private void fixBastards(List<LdapGroup> groups) {
        Map<String, LdapGroup> map = new HashMap<>();

        groups.forEach(gr -> map.put(gr.getName(), gr));

        List<LdapGroup> virtual = new ArrayList<>();

        groups.forEach(gr -> {
            if (!map.containsKey(gr.getParent())) {
                if (!gr.getParent().equals("#")) { // dont create parent for root.
                    LdapGroup group = new LdapGroup();
                    group.setDn(getParentDn(gr.getDn()));
                    group.setName(gr.getParent());
                    group.setId(group.getName());
                    if (isDC(group.getDn())) {
                        group.setObjectType("SUB");
                    } else {
                        group.setObjectType("OTH");
                    }
                    String parentName = getMidParentNameIfExists(gr.getName());
                    if (parentName == null) {
                        group.setParent(getRoot().getId());
                    } else {
                        group.setParent(parentName);
                    }

                    map.put(group.getName(), group);
                    virtual.add(group);
                }
            }
        });

        groups.addAll(virtual);

        groups.forEach(gr -> gr.setId(gr.getName() + ";" + gr.getObjectType()));
        groups.forEach(gr -> {
            if (!gr.getParent().equals("#")) {
                if (map.containsKey(gr.getParent())) {
                    gr.setParent(map.get(gr.getParent()).getId());
                } else {
                    gr.setParent("#");
                }
            }
        });

    }

    private String getParentDn(String dn) {
        return dn.substring(dn.indexOf(",") + 1);
    }

    private boolean isDC(String dn) {
        List<Rdn> item = LdapUtils.newLdapName(dn).getRdns();
        for (Rdn i : item) {
            if (!i.getType().equals("DC")) {
                return false;
            }
        }
        return true;
    }

    public User getMe() {
        return ldapTemplate.lookup(ldapConfig.getUserDn(), new PersonAttributesMapper());
    }

    public GenericResponse countUsersAndGroups() {
        return new GenericResponse()
                .setCode(0)
                .setData(new LdapQueryTestResponse()
                        .setGroups(getLdapGroups().size())
                        .setUsers(getAllPeopleWithEmail().size()));
    }


    private class PersonAttributesMapper implements AttributesMapper<LdapUser> {

        @Override
        public LdapUser mapFromAttributes(Attributes attrs) throws NamingException {
            LdapUser user = new LdapUser();

            String valueMail = getValue(attr(attrs, ldapConfig.getEmailAttr()));
            if (StringUtils.isNotBlank(valueMail)) {
                user.setEmail(CryptoUtils.encryptGeneral(valueMail));
            }

            boolean enabled = true;
            boolean continueWrite = false;
            String uac = getValue(attr(attrs, "userAccountControl"));
            if (StringUtils.isNotBlank(uac)) {
                if (DISABLED_UAC.contains(uac)) {
                    enabled = false;
                    logger.info("{} is disabled. UAC : {}", valueMail, uac);
                }
            }

            if (enabled || ldapConfig.isDisabled()) {
                continueWrite = true;
            }

            if (!continueWrite) {
                return new LdapUser();
            }

            user.setAdName(getValue(attr(attrs, ldapConfig.getLoginUsernameAttr())));
            user.setFirstName(getValue(attr(attrs, ldapConfig.getFirstNameAttr())));
            user.setLastName(getValue(attr(attrs, ldapConfig.getLastNameAttr())));

            user.setTitle(getValue(attr(attrs, ldapConfig.getTitleAttr())));
            user.setSpecialFields(getSpecialFields(attrs, ldapConfig.getSpecialFieldAttr()));
            String valuePhone = getValue(attr(attrs, ldapConfig.getPhoneAttr()));
            if (StringUtils.isNotBlank(valuePhone)) {
                user.setPhone(CryptoUtils.encryptGeneral(valuePhone));
            }

            String cns = getParent(attrs.get("distinguishedName").get().toString());
            if (cns != null) {
                user.setCns(Arrays.asList(cns));
            }

            if (attrs.get("memberOf") != null) {
                user.setGroups(new ArrayList<>());
                NamingEnumeration<?> names = attrs.get("memberOf").getAll();
                while (names.hasMore()) {
                    user.getGroups()
                            .add(getGroupName(names.next()));
                }
            } else {
                user.setGroups(new ArrayList<>());
            }

            if (isNotEmpty(ldapConfig.getLanguageAttr())) {
                String langString = getValue(attr(attrs, ldapConfig.getLanguageAttr()));
                if (isNotEmpty(langString)) {
                    Language language = Language.fromString(langString.toUpperCase());
                    if (language != null) {
                        user.setLanguage(language);
                    }
                }
            }

            user.setDepartment(getValue(attr(attrs, ldapConfig.getDepartmentAttr())));
            String valueManager = getValue(attr(attrs, ldapConfig.getManagerEmailAttr()));
            if (StringUtils.isNotBlank(valueManager)) {
                user.setManagerEmail(CryptoUtils.encryptGeneral(valueManager));
            }

            if (ldapConfig.getRegionalManagerAttr() != null) {
                String key = ldapConfig.getRegionalManagerAttr().keySet().stream().findFirst().orElse(null);
                if (StringUtils.isNotBlank(key)) {
                    String value = ldapConfig.getRegionalManagerAttr().get(key);
                    if (StringUtils.isNotBlank(value)) {
                        user.setNotificationManager(Objects.equals(getValue(attr(attrs, key)), value));
                    }
                }
            }
            return user;
        }
    }

    private LdapGroup getRoot() {
        LdapGroup root = new LdapGroup();
        root.setObjectType("BASE");
        root.setName(getBaseAddress());
        root.setId(root.getName());
        root.setParent("#");
        return root;
    }

    private class GroupAttributesMapper implements AttributesMapper<LdapGroup> {

        LdapGroup base = getRoot();

        @Override
        public LdapGroup mapFromAttributes(Attributes attrs) throws NamingException {
            LdapGroup group = new LdapGroup();
            group.setParentOrBase(getParent(attrs.get("distinguishedName").get().toString()), base);
            group.setDn(attrs.get("distinguishedName").get().toString());

            String canonicalName = getValue(attrs.get("canonicalName"));
            group.setName(canonicalName.replace(getRoot().getName(), ""));

            if (!group.getName().startsWith("/")) {
                group.setName(group.getName().replace(".", ""));
                group.setName("/" + group.getName());
            }

            group.setType(Type.Ldap);
            if (isDC(group.getDn())) {
                group.setObjectType("SUB");
            } else {
                group.setObjectType(getObjectType(attrs.get("objectclass").getAll()));
            }
            // required for js-tree.
            group.setId(group.getName());

            return group;
        }
    }


    // TODO fix this method.
    private String[] getReturningAttributes() {
        List<String> ra = new ArrayList<>();
        if (StringUtils.isNotBlank(ldapConfig.getEmailAttr())) {
            ra.addAll(new ArrayList<>(Arrays.asList(ldapConfig.getEmailAttr().split(","))));
        } else {
            ra.add("userPrincipalName");
        }
        ra.add(ldapConfig.getFirstNameAttr());
        ra.add(ldapConfig.getLastNameAttr());
        ra.add(ldapConfig.getTitleAttr());
        if (isNotEmpty(ldapConfig.getLanguageAttr())) {
            ra.add(ldapConfig.getLanguageAttr());
        }
        ra.add(ldapConfig.getLoginUsernameAttr());
        ra.add("userAccountControl");
        ra.add("memberOf");
        ra.add("canonicalName");
        ra.add("name");
        ra.add("ou");
        ra.add("distinguishedName");
        ra.add("objectclass");
        ra.add(ldapConfig.getDepartmentAttr());
        ra.add(ldapConfig.getManagerEmailAttr());
        ra.add(ldapConfig.getPhoneAttr());
        if (ldapConfig.getRegionalManagerAttr() != null && ldapConfig.getRegionalManagerAttr().entrySet().size() == 1) {
            for (Map.Entry<String, String> entry : ldapConfig.getRegionalManagerAttr().entrySet()) {
                ra.add(entry.getKey());
            }
        }

        if (ldapConfig.getSpecialFieldAttr() != null) {
            ra.addAll(Arrays.asList(ldapConfig.getSpecialFieldAttr().split(",")));
        }
        return ra.toArray(new String[0]);
    }

    private Map<String, String> getSpecialFields(Attributes attrs, String attrNames) throws NamingException {
        Map<String, String> map = new HashMap<>();

        if (attrNames != null) {
            List<String> fields = Arrays.asList(attrNames.trim().split(","));
            for (String f : fields) {
                f = f.trim();
                map.put(f, getValue(attr(attrs, f)));
            }
        }

        return map;
    }

    private Attribute attr(Attributes attrs, String key) {
        if (key != null) {
            if (key.contains(",")) {
                List<String> keyList = Arrays.asList(key.split(","));
                for (String k : keyList) {
                    if (attrs.get(k) != null) {
                        return attrs.get(k);
                    }
                }
                return null;
            } else {
                return attrs.get(key);
            }
        } else {
            return null;
        }
    }

    private String getValue(Attribute attr) throws NamingException {
        if (attr != null) {
            return attr.get().toString();
        } else {
            return null;
        }
    }

    private String getObjectType(NamingEnumeration<?> clz) {
        List<String> types = new ArrayList<>();

        try {
            while (clz.hasMore()) {
                types.add(clz.next().toString());
            }
        } catch (NamingException exc) {

        }

        return types.get(1);
    }

    private List<Rdn> clearBaseDN(List<Rdn> input) {
        List<Rdn> toRemove = LdapUtils.newLdapName(ldapConfig.getBaseDn()).getRdns();
        input.removeAll(toRemove);
        return input;
    }

    private String getMidParentNameIfExists(String name) {
        int count = StringUtils.countMatches(name, "/");
        if (count > 2) {
            return name.substring(0, name.indexOf("/", 1));
        } else {
            return null;
        }
    }

    private String getParent(String dn) {
        List<Rdn> group = new ArrayList<>(LdapUtils.newLdapName(dn).getRdns());
        group.remove(group.size() - 1); // remove itself first.

        group = clearBaseDN(group);

        if (group.size() > 0) {
            return "/" + group.stream()
                    .map(g -> g.getValue().toString())
                    .collect(Collectors.joining("/"));
        } else {
            return null;
        }
    }

    private String getBaseAddress() {
        List<Rdn> asd = new ArrayList<>(LdapUtils.newLdapName(ldapConfig.getBaseDn()).getRdns());
        Collections.reverse(asd);

        return asd.stream()
                .map(d -> d.getValue().toString())
                .collect(Collectors.joining("."));
    }

    private String getGroupName(Object next) {

        String dn = next.toString();

        List<Rdn> anc = new ArrayList<>(LdapUtils.newLdapName(dn).getRdns());
        //anc = clearDC(anc);

        String name = anc.get(anc.size() - 1).getValue().toString();
        String parent = getParent(dn);

        return parent == null ? name : parent + "/" + name;
    }

    private String getEmailFilter(String email) {

        OrFilter filter = new OrFilter();

        // or AD user email
        if (StringUtils.isNotBlank(ldapConfig.getEmailAttr())) {
            String[] emailAttr = ldapConfig.getEmailAttr().split(",");

            for (String attr : emailAttr) {
                filter.or(query().where(attr).is(email).filter());
            }
        }
        return filter.encode();
    }

    public boolean validatePassword(String username, String password) {
        if (StringUtils.isNoneEmpty(username, password)) {
            try {
                String filter = getLoginFilter(username);
                return ldapTemplate.authenticate("", filter, password, new LookupAttemptingCallback());
            } catch (RuntimeException exc) {
                logger.error("Exception during password validation. [Message: " + exc.getMessage() + ", Class: " + exc.getClass().getSimpleName() + "]");
                return false;
            }
        } else {
            logger.info("Username or password is null during password validation.");
            return false;
        }
    }

    private String getLoginFilter(String username) {

        OrFilter filter = new OrFilter();

        // samaccountname
        if (StringUtils.isNotBlank(ldapConfig.getLoginUsernameAttr())) {
            filter.or(query().where(ldapConfig.getLoginUsernameAttr()).is(username).filter());
        } else {
            filter.or(query().where("sAMAccountName").is(username).filter());
        }

        // or AD user email
        if (StringUtils.isNotBlank(ldapConfig.getEmailAttr())) {
            String[] emailAttr = ldapConfig.getEmailAttr().split(",");

            for (String attr : emailAttr) {
                filter.or(query().where(attr).is(username).filter());
            }
        }
        return filter.encode();
    }

 */
}

