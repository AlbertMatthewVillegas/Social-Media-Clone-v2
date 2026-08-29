package com.zerofuku.socialmediaclone.dto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
    private UUID userId; 
    private List<String> content;
	private String title;
	private String description;
}
