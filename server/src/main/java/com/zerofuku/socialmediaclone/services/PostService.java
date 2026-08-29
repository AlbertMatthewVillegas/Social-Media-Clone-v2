package com.zerofuku.socialmediaclone.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zerofuku.socialmediaclone.dto.PostRequest;
import com.zerofuku.socialmediaclone.entities.PostEntity;
import com.zerofuku.socialmediaclone.entities.UserEntity;
import com.zerofuku.socialmediaclone.exceptions.InvalidRequestException;
import com.zerofuku.socialmediaclone.repositories.PostRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PostService {

    @Autowired
    private PostRepository repository;

    @Autowired
    private UserService userService;

    public PostService(PostRepository repository, UserService userService) {
        this.repository = repository;
        this.userService = userService;
    }

    @Transactional
    public PostEntity createPost(
        PostRequest request, 
        UUID authId
    ) {
        UserEntity user = userService.findByUserId(request.getUserId());

        if(!user.getAuthId().equals(authId)) throw new InvalidRequestException();

        PostEntity newPost = new PostEntity(
            request.getContent(),
            request.getTitle(),
            request.getDescription(),
            user
        );
        return repository.save(newPost);
    }

    public List<PostEntity> getAllPosts(){
        return repository.findAll();
    }

    public List<PostEntity> getAllPosts(UUID userId){
        UserEntity user = userService.findByUserId(userId);
        return repository.findByUser(user);
    }

    @Transactional
    public PostEntity updatePost(
        UUID postId, 
        PostRequest newPost, 
        UUID authId
    ){
        PostEntity oldPost = repository.findById(postId).orElseThrow(() -> new EntityNotFoundException());

        if (oldPost.getUser().getAuthId().equals(authId)) throw new InvalidRequestException();
        
        oldPost.setTitle(newPost.getTitle());
        oldPost.setContent(newPost.getContent());
        oldPost.setDescription(newPost.getDescription());
        return repository.save(oldPost);
    }

    @Transactional
    public void deletePost(
        UUID postId, 
        UUID authId
    ){
        PostEntity post = repository.findById(postId).orElseThrow(() -> new EntityNotFoundException());

        if (post.getUser().getAuthId().equals(authId)) throw new InvalidRequestException();

        repository.delete(post);
    }

    @Transactional
    public PostEntity likePost(UUID postId, UUID userId) throws EntityNotFoundException {
        PostEntity post = repository.findById(postId).orElseThrow(() -> new EntityNotFoundException());
        UserEntity user = userService.findByUserId(userId);
        
        post.addLike(user);
        return repository.save(post);
    }

    @Transactional
    public PostEntity unlikePost(UUID postId, UUID userId) throws EntityNotFoundException {
        PostEntity post = repository.findById(postId).orElseThrow(() -> new EntityNotFoundException());
        UserEntity user = userService.findByUserId(userId);
        
        post.removeLike(user);
        return repository.save(post);
    }
}
