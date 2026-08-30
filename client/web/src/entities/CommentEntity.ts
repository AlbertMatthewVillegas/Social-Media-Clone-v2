import type { UserEntity } from "./UserEntity";

export interface CommentEntity {
  commentId?: string; // uuid
  text?: string;
  createdAt?: string; // date-time
  user?: UserEntity;
  likes?: UserEntity[];
}