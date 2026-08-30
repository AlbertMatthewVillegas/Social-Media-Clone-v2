package com.zerofuku.socialmediaclone.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.zerofuku.socialmediaclone.dto.CommentRequest;
import com.zerofuku.socialmediaclone.entities.CommentEntity;
import com.zerofuku.socialmediaclone.entities.PostEntity;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.EntityNotFoundException;
import com.zerofuku.socialmediaclone.repositories.CommentRepository;
import com.zerofuku.socialmediaclone.repositories.PostRepository;
import com.zerofuku.socialmediaclone.repositories.UserRepository;
import com.zerofuku.socialmediaclone.utils.SecurityUtils;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentService(
            CommentRepository commentRepository,
            PostRepository postRepository,
            UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @Transactional
    public CommentEntity createComment(CommentRequest request) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        SecurityUtils.validateOwnership(request.getUserId(), currentUser.getUserId());

        PostEntity post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> {
                    log.error("Post not found with ID: {}", request.getPostId());
                    return new EntityNotFoundException("Post not found with ID: " + request.getPostId());
                });

        CommentEntity comment = new CommentEntity(post, currentUser, request.getText());
        CommentEntity saved = commentRepository.save(comment);

        log.info("Comment created, commentId: {}, postId: {}, userId: {}",
                saved.getCommentId(), post.getPostId(), currentUser.getUserId());
        return saved;
    }

    @Transactional
    public CommentEntity updateComment(UUID commentId, CommentRequest newComment) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> {
                    log.error("Comment not found with ID: {}", commentId);
                    return new EntityNotFoundException("Comment not found with ID: " + commentId);
                });

        SecurityUtils.validateOwnership(comment.getUser().getUserId(), currentUser.getUserId());

        comment.setText(newComment.getText());
        CommentEntity updated = commentRepository.save(comment);

        log.info("Comment updated, commentId: {}, userId: {}", updated.getCommentId(), currentUser.getUserId());
        return updated;
    }

    @Transactional
    public void deleteComment(UUID commentId) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> {
                    log.error("Comment not found with ID: {}", commentId);
                    return new EntityNotFoundException("Comment not found with ID: " + commentId);
                });

        SecurityUtils.validateOwnership(comment.getUser().getUserId(), currentUser.getUserId());

        commentRepository.delete(comment);
        log.info("Comment deleted, commentId: {}, userId: {}", commentId, currentUser.getUserId());
    }

    @Transactional
    public CommentEntity likeComment(UUID commentId) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> {
                    log.error("Comment not found with ID: {}", commentId);
                    return new EntityNotFoundException("Comment not found with ID: " + commentId);
                });

        comment.addLike(currentUser);
        CommentEntity saved = commentRepository.save(comment);

        log.info("Comment liked, commentId: {}, userId: {}", commentId, currentUser.getUserId());
        return saved;
    }

    @Transactional
    public CommentEntity unlikeComment(UUID commentId) {
        UserEntity currentUser = SecurityUtils.getCurrentUser();

        CommentEntity comment = commentRepository.findById(commentId)
                .orElseThrow(() -> {
                    log.error("Comment not found with ID: {}", commentId);
                    return new EntityNotFoundException("Comment not found with ID: " + commentId);
                });

        comment.removeLike(currentUser);
        CommentEntity saved = commentRepository.save(comment);

        log.info("Comment unliked, commentId: {}, userId: {}", commentId, currentUser.getUserId());
        return saved;
    }
}