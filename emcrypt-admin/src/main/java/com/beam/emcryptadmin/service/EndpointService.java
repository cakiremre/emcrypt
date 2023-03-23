package com.beam.emcryptadmin.service;


import com.beam.emcryptadmin.repository.EndpointRepository;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.box.KeyResponse;
import com.beam.emcryptcore.model.admin.tenant.Endpoint;
import com.beam.emcryptcore.model.admin.tenant.Ldap;
import com.beam.emcryptcore.model.admin.tenant.Type;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class EndpointService {

    private final EndpointRepository repository;
    private final KeyService keyService;

    private final MongoTemplate mongoTemplate;

    public List<Endpoint> findAll() {
        return repository.findAll();
    }

    private <T extends Endpoint> T query(Type type, Class clazz){
        return (T) mongoTemplate.findOne(Query.query(Criteria.where("type").is(type)), clazz);
    }

    public <T extends Endpoint> T findByType(Type type, Class clazz){
        T item = query(type, clazz);
        if(item != null) {
            item.setEncrypted(true);
        }
        return item;
    }

    public <T extends Endpoint> T findByTypeDecrypted(Type type, Class clazz){
        T item = query(type, clazz);
        if(item != null) {
            KeyResponse<String> response = keyService.decryptRoot(item.getPassword());
            if (response.getCode() == 0) {
                item.setPassword(response.getData());
                item.setEncrypted(false); // default
                return item;
            } else {
                throw new RuntimeException("Cannot decrypt key");
            }
        }else{
            return null;
        }
    }

    public <T extends Endpoint> T insert(T item){
        item.newIdAndCreated();
        if(StringUtils.isEmpty(item.getPassword())){
            return repository.save(item);
        }else {
            KeyResponse<String> response = keyService.encryptRoot(item.getPassword());
            if (response.getCode() == 0) {
                item.setPassword(response.getData());
                item.setEncrypted(true);

                return repository.save(item);
            } else {
                throw new RuntimeException("Cannot decrypt key");
            }
        }
    }

    public <T extends Endpoint> T update(T item){
        if(item.isEncrypted() || StringUtils.isEmpty(item.getPassword())){
            return repository.save(item);
        }else {
            KeyResponse<String> response = keyService.encryptRoot(item.getPassword());
            if (response.getCode() == 0) {
                item.setPassword(response.getData());
                item.setEncrypted(true);
                return repository.save(item);
            } else {
                throw new RuntimeException("Cannot decrypt key");
            }
        }
    }

    public void delete(Type type) {
        repository.deleteByType(type);
    }

    public GenericResponse test(Ldap ldap) {
        if(ldap.isEncrypted()){
            KeyResponse<String> response = keyService.decryptRoot(ldap.getPassword());
            if(response.getCode() == 0){
                ldap.setPassword(response.getData());
            }else{
                log.error("Cannot decrypt ldap password");
                throw new RuntimeException("Password decrypt error");
            }
        }
        return LdapService.test(ldap);
    }
}
