import type { UserEntity } from "./UserEntity";

export interface CommentEntity {
  commentId: string;
  createdAt: string;
  likes: UserEntity[];
  parentCommentId: string | null;
  text: string;
  user: UserEntity;
}