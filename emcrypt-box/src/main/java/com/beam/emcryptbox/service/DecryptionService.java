package com.beam.emcryptbox.service;


import org.springframework.stereotype.Service;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HexFormat;

@Service
public class DecryptionService {


    public byte[] decryptMessage(String data, String aesKeyAndIV) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        byte[] blob = Base64.getDecoder().decode(data);
        return decryptMessage(blob, aesKeyAndIV);
    }

    public byte[] decryptMessage(byte[] data, String aesKeyAndIV) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        if(aesKeyAndIV.contains(":::")) {

            String key = aesKeyAndIV.split(":::")[0];
            String iv = aesKeyAndIV.split(":::")[1];

            SecretKeySpec secretKeySpec = new SecretKeySpec(HexFormat.of().parseHex(key), "AES");
            IvParameterSpec ivParameterSpec = new IvParameterSpec(HexFormat.of().parseHex(iv));

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            cipher.init(Cipher.DECRYPT_MODE, secretKeySpec, ivParameterSpec);
            byte[] plainText = cipher.doFinal(data);

            return plainText;
        }else{
            throw new RuntimeException("Invalid AES key and IV.");
        }
    }
}
