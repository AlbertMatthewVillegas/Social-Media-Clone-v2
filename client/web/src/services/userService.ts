import type { UserRequest } from "../dto/UserRequest";
import { HttpError } from "../exceptions/HttpError";
import type { Response } from "../dto/Response";
import type { UserEntity } from "../entities/UserEntity";
import type { ListResponse } from "../dto/ListResponse";

export const userService = {
  getCurrentUser: async (): Promise<Response<UserEntity>> => {
    const url = "http://localhost:8080/api/users/me";
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

  updateCurrentUser: async (
    payload: UserRequest,
  ): Promise<Response<UserEntity>> => {
    const url = "http://localhost:8080/api/users/me";
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

  getUser: async (username: string): Promise<Response<UserEntity>> => {
    const url = `http://localhost:8080/api/users/${username}`;
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

  search: async (username: string): Promise<ListResponse<UserEntity>> => {
    const url = `http://localhost:8080/api/users/search/${username}`;
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

  getFollowers: async (userId: string): Promise<ListResponse<UserEntity>> => {
    const url = `http://localhost:8080/api/users/${userId}/followers`;
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

  addFollower: async (followerId: string): Promise<Response<UserEntity>> => {
    const url = `http://localhost:8080/api/users/followers/${followerId}`;
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

  removeFollower: async (followerId: string): Promise<Response<UserEntity>> => {
    const url = `http://localhost:8080/api/users/followers/${followerId}`;
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

  removeFollowing: async (
    targetUserId: string,
  ): Promise<Response<UserEntity>> => {
    const url = `http://localhost:8080/api/users/following/${targetUserId}`;
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
