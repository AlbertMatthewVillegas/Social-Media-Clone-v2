import type { CommentEntity } from "./CommentEntity";
import type { UserEntity } from "./UserEntity";

export interface PostEntity {
    postId: string; // UUID
    content: string[];
    title: string;
    description: string;
    createdAt: string; // ISO 8601 timestamp string
    user: UserEntity;
    comments: CommentEntity[];
    likes: UserEntity[];
}