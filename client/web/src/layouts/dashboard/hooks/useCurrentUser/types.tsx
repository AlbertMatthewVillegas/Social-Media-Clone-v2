import type { UserEntity } from "../../../../entities/UserEntity";
export interface CurrentUserContextType {
  currentUser: UserEntity | undefined;
  updateCurrentUser: (newUser: UserEntity) => void;
}
