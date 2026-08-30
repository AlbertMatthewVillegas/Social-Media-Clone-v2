import type { ListResponse } from "../../dto/server/ListResponse";
import { type PostRequest } from "../../dto/server/PostRequest";
import type { Response } from "../../dto/server/Response";
import type { PostEntity } from "../../entities/PostEntity";
import type { LikeRequest } from "../../dto/server/LikeRequest";
import { http } from "../../utils/http";

const BASE_URL = "http://localhost:8081/api/posts";

interface PostServiceType {
    createPost(request: PostRequest): Promise<Response<PostEntity>>;
    getAllPosts(): Promise<ListResponse<PostEntity>>;
    getAllPosts(userId: string): Promise<ListResponse<PostEntity>>;
    updatePost(postId: string, request: PostRequest): Promise<Response<PostEntity>>;
    deletePost(postId: string): Promise<string>;
    likePost(postId: string, request: LikeRequest): Promise<Response<PostEntity>>;
    unlikePost(postId: string, userId: string): Promise<Response<PostEntity>>;
}

export const postService: PostServiceType = {
    createPost: async (request: PostRequest): Promise<Response<PostEntity>> => {
        const mapping = '/';
        return await http.post<PostRequest, Response<PostEntity>>(
            BASE_URL + mapping,
            request
        );
    },

    getAllPosts: async (userId?: string): Promise<ListResponse<PostEntity>> => {
        const mapping = '/all';
        return await http.get<ListResponse<PostEntity>>(
            BASE_URL + mapping,
            userId ? [userId] : []
        );
    },

    updatePost: async (postId: string, request: PostRequest): Promise<Response<PostEntity>> => {
        const mapping = '/';
        return await http.put<PostRequest, Response<PostEntity>>(
            BASE_URL + mapping,
            [postId],
            request
        );
    },

    deletePost: async (postId: string): Promise<string> => {
        const mapping = '/';
        return await http.delete<string>(
            BASE_URL + mapping,
            [postId]
        );
    },

    likePost: async (postId: string, request: LikeRequest): Promise<Response<PostEntity>> => {
        const mapping = `/${postId}/like`;
        return await http.post<LikeRequest, Response<PostEntity>>(
            BASE_URL + mapping,
            request
        );
    },

    unlikePost: async (postId: string, userId: string): Promise<Response<PostEntity>> => {
        const mapping = `/${postId}/like/${userId}`;
        return await http.delete<Response<PostEntity>>(
            BASE_URL + mapping
        );
    }
};