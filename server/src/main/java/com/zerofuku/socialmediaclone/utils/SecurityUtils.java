package com.zerofuku.socialmediaclone.utils;

import com.zerofuku.socialmediaclone.entities.UserEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {
    public static UserEntity getCurrentUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Object principal = securityContext.getAuthentication().getPrincipal();

        if (principal instanceof UserEntity) {
            return (UserEntity) principal;
        }

        return null;
    }
    
}
