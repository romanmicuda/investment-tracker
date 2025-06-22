// Utility class for generating and validating JWT tokens
package com.personal.finance.tracker.demo.appUser.security;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;
import java.util.Date;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    // Generate a secure random secret key with: ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
    // Or for a simple string: openssl rand -base64 64
    @Value("${jwt.secret}")
    private String jwtSecret;
    private final long jwtExpirationMs = 86400000; // 1 day

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}