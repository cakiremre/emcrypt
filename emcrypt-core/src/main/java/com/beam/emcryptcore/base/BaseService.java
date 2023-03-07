package com.beam.emcryptcore.base;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

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
        item.newIdAndCreated();
        return repository.insert(item);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }

    public K update(K item) {
        return repository.save(item);
    }
}