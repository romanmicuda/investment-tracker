// Utility class for generating and validating JWT tokens
package com.personal.finance.tracker.demo.appUser.security;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import java.util.Date;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    // Generate a secure random secret key with: ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
    // Or for a simple string: openssl rand -base64 32
    private final String jwtSecret = "Ec4stO1cpznwVVGoFwh1jqAtJy1tKNpIDP6BKeg/VNo=";
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