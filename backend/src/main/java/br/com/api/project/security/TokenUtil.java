package br.com.api.project.security;


import java.security.Key;
import java.util.Collections;
import java.util.Date;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import br.com.api.project.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

public class TokenUtil {
	private static final String HEADER = "Authorization";
	private static final String PREFIX = "Bearer ";
	private static final long EXPIRATION = 60*60*1000;
	private static final String SECRET_KEY = "fT5gU1Gv2Qr3Lm4Hz5Jx6Pc7Wb8Re9Ta0";
	private static final String EMISSOR = "apiusers";
	
	public static String createToken(User user) {
		Key secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
		
		String token = Jwts.builder()
						.setSubject(user.getEmail())
						.setIssuer(EMISSOR)
						.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
						.signWith(secretKey, SignatureAlgorithm.HS256).compact();
				
		return PREFIX + token;
	}
	
	public static boolean isExpirationValid(Date expiration) {
		return expiration.after(new Date(System.currentTimeMillis()));
	}
	
	public static boolean isEmissorValid(String emissor) {
		return emissor.equals(emissor);
	}
	
	public static boolean isSubjectValid(String email) {
		return email != null && email.length() > 0;
	}
	
	public static Authentication validate(HttpServletRequest request) {
		String token = request.getHeader(HEADER);
		
		token = token.replace(PREFIX,"");
		
		Jws<Claims> jwsClaims = Jwts.parserBuilder().setSigningKey(SECRET_KEY.getBytes())
													.build()
													.parseClaimsJws(token);
		
		String email = jwsClaims.getBody().getSubject();
		String issuer = jwsClaims.getBody().getIssuer();
		Date expiration = jwsClaims.getBody().getExpiration();
		
		if(isSubjectValid(email) && isEmissorValid(issuer) && isExpirationValid(expiration)) {
			return new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
		}
		
		return null;
	}
	
}
