package com.zerofuku.socialmediaclone.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "post")
@Data
@NoArgsConstructor
public class PostEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID postId;

	@ElementCollection
	@Column(name = "content", columnDefinition = "TEXT")
	private List<String> content;
	private String title;
	private String description;

    @CreationTimestamp
	private LocalDateTime createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private UserEntity user;

	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<CommentEntity> comments = new ArrayList<>();

	
	@ManyToMany
    @JsonIgnoreProperties({"followers", "following", "hibernateLazyInitializer", "handler"})
    private List<UserEntity> likes = new ArrayList<>();

	public void addLike(UserEntity user) {
		if (user != null && !likes.contains(user)) {
			likes.add(user);
		}
	}

	public void removeLike(UserEntity user) {
		if (user != null) {
			likes.remove(user);
		}
	}

    public PostEntity(
		List<String> content, 
		String title, 
		String description, 
		UserEntity user
	) {
        this.content = content;
		this.title = title;
		this.description = description;
		this.content = content;
        this.user = user;
    }
}
