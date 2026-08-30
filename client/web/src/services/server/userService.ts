import { http } from "../../utils/http";
import { type Response } from "../../dto/server/Response";
import { type ListResponse } from "../../dto/server/ListResponse";
import { type UserEntity } from "../../entities/UserEntity";
import { type UserRequest } from "../../dto/server/UserRequest";
import { type FollowRequest } from "../../dto/server/FollowRequest";

const BASE_URL = "http://localhost:8081/api/users";

export const userService = {
    getUser: async (username: string): Promise<Response<UserEntity>> => {
        const mapping = '/' + username;
        return await http.get<Response<UserEntity>>(
            BASE_URL + mapping
        );
    }, 

    search: async (username: string): Promise<ListResponse<UserEntity>> => {
        const mapping = '/search/' + username;
        return await http.get<ListResponse<UserEntity>>(
            BASE_URL + mapping
        );
    },

    getCurrentUser: async (): Promise<Response<UserEntity>> => {
        const mapping = '/me';
        return await http.get<Response<UserEntity>>(
            BASE_URL + mapping
        );

    },

    updateCurrentUser: async (request: UserRequest): Promise<Response<UserEntity>> => {
        const mapping = '/me';
        return await http.put<UserRequest, Response<UserEntity>>(
            BASE_URL + mapping,
            [],
            request
        );
    },

    addFollower: async (request: FollowRequest): Promise<Response<UserEntity>> => {
        const mapping = '/followers';
        return await http.post<FollowRequest, Response<UserEntity>>(
            BASE_URL + mapping,
            request
        );
    },

    removeFollower: async (userId: string, followerId: string): Promise<Response<UserEntity>> => {
        const mapping = `/${userId}/followers/${followerId}`;
        return await http.delete<Response<UserEntity>>(
            BASE_URL + mapping
        );
    },

    getFollowers: async (userId: string): Promise<ListResponse<UserEntity>> => {
        const mapping = `/${userId}/followers`;
        return await http.get<ListResponse<UserEntity>>(
            BASE_URL + mapping
        );
    },

    getFollowerCount: async (userId: string): Promise<Response<number>> => {
        const mapping = `/${userId}/followers/count`;
        return await http.get<Response<number>>(
            BASE_URL + mapping
        );
    },

    isFollowedBy: async (userId: string, followerId: string): Promise<Response<boolean>> => {
        const mapping = `/${userId}/followers/${followerId}/check`;
        return await http.get<Response<boolean>>(
            BASE_URL + mapping
        );
    },

    addFollowing: async (request: FollowRequest): Promise<Response<UserEntity>> => {
        const mapping = '/following';
        return await http.post<FollowRequest, Response<UserEntity>>(
            BASE_URL + mapping,
            request
        );
    },

    removeFollowing: async (userId: string, targetUserId: string): Promise<Response<UserEntity>> => {
        const mapping = `/${userId}/following/${targetUserId}`;
        return await http.delete<Response<UserEntity>>(
            BASE_URL + mapping
        );
    }
};