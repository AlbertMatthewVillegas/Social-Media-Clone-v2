package com.zerofuku.socialmediaclone.services;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {
    @Value("${jwt.secret.key}")
    public String SECRET_KEY;

    @Value("${jwt.secret.expiration}")
    private Long JWT_EXPIRATION_MS;

    public String generateToken(String subject){
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims,subject);
    }

    public String getSubject(String token){
        return getClaims(token,Claims::getSubject);
    }

    public Date getExpiration(String token){
        return getClaims(token, Claims::getExpiration);
    }

    public <T> T getClaims(String token, Function<Claims, T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private String createToken(Map<String,Object> claims, String subject){
        Date expiration = new Date(System.currentTimeMillis() + JWT_EXPIRATION_MS);
        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date())
                .expiration(expiration)
                .signWith(getSignKey())
                .compact();
    }

    private Key getSignKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims getAllClaims(String token){
        return Jwts.parser()
                .verifyWith((SecretKey) getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Boolean isTokenExpired(String token){
        return getExpiration(token).before(new Date());
    }
}