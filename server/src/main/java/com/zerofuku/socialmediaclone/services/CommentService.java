package com.zerofuku.socialmediaclone.services;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.zerofuku.socialmediaclone.dto.CommentRequest;
import com.zerofuku.socialmediaclone.entities.CommentEntity;
import com.zerofuku.socialmediaclone.entities.PostEntity;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.EntityNotFoundException;
import com.zerofuku.socialmediaclone.exceptions.InvalidRequestException;
import com.zerofuku.socialmediaclone.repositories.CommentRepository;
import com.zerofuku.socialmediaclone.repositories.PostRepository;
import com.zerofuku.socialmediaclone.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public CommentEntity createComment(CommentRequest request, UUID authId){
        UserEntity user = userRepository.findById(request.getUserId())
            .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + request.getUserId()));

        if(!authId.equals(user.getAuthId())) throw new InvalidRequestException();

        PostEntity post = postRepository.findById(request.getPostId())
            .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + request.getPostId()));
        
        CommentEntity comment = new CommentEntity(post, user, request.getText());
        
        return commentRepository.save(comment);
    }

    @Transactional
    public CommentEntity updateComment(UUID commentId, CommentRequest newComment, UUID authId){
        CommentEntity comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new EntityNotFoundException("Comment not found with ID: " + commentId));

        if(!comment.getUser().getAuthId().equals(authId)) throw new InvalidRequestException();
    
        comment.setText(newComment.getText());
        return commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(UUID commentId,UUID authId){
        CommentEntity comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new EntityNotFoundException("Comment not found with ID: " + commentId));

        if(!comment.getUser().getAuthId().equals(authId)) throw new InvalidRequestException();
        
        commentRepository.delete(comment);
    }

    @Transactional
    public CommentEntity likeComment(UUID commentId, UUID userId) throws EntityNotFoundException {
        CommentEntity comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new EntityNotFoundException("Comment not found with ID: " + commentId));
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        
        comment.addLike(user);
        return commentRepository.save(comment);
    }

    @Transactional
    public CommentEntity unlikeComment(UUID commentId, UUID userId) throws EntityNotFoundException {
        CommentEntity comment = commentRepository.findById(commentId)
            .orElseThrow(() -> new EntityNotFoundException("Comment not found with ID: " + commentId));
        UserEntity user = userRepository.findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        
        comment.removeLike(user);
        return commentRepository.save(comment);
    }
}