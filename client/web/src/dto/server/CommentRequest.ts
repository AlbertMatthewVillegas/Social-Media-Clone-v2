export interface CommentRequest {
    userId: string; // UUID represented as a string
    postId: string; // UUID represented as a string
    text: string;
}