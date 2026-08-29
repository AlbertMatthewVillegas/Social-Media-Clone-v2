package com.zerofuku.socialmediaclone.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zerofuku.socialmediaclone.dto.ListResponse;
import com.zerofuku.socialmediaclone.dto.Response;
import com.zerofuku.socialmediaclone.dto.UserRequest;
import com.zerofuku.socialmediaclone.dto.FollowRequest;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/{username}")
    public ResponseEntity<Response<UserEntity>> getUser(@PathVariable String username) {
        UserEntity user = service.findByUsername(username);
        Response<UserEntity> response = new Response<>(
            "successfully retrieved user with username: " + username,
            user
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search/{username}")
    public ResponseEntity<ListResponse<UserEntity>> search(@PathVariable String username) {
        List<UserEntity> users = service.findAllByUsername(username);
        ListResponse<UserEntity> response = new ListResponse<>(
            "successfully retrieved users with username: " + username,
            users,
            users.size()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Response<UserEntity>> getCurrentUser(
        @AuthenticationPrincipal UUID authId
    ){
        UserEntity currentUser = service.findByAuthId(authId);
        Response<UserEntity> response = new Response<>(
            "successfully retrieved current user!",
            currentUser
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/me") 
    public ResponseEntity<Response<UserEntity>> updateCurrentUser(
        @AuthenticationPrincipal UUID authId, 
        @RequestBody UserRequest request
    ){
        UserEntity currentUser = service.updateUser(authId,request);
        Response<UserEntity> response = new Response<>(
            "successfully retrieved current user!",
            currentUser
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/followers")
    public ResponseEntity<Response<UserEntity>> addFollower(
        @RequestBody FollowRequest request
    ){
        UserEntity user = service.addFollower(request);
        Response<UserEntity> response = new Response<>(
            "successfully added follower",
            user
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}/followers/{followerId}")
    public ResponseEntity<Response<UserEntity>> removeFollower(
        @PathVariable UUID userId,
        @PathVariable UUID followerId
    ){
        UserEntity user = service.removeFollower(userId, followerId);
        Response<UserEntity> response = new Response<>(
            "successfully removed follower",
            user
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<ListResponse<UserEntity>> getFollowers(
        @PathVariable UUID userId
    ){
        List<UserEntity> followers = service.getFollowers(userId);
        ListResponse<UserEntity> response = new ListResponse<>(
            "successfully retrieved followers",
            followers,
            followers.size()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/followers/count")
    public ResponseEntity<Response<Long>> getFollowerCount(
        @PathVariable UUID userId
    ){
        long count = service.getFollowerCount(userId);
        Response<Long> response = new Response<>(
            "successfully retrieved follower count",
            count
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/followers/{followerId}/check")
    public ResponseEntity<Response<Boolean>> isFollowedBy(
        @PathVariable UUID userId,
        @PathVariable UUID followerId
    ){
        boolean isFollowed = service.isFollowedBy(userId, followerId);
        Response<Boolean> response = new Response<>(
            "successfully checked follow status",
            isFollowed
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/following")
    public ResponseEntity<Response<UserEntity>> addFollowing(
        @RequestBody FollowRequest request
    ){
        UserEntity user = service.addFollowing(request.getUserId(), request.getTargetUserId());
        Response<UserEntity> response = new Response<>(
            "successfully added following",
            user
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}/following/{targetUserId}")
    public ResponseEntity<Response<UserEntity>> removeFollowing(
        @PathVariable UUID userId,
        @PathVariable UUID targetUserId
    ){
        UserEntity user = service.removeFollowing(userId, targetUserId);
        Response<UserEntity> response = new Response<>(
            "successfully removed following",
            user
        );
        return ResponseEntity.ok(response);
    }
}
