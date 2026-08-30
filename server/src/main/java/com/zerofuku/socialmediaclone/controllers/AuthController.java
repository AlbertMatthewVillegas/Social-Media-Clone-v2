package com.zerofuku.socialmediaclone.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zerofuku.socialmediaclone.dto.LoginRequest;
import com.zerofuku.socialmediaclone.dto.RegisterRequest;
import com.zerofuku.socialmediaclone.entities.AuthEntity;
import com.zerofuku.socialmediaclone.exceptions.AccountAlreadyExistsException;
import com.zerofuku.socialmediaclone.exceptions.FailedAccountCreationException;
import com.zerofuku.socialmediaclone.services.AuthService;
import com.zerofuku.socialmediaclone.utils.JwtUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JwtUtils jwtUtils;

    @Value("${jwt.secret.expiration}")
    private Long JWT_EXPIRATION_MS;

    public AuthController(
        JwtUtils jwtUtils,
        AuthService authService
    ){
        this.authService = authService;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<String>login(
        @RequestBody LoginRequest request,
        HttpServletResponse response
    ) {
        AuthEntity auth = authService.login(request);
        String claims = auth.getAuthId().toString() + ":" + auth.getRole().toString();
        String token = jwtUtils.generateToken(claims);

        Cookie cookie = new Cookie("auth_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); 
        cookie.setPath("/");
        cookie.setMaxAge((int) (JWT_EXPIRATION_MS / 1000));
        cookie.setAttribute("SameSite", "Strict");
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged in Successfully!");
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
        @RequestBody RegisterRequest request,
        HttpServletResponse response
    ) {
        AuthEntity auth = authService.register(request);
        String claims = auth.getAuthId().toString() + ":" + auth.getRole().toString();
        String token = jwtUtils.generateToken(claims);

        Cookie cookie = new Cookie("auth_token", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) (JWT_EXPIRATION_MS / 1000));
        cookie.setAttribute("SameSite", "Strict");
        response.addCookie(cookie);

        return ResponseEntity.ok("Registered successfully!");
    }

    @ExceptionHandler(AccountAlreadyExistsException.class)
    public ResponseEntity<String> handleAccountAlreadyExistsException(AccountAlreadyExistsException exception){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
    }

    @ExceptionHandler(FailedAccountCreationException.class)
    public ResponseEntity<String> handleFailedAccountCreationException(FailedAccountCreationException exception){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(exception.getMessage());
    }
}
