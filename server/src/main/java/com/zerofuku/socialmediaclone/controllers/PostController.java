package com.zerofuku.socialmediaclone.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zerofuku.socialmediaclone.dto.ListResponse;
import com.zerofuku.socialmediaclone.dto.PostRequest;
import com.zerofuku.socialmediaclone.dto.Response;
import com.zerofuku.socialmediaclone.dto.LikeRequest;
import com.zerofuku.socialmediaclone.entities.PostEntity;
import com.zerofuku.socialmediaclone.services.PostService;
@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    public PostController(
        PostService postService
    ) {
        this.postService = postService;
    }

    @PostMapping("/")
    public ResponseEntity<Response<PostEntity>> createPost(
        @AuthenticationPrincipal UUID authId, 
        @RequestBody PostRequest request
    ){
        PostEntity postEntity = postService.createPost(request,authId);
        Response<PostEntity> response = new Response<>(
            "successfully created new post!",
            postEntity
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<ListResponse<PostEntity>> getAllPosts() {
        List<PostEntity> allPosts = postService.getAllPosts();
        ListResponse<PostEntity> response = new ListResponse<>(
            "fetched all posts successfully",
            allPosts,
            allPosts.size()
        );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<ListResponse<PostEntity>> getAllPosts(
        @PathVariable UUID userId
    ) {
        List<PostEntity> allPosts = postService.getAllPosts(userId);
        ListResponse<PostEntity> response = new ListResponse<>(
            "fetched all posts successfully",
            allPosts,
            allPosts.size()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Response<PostEntity>> updatePost(
        @AuthenticationPrincipal UUID authId,
        @PathVariable UUID postId,
        @RequestBody PostRequest request
    ) {
        PostEntity postEntity = postService.updatePost(postId, request, authId);
        Response<PostEntity> response = new Response<>(
            "successfully updated post!",
            postEntity
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<String> deletePost(
        @AuthenticationPrincipal UUID authId,
        @PathVariable UUID postId
    ) {
        postService.deletePost(postId, authId);
        return ResponseEntity.ok("successfully deleted post: " + postId);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Response<PostEntity>> likePost(
        @PathVariable UUID postId,
        @RequestBody LikeRequest request
    ) {
        PostEntity post = postService.likePost(postId, request.getUserId());
        Response<PostEntity> response = new Response<>(
            "successfully liked post",
            post
        );
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}/like/{userId}")
    public ResponseEntity<Response<PostEntity>> unlikePost(
        @PathVariable UUID postId,
        @PathVariable UUID userId
    ) {
        PostEntity post = postService.unlikePost(postId, userId);
        Response<PostEntity> response = new Response<>(
            "successfully unliked post",
            post
        );
        return ResponseEntity.ok(response);
    }
}
