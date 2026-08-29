package com.zerofuku.socialmediaclone.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.zerofuku.socialmediaclone.dto.LoginRequest;
import com.zerofuku.socialmediaclone.dto.RegisterRequest;
import com.zerofuku.socialmediaclone.entities.AuthEntity;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.AccountAlreadyExistsException;
import com.zerofuku.socialmediaclone.exceptions.NoSuchAccountExistsException;
import com.zerofuku.socialmediaclone.repositories.AuthRepository;
import com.zerofuku.socialmediaclone.repositories.UserRepository;

@Service
public class AuthService {

    private final AuthRepository authRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthService(
        AuthRepository authRepository,
        UserRepository userRepository,   
        PasswordEncoder passwordEncoder
    ) {
        this.authRepository = authRepository;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public AuthEntity login(LoginRequest request) throws IllegalArgumentException, NoSuchAccountExistsException {
        AuthEntity existingUser = authRepository.findByEmail(request.getEmail());
        if (existingUser == null) {
            throw new NoSuchAccountExistsException();
        }

        boolean isValid = passwordEncoder.matches(request.getPassword(), existingUser.getPassword());
        if (!isValid) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return existingUser;
    }

    public AuthEntity register(RegisterRequest request) throws IllegalArgumentException, AccountAlreadyExistsException {
        AuthEntity existingUser = authRepository.findByEmail(request.getEmail());
        if (existingUser != null) throw new AccountAlreadyExistsException();
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        AuthEntity newUser = new AuthEntity(
            request.getEmail(),
            hashedPassword
        );
        
        AuthEntity savedUser = authRepository.save(newUser);
        UserEntity newUserEntity = new UserEntity(
            savedUser.getAuthId(),
            request.getUsername(),
            request.getFullname(),
            "",
            ""  
        );
        userRepository.save(newUserEntity);
        return savedUser;
    }

}
