import type { ListResponse } from "../dto/ListResponse";
import type { PostRequest } from "../dto/PostRequest";
import type { Response } from "../dto/Response";
import type { PostEntity } from "../entities/PostEntity";
import { HttpError } from "../exceptions/HttpError";

export const postService = {
  createPost: async (payload: PostRequest): Promise<Response<PostEntity>> => {
    const url = "http://localhost:8080/api/posts";
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

  updatePost: async (
    postId: string,
    payload: PostRequest,
  ): Promise<Response<PostEntity>> => {
    const url = `http://localhost:8080/api/posts/${postId}`;
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

  deletePost: async (postId: string): Promise<string> => {
    const url = `http://localhost:8080/api/posts/${postId}`;
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

  likePost: async (postId: string): Promise<Response<PostEntity>> => {
    const url = `http://localhost:8080/api/posts/${postId}/like`;
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

  unlikePost: async (postId: string): Promise<Response<PostEntity>> => {
    const url = `http://localhost:8080/api/posts/${postId}/like`;
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

  getAllPosts: async (): Promise<ListResponse<PostEntity>> => {
    const url = "http://localhost:8080/api/posts/all";
    const options: RequestInit = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return await response.json();
  },

  getAllPostsByUser: async (
    userId: string,
  ): Promise<ListResponse<PostEntity>> => {
    const url = `http://localhost:8080/api/posts/all/${userId}`;
    const options: RequestInit = {
      method: "GET",
      credentials: "include",
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new HttpError(response.statusText, response.status);
    }
    return await response.json();
  },
};
