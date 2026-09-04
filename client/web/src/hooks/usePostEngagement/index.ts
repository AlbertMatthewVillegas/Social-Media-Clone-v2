import { useState } from "react";
import type { PostEntity } from "../../entities/PostEntity";
import { commentService } from "../../services/commentService";
import { postService } from "../../services/postService";
import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook";

function usePostEngagement(initialPost: PostEntity) {
  const [post, setPost] = useState(initialPost);
  const [commentText, setCommentText] = useState("");
  const { currentUser } = useCurrentUser();
  const isLiked = post.likes?.some(
    (like) => like.userId === currentUser?.userId,
  ) ?? false;

  const toggleLike = async () => {
    if (!post.postId || !currentUser) return;

    const previousPost = post;
    const likes = isLiked
      ? post.likes?.filter((like) => like.userId !== currentUser.userId)
      : [...(post.likes ?? []), currentUser];

    setPost({ ...post, likes });

    try {
      if (isLiked) {
        await postService.unlikePost(post.postId);
      } else {
        await postService.likePost(post.postId);
      }

        console.log(post, "post")
    } catch (error) {
      setPost(previousPost);
      console.error("Error toggling like:", error);
    }
  };

  const addComment = async () => {
    const text = commentText.trim();
    if (!post.postId || !text) return;

    try {
      const response = await commentService.createComment({
        postId: post.postId,
        text,
      });

      if (response.entity) {
        setPost((previousPost) => ({
          ...previousPost,
          comments: [...(previousPost.comments ?? []), response.entity!],
        }));
        setCommentText("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return {
    post,
    isLiked,
    commentText,
    setCommentText,
    toggleLike,
    addComment,
  };
}

export default usePostEngagement;
