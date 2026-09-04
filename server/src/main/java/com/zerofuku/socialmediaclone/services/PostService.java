package com.zerofuku.socialmediaclone.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zerofuku.socialmediaclone.dto.PostRequest;
import com.zerofuku.socialmediaclone.entities.CommentEntity;
import com.zerofuku.socialmediaclone.entities.PostEntity;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.EntityNotFoundException;
import com.zerofuku.socialmediaclone.exceptions.InvalidRequestException;
import com.zerofuku.socialmediaclone.repositories.PostRepository;
import com.zerofuku.socialmediaclone.utils.SecurityUtils;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Service
public class PostService {

    private final PostRepository repository;
    private final UserService userService;

    public PostService(PostRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    @Transactional
    public PostEntity createPost(PostRequest request) {

        if (request.getTitle().isEmpty() || request.getTitle() == null) {
            log.error("Title cannot be null or empty");
            throw new InvalidRequestException("Title cannot be null or empty");
        }

        if (request.getContent().isEmpty() || request.getContent() == null) {
            log.error("Content cannot be null or empty");
            throw new InvalidRequestException("Content cannot be null or empty");
        }

        if (request.getDescription() == null || request.getDescription().isEmpty()) {
            log.error("Description cannot be null or empty");
            throw new InvalidRequestException("Description cannot be null or empty");
        }

        UserEntity currentUser = SecurityUtils.getCurrentUser();

        PostEntity newPost = new PostEntity(
                request.getContent(),
                request.getTitle(),
                request.getDescription(),
                currentUser);

        PostEntity saved = repository.save(newPost);
        log.info("Post created, postId: {}, userId: {}", saved.getPostId(), currentUser.getUserId());
        return saved;
    }

    public List<PostEntity> getAllPosts() {
        List<PostEntity> posts = repository.findAll();
        log.info("Retrieved {} posts", posts.size());
        return posts;
    }

    public List<PostEntity> getAllPosts(UUID userId) {
        UserEntity user = userService.findByUserId(userId);
        List<PostEntity> posts = repository.findByUser(user);
        log.info("Retrieved {} posts for userId: {}", posts.size(), userId);
        return posts;
    }

    @Transactional
    public PostEntity updatePost(UUID postId, PostRequest newPost) {
        if (newPost.getTitle().isEmpty() || newPost.getTitle() == null) {
            log.error("Title cannot be null or empty");
            throw new InvalidRequestException("Title cannot be null or empty");
        }

        if (newPost.getContent().isEmpty() || newPost.getContent() == null) {
            log.error("Content cannot be null or empty");
            throw new InvalidRequestException("Content cannot be null or empty");
        }

        if (newPost.getDescription() == null || newPost.getDescription().isEmpty()) {
            log.error("Description cannot be null or empty");
            throw new InvalidRequestException("Description cannot be null or empty");
        }

        UserEntity currentUser = SecurityUtils.getCurrentUser();

        PostEntity oldPost = repository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found with ID: {}", postId);
                    return new EntityNotFoundException("Post not found with ID: " + postId);
                });

        SecurityUtils.validateOwnership(oldPost.getUser().getAuthId(), currentUser.getAuthId());

        oldPost.setTitle(newPost.getTitle());
        oldPost.setContent(newPost.getContent());
        oldPost.setDescription(newPost.getDescription());

        PostEntity updated = repository.save(oldPost);
        log.info("Post updated, postId: {}, userId: {}", updated.getPostId(), currentUser.getUserId());
        return updated;
    }

    @Transactional
    public void deletePost(UUID postId) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        PostEntity post = repository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found with ID: {}", postId);
                    return new EntityNotFoundException("Post not found with ID: " + postId);
                });

        SecurityUtils.validateOwnership(post.getUser().getAuthId(), currentUser.getAuthId());

        repository.delete(post);
        log.info("Post deleted, postId: {}, userId: {}", postId, currentUser.getUserId());
    }

    @Transactional
    public PostEntity likePost(UUID postId) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        PostEntity post = repository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found with ID: {}", postId);
                    return new EntityNotFoundException("Post not found with ID: " + postId);
                });

        post.addLike(currentUser);
        PostEntity saved = repository.save(post);

        log.info("Post liked, postId: {}, userId: {}", postId, currentUser.getUserId());
        return saved;
    }

    @Transactional
    public PostEntity unlikePost(UUID postId) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        PostEntity post = repository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found with ID: {}", postId);
                    return new EntityNotFoundException("Post not found with ID: " + postId);
                });

        post.removeLike(currentUser);
        PostEntity saved = repository.save(post);

        log.info("Post unliked, postId: {}, userId: {}", postId, currentUser.getUserId());
        return saved;
    }

    @Transactional
    public CommentEntity addComment(UUID postId, String commentContent) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        PostEntity post = repository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found with ID: {}", postId);
                    return new EntityNotFoundException("Post not found with ID: " + postId);
                });

        CommentEntity comment = new CommentEntity(post, currentUser, commentContent);
        post.addComment(comment);

        CommentEntity savedComment = repository.save(post).getComments().get(post.getComments().size() - 1); // Get the last added comment
        log.info("Comment added to post, postId: {}, userId: {}", postId, currentUser.getUserId());
        return savedComment;
    }

    @Transactional
    public CommentEntity removeComment(UUID postId, UUID commentId) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        PostEntity post = repository.findById(postId)
                .orElseThrow(() -> {
                    log.error("Post not found with ID: {}", postId);
                    return new EntityNotFoundException("Post not found with ID: " + postId);
                });

        CommentEntity comment = post.getComments().stream()
                .filter(c -> c.getCommentId().equals(commentId))
                .findFirst()
                .orElseThrow(() -> {
                    log.error("Comment not found with ID: {}", commentId);
                    return new EntityNotFoundException("Comment not found with ID: " + commentId);
                });

        SecurityUtils.validateOwnership(comment.getUser().getAuthId(), currentUser.getAuthId());

        post.removeComment(comment);
        PostEntity saved = repository.save(post);
        CommentEntity removedComment = saved.getComments().stream()
                .filter(c -> c.getCommentId().equals(commentId))
                .findFirst()
                .orElse(null);

        log.info("Comment removed from post, postId: {}, commentId: {}, userId: {}", postId, commentId, currentUser.getUserId());
        return removedComment;
    }



}
