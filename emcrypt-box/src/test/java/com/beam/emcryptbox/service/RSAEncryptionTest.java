package com.beam.emcryptbox.service;

import com.beam.emcryptcore.model.box.crypto.EmKey;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;

import static javax.crypto.Cipher.DECRYPT_MODE;
import static javax.crypto.Cipher.ENCRYPT_MODE;

@SpringBootTest
public class RSAEncryptionTest {

    @Autowired
    private EmKeyService service;

    @Test
    public void test() throws NoSuchAlgorithmException, UnsupportedEncodingException, NoSuchPaddingException,
            IllegalBlockSizeException, InvalidKeySpecException, BadPaddingException, InvalidKeyException {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);

        KeyPair pair = generator.generateKeyPair();

        EmKey emKey = EmKey.builder()
                .pubkey(Base64.getEncoder().encodeToString(pair.getPublic().getEncoded()))
                .prikey(Base64.getEncoder().encodeToString(pair.getPrivate().getEncoded()))
                .build();

        String input = "password";

        byte[] encrypted = service.cryptOp(ENCRYPT_MODE, emKey.getPubkey(), input.getBytes("UTF-8"));

        System.out.println("Encrypted String: " + new String(encrypted, "UTF-8"));
        System.out.println("Encrypted Base64: " + Base64.getEncoder().encodeToString(encrypted));

        byte[] decrypted = service.cryptOp(DECRYPT_MODE, emKey.getPrikey(), encrypted);

        System.out.println("Decrypted String: " + new String(decrypted, "UTF-8"));
        System.out.println("Decrypted Base64: " + Base64.getEncoder().encodeToString(decrypted));
    }
}
