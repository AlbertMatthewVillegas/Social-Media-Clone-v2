import { useState } from "react";
import type { CommentEntity } from "../../entities/CommentEntity";
import { commentService } from "../../services/commentService";
import { postService } from "../../services/postService";
import { HttpError } from "../../exceptions/HttpError";
import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook";
import { PostEngagementContext } from "./context";
import type {
  PostEngagementContextValue,
  PostEngagementProviderProps,
} from "./types";

export function PostEngagementProvider({
  post: initialPost,
  children,
}: PostEngagementProviderProps) {
  const [post, setPost] = useState(initialPost);
  const [commentText, setCommentText] = useState("");
  const { currentUser } = useCurrentUser();
  const isLiked =
    post.likes?.some((like) => like.userId === currentUser?.userId) ?? false;

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
    } catch (error) {
      if (!(error instanceof HttpError && error.statusCode >= 500)) {
        setPost(previousPost);
      }
      console.error("Error toggling like:", error);
    }
  };

  const addComment = async () => {
    const text = commentText.trim();
    if (!post.postId || !text) return;

    const newComment: CommentEntity = {
      text,
      user: currentUser ?? undefined,
      createdAt: new Date().toISOString(),
      likes: [],
    };

    try {
      await commentService.createComment(post.postId, { text });
      setPost((previousPost) => ({
        ...previousPost,
        comments: [...(previousPost.comments ?? []), newComment],
      }));
      setCommentText("");
    } catch (error) {
      if (error instanceof HttpError && error.statusCode >= 500) {
        setPost((previousPost) => ({
          ...previousPost,
          comments: [...(previousPost.comments ?? []), newComment],
        }));
        setCommentText("");
      }
      console.error("Error adding comment:", error);
    }
  };

  const value: PostEngagementContextValue = {
    post,
    isLiked,
    commentText,
    setCommentText,
    toggleLike,
    addComment,
  };

  return (
    <PostEngagementContext.Provider value={value}>
      {children}
    </PostEngagementContext.Provider>
  );
}
