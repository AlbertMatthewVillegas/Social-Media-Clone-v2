package com.zerofuku.socialmediaclone.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zerofuku.socialmediaclone.entities.PostEntity;
import com.zerofuku.socialmediaclone.entities.UserEntity;

public interface PostRepository extends JpaRepository<PostEntity, UUID> {
    List<PostEntity> findByUser(UserEntity user);
}
