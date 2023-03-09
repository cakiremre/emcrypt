package com.beam.emcryptkeyman.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.keyman.KeyRequest;
import com.beam.emcryptcore.dto.keyman.KeyResponse;
import com.beam.emcryptcore.model.keyman.EmKey;
import com.beam.emcryptcore.model.keyman.KeyType;
import com.beam.emcryptkeyman.repository.EmKeyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmKeyService extends BaseService<EmKeyRepository, EmKey> {


    public KeyResponse create(KeyRequest keyRequest) {
        /// generate key-pair
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048);

            KeyPair pair = generator.generateKeyPair();

            EmKey emKey = EmKey.builder()
                    .keyType(keyRequest.getType())
                    .owner(keyRequest.getOwner())
                    .pubkey(Base64.getEncoder().encodeToString(pair.getPublic().getEncoded()))
                    .prikey(Base64.getEncoder().encodeToString(pair.getPrivate().getEncoded()))
                    .build();

            // FIXME delete old key first; for development purposes.
            // Decide; reject or re-generate key; if owner already has one
            repository.deleteByOwner(keyRequest.getOwner());

            create(emKey);

            return KeyResponse.builder()
                    .code(0)
                    .owner(keyRequest.getOwner())
                    .build();

        } catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage());
            e.printStackTrace();
            return KeyResponse.builder()
                    .code(100)
                    .owner(keyRequest.getOwner())
                    .message(e.getMessage())
                    .build();
        }
    }

    public List<KeyResponse> createAll(List<KeyRequest> keyRequests) {
        int count = keyRequests.size();
        log.info("Total of {} requests", count);
        List<KeyResponse> responseList = new ArrayList<>();
        for (KeyRequest r : keyRequests) {
            responseList.add(create(r));
            log.info(" {} request remained", --count);
        }
        return responseList;
    }

    public KeyResponse<String> findByOwner(String owner, KeyType keyType) {
        Optional<EmKey> query = repository.findByOwner(owner);

        if (query.isPresent()) {
            return KeyResponse.<String>builder()
                    .code(0)
                    .data(keyType == KeyType.PRIVATE ? query.get().getPrikey() : query.get().getPubkey())
                    .build();
        } else {
            return KeyResponse.<String>builder()
                    .data("NOT_FOUND")
                    .code(404)
                    .build();
        }
    }
}
