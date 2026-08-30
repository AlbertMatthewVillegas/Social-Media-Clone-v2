package com.zerofuku.socialmediaclone.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.zerofuku.socialmediaclone.dto.UserRequest;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.EntityNotFoundException;
import com.zerofuku.socialmediaclone.exceptions.InvalidRequestException;
import com.zerofuku.socialmediaclone.repositories.UserRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

import com.zerofuku.socialmediaclone.utils.SecurityUtils;


@Slf4j
@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public UserEntity findByUserId(UUID userId) throws EntityNotFoundException {
        return repository.findById(userId)
            .orElseThrow(() -> {
                log.error("User not found for userId: {}", userId);
                return new EntityNotFoundException("User not found for userId: " + userId);
            });
    }

    public UserEntity findByAuthId(UUID authId) throws IllegalArgumentException, EntityNotFoundException {
        return repository.findByAuthId(authId)
            .orElseThrow(() -> {
                log.error("User not found for authId: {}", authId);
                return new EntityNotFoundException("User not found for authId: " + authId);
            });
    }

    public UserEntity findByUsername(String username) {
        return repository.findByUsername(username)
            .orElseThrow(() -> {
                log.error("User not found with username: {}", username);
                return new EntityNotFoundException("User not found with username: " + username);
            });
    }

    public List<UserEntity> findAllByUsername(String username) {
        List<UserEntity> results = repository.findAllByUsernameContainingIgnoreCase(username);
        log.info("Found {} users matching username query: {}", results.size(), username);
        return results;
    }

    @Transactional
    public UserEntity updateCurrentUser(UserRequest newUser) {
        
        UserEntity oldUser = getCurrentUser();

        log.info("Updating user, userId: {}", oldUser.getUserId());

        oldUser.setBio(newUser.getBio());
        oldUser.setFullname(newUser.getFullname());
        oldUser.setUsername(newUser.getUsername());
        oldUser.setProfilePicture(newUser.getProfilePicture());

        UserEntity updated = repository.save(oldUser);
        log.info("User updated successfully, userId: {}", updated.getUserId());
        return updated;
    }

    public List<UserEntity> getFollowers(UUID userId) throws EntityNotFoundException {
        findByUserId(userId); // Verify user exists
        List<UserEntity> followers = repository.findFollowersByUserId(userId);
        log.info("Retrieved {} followers for userId: {}", followers.size(), userId);
        return followers;
    }

    @Transactional
    public UserEntity addFollower(UUID targetUserId) throws EntityNotFoundException { // ADDS YOU AS A FOLLOWER TO SOMEONE ELSE'S ACCOUNT
        UserEntity target = findByUserId(targetUserId);
        UserEntity currentUser = getCurrentUser();

        if (currentUser.follows(target)) {
            log.error("target user already follows current user, invalid request");
            throw new InvalidRequestException("target user doesn't follow current user, invalid request");
        }

        target.addFollower(currentUser);
        currentUser.addFollowing(target);

        return currentUser;
    }

    @Transactional
    public UserEntity removeFollower(UUID targetUserId) throws EntityNotFoundException, InvalidRequestException {
        UserEntity follower = findByUserId(targetUserId);
        UserEntity currentUser = getCurrentUser();
        if(!follower.follows(currentUser)){
            log.error("follower doesn't follow current user, invalid request");
            throw new InvalidRequestException("target user doesn't follow current user, invalid request");
        }
        currentUser.removeFollower(follower);
        follower.removeFollowing(currentUser);
        UserEntity saved = repository.save(currentUser);
        log.info("current User {} removed follower {}", currentUser.getUserId(), follower.getUserId());
        return saved;
    }

    @Transactional
    public UserEntity removeFollowing(UUID targetUserId) throws EntityNotFoundException, InvalidRequestException {
        UserEntity following = findByUserId(targetUserId);
        UserEntity currentUser = getCurrentUser();

        if (!currentUser.follows(following)) {
            log.error("current user doesn't follow target user, invalid request");
            throw new InvalidRequestException("target user doesn't follow current user, invalid request");
        }

        currentUser.removeFollowing(following);
        following.removeFollower(currentUser);

        log.info("User {} unfollowed {}", currentUser.getUserId(), following.getUserId());
        return currentUser;
    }

    //  UTILITY FUNCTIONS

    @Transactional
    public UserEntity getCurrentUser() {
        UserEntity principal = SecurityUtils.getCurrentUser();
        if (principal == null) {
            throw new EntityNotFoundException("No authenticated user");
        }
        return repository.findById(principal.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found for userId: " + principal.getUserId()));
    }
}