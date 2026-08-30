export interface PostRequest {
    userId: string; // UUID represented as a string in TypeScript
    content: string[];
    title: string;
    description: string;
}