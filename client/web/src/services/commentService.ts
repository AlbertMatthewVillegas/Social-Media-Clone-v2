import type { CommentRequest } from "../dto/CommentRequest";
import type { Response } from "../dto/Response";
import type { CommentEntity } from "../entities/CommentEntity";

import { HttpError } from "../exceptions/HttpError";

export const commentService = {
  createComment: async (
    payload: CommentRequest,
  ): Promise<Response<CommentEntity>> => {
    const url = "http://localhost:8080/api/comments";
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return await response.json();
  },

  updateComment: async (
    commentId: string,
    payload: CommentRequest,
  ): Promise<Response<CommentEntity>> => {
    const url = `http://localhost:8080/api/comments/${commentId}`;
    const options: RequestInit = {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return await response.json();
  },

  deleteComment: async (commentId: string): Promise<string> => {
    const url = `http://localhost:8080/api/comments/${commentId}`;
    const options: RequestInit = {
      method: "DELETE",
      credentials: "include",
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return await response.text();
  },

  likeComment: async (commentId: string): Promise<Response<CommentEntity>> => {
    const url = `http://localhost:8080/api/comments/${commentId}/like`;
    const options: RequestInit = {
      method: "POST",
      credentials: "include",
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return await response.json();
  },

  unlikeComment: async (
    commentId: string,
  ): Promise<Response<CommentEntity>> => {
    const url = `http://localhost:8080/api/comments/${commentId}/like`;
    const options: RequestInit = {
      method: "DELETE",
      credentials: "include",
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return await response.json();
  },
};
