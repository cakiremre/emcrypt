package com.beam.emcryptcore.service;

import com.beam.emcryptcore.model.auth.Account;
import com.beam.emcryptcore.model.auth.Reader;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class JwtService {

    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    public static final String CLAIM_TENANT_KEY = "tnt";
    public static final String CLAIM_ROLE_KEY = "rls";
    public static final String CLAIM_MESSAGE_KEY = "msg";

    public static final String CLAIM_USER_TYPE = "ust";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public String extractUsertype(String token){
        final Claims claims = extractAllClaims(token);
        return claims.get(CLAIM_USER_TYPE).toString();
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public void validateToken(String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }


    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    public String generateToken(Account account) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_ROLE_KEY, account.getAuthorities());
        claims.put(CLAIM_TENANT_KEY, account.getTenant());
        claims.put(CLAIM_USER_TYPE, "account");
        return createToken(claims, account.getUsername());
    }

    public String generateToken(Reader reader) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(CLAIM_USER_TYPE, "reader");
        return createToken(claims, reader.getAddress());
    }

    private String createToken(Map<String, Object> claims, String userName) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 30))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
