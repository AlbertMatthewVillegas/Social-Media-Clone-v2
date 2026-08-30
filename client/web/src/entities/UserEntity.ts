export interface UserEntity {
  authId: string;
  username: string;
  fullname: string;
  profilePicture: string;
  bio: string;
  createdAt: string;
  userId: string;
  followers: UserEntity[];
  following: UserEntity[];
}