export interface UserEntity {
  userId?: string; // uuid
  username?: string;
  fullname?: string;
  profilePicture?: string;
  bio?: string;
  createdAt?: string; // date-time
  followers?: UserEntity[];
  following?: UserEntity[];
}
