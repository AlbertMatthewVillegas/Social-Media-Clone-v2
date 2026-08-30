package com.zerofuku.socialmediaclone.utils;

import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.InvalidRequestException;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public class SecurityUtils {
    public static UserEntity getCurrentUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Object principal = securityContext.getAuthentication().getPrincipal();
        
        if (principal instanceof UserEntity) {
            return (UserEntity) principal;
        }

        return null;
    }

    public static final List<String> EXCLUDED_PATHS = List.of(
            "/api/auth/login",
            "/api/auth/register",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/v3/api-docs.yaml"
    );

    public static void validateOwnership(UUID resourceUserId, UUID currentUserId) {
        if (!resourceUserId.equals(currentUserId)) {
            log.error("User {} attempted to modify a resource owned by {}", currentUserId, resourceUserId);
            throw new InvalidRequestException();
        }
    }
    
}
