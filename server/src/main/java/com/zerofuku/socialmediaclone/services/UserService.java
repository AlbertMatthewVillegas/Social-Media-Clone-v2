package com.zerofuku.socialmediaclone.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zerofuku.socialmediaclone.dto.FollowRequest;
import com.zerofuku.socialmediaclone.dto.UserRequest;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.EntityNotFoundException;
import com.zerofuku.socialmediaclone.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;

    public UserService(UserRepository repository){
        this.repository = repository;
    }

    public UserEntity findByUserId(UUID userId) throws EntityNotFoundException {
        return repository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User not found for userId: " + userId));
    }

    public UserEntity findByAuthId(UUID authId) throws IllegalArgumentException, EntityNotFoundException {
        return repository.findByAuthId(authId).orElseThrow(() -> new EntityNotFoundException("User not found for authId: " + authId));
    }

    public UserEntity findByUsername(String username){
            return repository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("User not found with username: " + username));
    }

    public List<UserEntity> findAllByUsername(String username){
        return repository.findAllByUsernameContainingIgnoreCase(username);
    }

    @Transactional
    public UserEntity updateUser(UUID authId, UserRequest newUser){
        UserEntity oldUser = findByAuthId(authId);
        oldUser.setBio(newUser.getBio());
        oldUser.setFullname(newUser.getFullname());
        oldUser.setUsername(newUser.getUsername());
        oldUser.setProfilePicture(newUser.getProfilePicture());
        return repository.save(oldUser);
    }

    @Transactional
    public UserEntity addFollower(FollowRequest request) throws EntityNotFoundException {
        UserEntity user = findByUserId(request.getUserId());
        UserEntity follower = findByUserId(request.getTargetUserId());
        
        if (!user.getFollowers().contains(follower)) {
            follower.addFollowing(user);
            repository.save(follower);
            user.addFollower(follower);
            return repository.save(user);
        }
        return user;
    }

    @Transactional
    public UserEntity removeFollower(UUID userId, UUID targetUserId) throws EntityNotFoundException {
        UserEntity follower = findByUserId(userId);
        UserEntity user = findByUserId(targetUserId);
        
        follower.removeFollowing(user);
        repository.save(follower);
        user.removeFollower(follower);
        return repository.save(user);
    }

    public List<UserEntity> getFollowers(UUID userId) throws EntityNotFoundException {
        findByUserId(userId); // Verify user exists
        return repository.findFollowersByUserId(userId);
    }

    public long getFollowerCount(UUID userId) throws EntityNotFoundException {
        findByUserId(userId); // Verify user exists
        return repository.countFollowersByUserId(userId);
    }

    public boolean isFollowedBy(UUID userId, UUID followerId) throws EntityNotFoundException {
        findByUserId(userId); // Verify both users exist
        findByUserId(followerId);
        return repository.isFollowedBy(userId, followerId);
    }

    @Transactional
    public UserEntity addFollowing(UUID userId, UUID targetUserId) throws EntityNotFoundException {
        UserEntity user = findByUserId(userId);
        UserEntity targetUser = findByUserId(targetUserId);
        
        user.addFollowing(targetUser);
        targetUser.addFollower(user);
        repository.save(user);
        repository.save(targetUser);
        return user;
    }

    @Transactional
    public UserEntity removeFollowing(UUID userId, UUID targetUserId) throws EntityNotFoundException {
        UserEntity user = findByUserId(userId);
        UserEntity targetUser = findByUserId(targetUserId);
        
        user.removeFollowing(targetUser);
        targetUser.removeFollower(user);
        repository.save(user);
        repository.save(targetUser);
        return user;
    }

}
