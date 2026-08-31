package com.zerofuku.socialmediaclone.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
public class CommentEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	@Column(name = "comment_id", updatable = false, nullable = false)
	private UUID commentId;

	private String text;

    @CreationTimestamp
	private LocalDateTime createdAt;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private UserEntity user;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private PostEntity post;

	@ManyToMany
    @JsonIgnoreProperties({"followers", "following", "hibernateLazyInitializer", "handler"})
    private List<UserEntity> likes = new ArrayList<>();

	public CommentEntity(
		PostEntity post,
		UserEntity user,
		String text
	) {
		this.post = post;
		this.user = user;
		this.text = text;
	}

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
}
