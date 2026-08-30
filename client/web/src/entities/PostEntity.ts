import type { CommentEntity } from "./CommentEntity";
import type { UserEntity } from "./UserEntity";

export interface PostEntity {
  postId?: string; // uuid
  content?: string[];
  title?: string;
  description?: string;
  createdAt?: string; // date-time
  user?: UserEntity;
  comments?: CommentEntity[];
  likes?: UserEntity[];
}