package com.zerofuku.socialmediaclone.filter;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.zerofuku.socialmediaclone.entities.AuthEntity;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.NoSuchAccountExistsException;
import com.zerofuku.socialmediaclone.repositories.UserRepository;
import com.zerofuku.socialmediaclone.utils.JwtUtils;
import com.zerofuku.socialmediaclone.utils.SecurityUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final HandlerExceptionResolver resolver;

    public JwtAuthFilter(
            JwtUtils jwtUtils,
            UserRepository userRepository,
            @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver) {
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.resolver = resolver;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        return SecurityUtils.EXCLUDED_PATHS.stream().anyMatch(path::startsWith);
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        try {
            Cookie[] cookies = request.getCookies();
            String token = null;

            if (cookies == null) {
                log.error("cookies are empty");
                throw new IllegalArgumentException("cookies are empty");
            }

            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("auth_token")) {
                    token = cookie.getValue();
                    log.info("Token found: {}", token);
                    break;
                }
            }

            if (token == null) {
                log.error("token not found in cookies");
                throw new IllegalArgumentException("token is empty");
            }

            String subject = jwtUtils.getSubject(token);

            if (SecurityContextHolder.getContext().getAuthentication() != null) {
                log.error("authentication is not null");
                throw new IllegalArgumentException("authentication is not null");
            }

            log.info("Processing token for user: {}", subject);

            UUID authId = UUID.fromString(subject.split(":")[0]);
            AuthEntity.Role role = AuthEntity.Role.valueOf(subject.split(":")[1]);

            UserEntity user = userRepository.findByAuthId(authId)
                    .orElseThrow(() -> new NoSuchAccountExistsException("User with authId " + authId + " not found"));

            List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role.name()));

            log.info("User {} has role {}", user.getAuthId(), role.name());

            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                    user,
                    null,
                    authorities);

            SecurityContextHolder.getContext().setAuthentication(auth);

            filterChain.doFilter(request, response);

        } catch (Exception ex) {
            log.error("JwtAuthFilter error: {}", ex.getMessage());
            resolver.resolveException(request, response, null, ex);
        }
    }
}