package com.zerofuku.socialmediaclone.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zerofuku.socialmediaclone.entities.AuthEntity;


public interface AuthRepository extends JpaRepository<AuthEntity,UUID> {
    public AuthEntity findByAuthId(UUID authId) throws IllegalArgumentException;
    public AuthEntity findByEmail(String email) throws IllegalArgumentException;
}
