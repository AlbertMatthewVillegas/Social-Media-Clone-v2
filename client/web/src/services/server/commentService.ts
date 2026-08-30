import type { CommentRequest } from "../../dto/server/CommentRequest";
import type { Response } from "../../dto/server/Response";
import type { CommentEntity } from "../../entities/CommentEntity";
import type { LikeRequest } from "../../dto/server/LikeRequest";
import { http } from "../../utils/http";

const BASE_URL = "http://localhost:8080/api/comments";

export const commentService = {
    createComment: async (request: CommentRequest): Promise<Response<CommentEntity>> => {
        const mapping = '/';
        return await http.post<CommentRequest, Response<CommentEntity>>(
            BASE_URL + mapping,
            request
        );
    },

    updateComment: async (commentId: string, request: CommentRequest): Promise<Response<CommentEntity>> => {
        const mapping = `/`;
        return await http.put<CommentRequest, Response<CommentEntity>>(
            BASE_URL + mapping,
            [commentId],
            request
        )
    },

    deleteComment: async (commentId: string):Promise<string>  => {
        const mapping = `/`;
        return await http.delete<string>(
            BASE_URL + mapping,
            [commentId]
        )
    },

    likeComment: async (commentId: string, request: LikeRequest): Promise<Response<CommentEntity>> => {
        const mapping = `/${commentId}/like`;
        return await http.post<LikeRequest, Response<CommentEntity>>(
            BASE_URL + mapping,
            request
        );
    },

    unlikeComment: async (commentId: string, userId: string): Promise<Response<CommentEntity>> => {
        const mapping = `/${commentId}/like/${userId}`;
        return await http.delete<Response<CommentEntity>>(
            BASE_URL + mapping
        );
    }
};