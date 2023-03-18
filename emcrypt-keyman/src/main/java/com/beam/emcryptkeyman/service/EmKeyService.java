package com.beam.emcryptkeyman.service;

import com.beam.emcryptcore.base.BaseService;
import com.beam.emcryptcore.dto.GenericResponse;
import com.beam.emcryptcore.dto.keyman.DecryptRequest;
import com.beam.emcryptcore.dto.keyman.EncryptResponse;
import com.beam.emcryptcore.dto.keyman.KeyRequest;
import com.beam.emcryptcore.dto.keyman.KeyResponse;
import com.beam.emcryptcore.model.common.Language;
import com.beam.emcryptcore.model.keyman.crypto.EmKey;
import com.beam.emcryptcore.model.keyman.crypto.KeyType;
import com.beam.emcryptcore.model.keyman.mail.Content;
import com.beam.emcryptcore.model.keyman.mail.Type;
import com.beam.emcryptkeyman.repository.ContentRepository;
import com.beam.emcryptkeyman.repository.EmKeyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import static javax.crypto.Cipher.DECRYPT_MODE;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmKeyService extends BaseService<EmKeyRepository, EmKey> {

    private final ContentRepository contentRepository;
    private final EmailService emailService;

    /**
     * This method takes too much time should be async
     * If a key exists for an owner dont just overwrite it
     */
    public KeyResponse create(KeyRequest keyRequest) {

        Optional<EmKey> query = repository.findByOwner(keyRequest.getOwner());

        if (query.isPresent()) {
            return KeyResponse.builder()
                    .code(99)
                    .message("Owner has already a key")
                    .build();
        } else {
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

    private KeyResponse<String> findByOwner(String owner, KeyType keyType) {
        Optional<EmKey> query = repository.findByOwner(owner);
        if (query.isPresent()) {
            return KeyResponse.<String>builder()
                    .code(0)
                    .data(keyType == KeyType.PRIVATE ? query.get().getPrikey() : query.get().getPubkey())
                    .build();
        } else {
            return KeyResponse.<String>builder()
                    .data("Key not found")
                    .code(404)
                    .build();
        }
    }

    public EncryptResponse readEncryptionMaterial(String owner) {
        KeyResponse<String> key = findByOwner(owner, KeyType.PUBLIC);
        Optional<Content> content = contentRepository.findByType(Type.REGULAR);

        if(key.getCode() == 0 && content.isPresent()){
            return EncryptResponse.builder()
                    .code(0)
                    .html(content.get().getHtml().get(Language.TR))
                    .publicKey(key.getData())
                    .build();
        }else{
            return EncryptResponse.builder()
                    .code(404)
                    .build();
        }
    }

    public KeyResponse<String> decryptKey(DecryptRequest request) {

        // get email options, and subject information by messageId and user
        GenericResponse should = emailService.shouldDecrypt(request.getTenant(), request.getMessageId(), request.getAddress());

        if(should.getCode() == 0) {
            KeyResponse<String> response = findByOwner(request.getTenant(), KeyType.PRIVATE);

            if (response.getCode() == 0) {
                String privateKey = response.getData();

                try {
                    KeyFactory kf = KeyFactory.getInstance("RSA");
                    Cipher cipher = Cipher.getInstance("RSA");

                    PKCS8EncodedKeySpec ks = new PKCS8EncodedKeySpec(Base64.getDecoder().decode(privateKey));

                    cipher.init(DECRYPT_MODE, kf.generatePrivate(ks));

                    byte[] decrypted = cipher.doFinal(Base64.getDecoder().decode(request.getKey()));
                    return KeyResponse.<String>builder()
                            .code(0)
                            .data(new String(decrypted))
                            .build();
                } catch (NoSuchPaddingException | NoSuchAlgorithmException | InvalidKeySpecException |
                         InvalidKeyException |
                         IllegalBlockSizeException | BadPaddingException exc) {
                    return KeyResponse.<String>builder()
                            .code(100)
                            .data(exc.getMessage())
                            .build();
                }
            } else {
                return response;
            }
        }else{
            return KeyResponse.<String>builder()
                    .code(should.getCode())
                    .message(should.getMessage())
                    .build();
        }
    }


}
