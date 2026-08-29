package com.zerofuku.socialmediaclone.entities;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "auth")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthEntity {
    
    public enum Role {
        ADMIN,
        USER,
        GUEST,
        MODERATOR,
        SUPER_ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID authId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public AuthEntity(
        String email,
        String password
    ) {
        this.email = email;
        this.password = password;
        this.role = Role.USER;
    }

    public AuthEntity(
            String email,
            String password,
            Role role
    ) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    
}
