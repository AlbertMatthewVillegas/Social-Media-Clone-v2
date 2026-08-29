package com.zerofuku.socialmediaclone.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zerofuku.socialmediaclone.entities.CommentEntity;
import com.zerofuku.socialmediaclone.entities.UserEntity;

import java.util.List;
public interface CommentRepository extends JpaRepository<CommentEntity, UUID> {
    List<CommentEntity> findByUser(UserEntity user);
}
