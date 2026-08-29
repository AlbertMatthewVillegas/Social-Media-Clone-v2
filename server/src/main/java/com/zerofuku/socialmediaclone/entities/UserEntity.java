package com.zerofuku.socialmediaclone.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class UserEntity {

    private UUID authId; // reference to auth microservice

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "user_id")
    private UUID userId;

    @Column(nullable = false, unique = true)
    private String username;
    private String fullname;
    private String profilePicture;
    private String bio;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToMany
    @JsonIgnoreProperties({"followers", "following", "hibernateLazyInitializer", "handler"})
    private List<UserEntity> followers = new ArrayList<>();

    @ManyToMany
    @JsonIgnoreProperties({"followers", "following", "hibernateLazyInitializer", "handler"})
    private List<UserEntity> following = new ArrayList<>();

    public UserEntity(UUID authId, String username, String fullname, String profilePicture, String bio) {
        this.authId = authId;
        this.username = username;
        this.fullname = fullname;
        this.profilePicture = profilePicture;
        this.bio = bio;
    }

    public void addFollower(UserEntity follower) {
        if (follower != null && !followers.contains(follower)) {
            followers.add(follower);
        }
    }

    public void removeFollower(UserEntity follower) {
        if (follower != null) {
            followers.remove(follower);
        }
    }

    public void addFollowing(UserEntity user) {
        if (user != null && !following.contains(user)) {
            following.add(user);
        }
    }

    public void removeFollowing(UserEntity user) {
        if (user != null) {
            following.remove(user);
        }
    }
}
