import type { PostEntity } from "../../entities/PostEntity";
import type { UserEntity } from "../../entities/UserEntity";

export type ProfileUserType = UserEntity | 'loading' | 'error' | 'empty';

export type ProfilePostType = PostEntity[] | 'loading' | 'error' | 'empty';