package com.beam.emcryptcore.util;

import org.apache.commons.codec.binary.Base64;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

public class RandomStringGenerator {

    private static char[] _base62chars =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                    .toCharArray();
    private static char[] _numbersAndLetters =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    .toCharArray();

    private static Random _random = new Random(System.currentTimeMillis());

    public static String generateRandomString() {
        byte randomBytes[] = new byte[32];
        SecureRandom sr = null;
        try {
            // generate cryptographically secure random number
            sr = SecureRandom.getInstance("SHA1PRNG");
            sr.nextBytes(randomBytes);
        } catch (NoSuchAlgorithmException ex) {
            Random r = new Random(System.currentTimeMillis());
            r.nextBytes(randomBytes);
        }

        byte[] resultBytes;
        try {
            MessageDigest digester = MessageDigest.getInstance("SHA-256");
            resultBytes = digester.digest(randomBytes);
        } catch (NoSuchAlgorithmException e) {
            resultBytes = randomBytes;
        }

        return Base64.encodeBase64URLSafeString(resultBytes);
    }

    public static String getBase64EncodedRecipientIdentifier(String hook, String campaign) {
        return Base64.encodeBase64URLSafeString((hook + "_" + campaign).getBytes());
    }

    public static String getIdsFromBase64EncodedString(String input) {
        return new String(Base64.decodeBase64(input));
    }

    public static String getBase62(int length) {
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++)
            sb.append(_base62chars[_random.nextInt(62)]);

        return sb.toString();
    }

    public static String getBase36(int length) {
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++)
            sb.append(_base62chars[_random.nextInt(36)]);

        return sb.toString();
    }

    public static String getRandomCode(int length){
        String code = "";
        SecureRandom sr = null;
        for(int i =0 ; i < length; i ++) {
            int index;
            try {
                // generate cryptographically secure random number
                sr = SecureRandom.getInstance("SHA1PRNG");
                index = sr.nextInt(_numbersAndLetters.length);
            } catch (NoSuchAlgorithmException ex) {
                Random r = new Random(System.currentTimeMillis());
                index = r.nextInt(_numbersAndLetters.length);
            }

            code += _numbersAndLetters[index];
        }
        return code;
    }


}