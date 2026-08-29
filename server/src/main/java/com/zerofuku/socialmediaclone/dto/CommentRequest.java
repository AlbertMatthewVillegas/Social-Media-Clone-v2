package com.zerofuku.socialmediaclone.dto;

import java.util.UUID;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentRequest {
    private UUID userId;
    private UUID postId;
    private String text;
}
