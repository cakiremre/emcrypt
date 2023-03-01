package com.beam.emcryptcore.base;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class BaseController<T extends BaseService, K extends Base> {

    @Autowired
    protected T service;

    @GetMapping("list")
    public List<K> list() {
        return service.findAll();
    }

    @GetMapping("{id}")
    public K get(@PathVariable String id) {
        return (K)service.findById(id);
    }

    // insert
    @PostMapping
    public K insert(@RequestBody K item) {
        return (K)service.create(item);
    }

    @PutMapping
    public K update(@RequestBody K item) {
        return (K)service.update(item);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
