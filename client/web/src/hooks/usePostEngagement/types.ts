import type { ReactNode } from "react";
import type { PostEntity } from "../../entities/PostEntity";

export interface PostEngagementProviderProps {
  post: PostEntity;
  children: ReactNode;
}

export interface PostEngagementContextValue {
  post: PostEntity;
  isLiked: boolean;
  commentText: string;
  setCommentText: (value: string) => void;
  toggleLike: () => Promise<void>;
  addComment: () => Promise<void>;
}
