package com.zerofuku.socialmediaclone.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zerofuku.socialmediaclone.dto.CommentRequest;
import com.zerofuku.socialmediaclone.dto.Response;
import com.zerofuku.socialmediaclone.entities.CommentEntity;
import com.zerofuku.socialmediaclone.services.CommentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService service;

    public CommentController(CommentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Response<CommentEntity>> createComment(
        @RequestBody CommentRequest request
    ) {
        CommentEntity comment = service.createComment(request);
        Response<CommentEntity> response = new Response<>(
            "successfully created comment!",
            comment
        );
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Response<CommentEntity>> updateComment(
        @PathVariable UUID commentId,
        @RequestBody CommentRequest newComment
    ) {
        CommentEntity comment = service.updateComment(commentId, newComment);
        Response<CommentEntity> response = new Response<>(
            "successfully uppdated comment: " + commentId,
            comment
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(
        @PathVariable UUID commentId
    ) {
        service.deleteComment(commentId);
        return ResponseEntity.ok("successfully delete comment: " + commentId);
    }

    @PostMapping("/{commentId}/like")
    public ResponseEntity<Response<CommentEntity>> likeComment(
        @PathVariable UUID commentId
    ) {
        CommentEntity comment = service.likeComment(commentId);
        Response<CommentEntity> response = new Response<>(
            "successfully liked comment",
            comment
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{commentId}/like")
    public ResponseEntity<Response<CommentEntity>> unlikeComment(
        @PathVariable UUID commentId
    ) {
        CommentEntity comment = service.unlikeComment(commentId);
        Response<CommentEntity> response = new Response<>(
            "successfully unliked comment",
            comment
        );
        return ResponseEntity.ok(response);
    }
}
