package com.beam.emcryptcore.base;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
public class BaseService<T extends MongoRepository<K, String>, K extends Base> {

    @Autowired
    protected T repository;

    public List<K> findAll() {
        return repository.findAll();
    }

    public K findById(String id) {
        return repository.findById(id)
                .orElse(null);
    }

    public K create(K item) {
        item.setId(UUID.randomUUID().toString());
        return repository.insert(item);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public K update(K item) {
        return repository.save(item);
    }
}