package com.zerofuku.socialmediaclone.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.zerofuku.socialmediaclone.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByAuthId(UUID authId);
    Optional<UserEntity> findByUsername(String username);
    List<UserEntity> findAllByUsernameContainingIgnoreCase(String username);
    
    @Query("SELECT f FROM UserEntity u JOIN u.followers f WHERE u.userId = :userId")
    List<UserEntity> findFollowersByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT COUNT(f) FROM UserEntity u JOIN u.followers f WHERE u.userId = :userId")
    long countFollowersByUserId(@Param("userId") UUID userId);
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM UserEntity u JOIN u.followers f WHERE u.userId = :userId AND f.userId = :followerId")
    boolean isFollowedBy(@Param("userId") UUID userId, @Param("followerId") UUID followerId);
}
