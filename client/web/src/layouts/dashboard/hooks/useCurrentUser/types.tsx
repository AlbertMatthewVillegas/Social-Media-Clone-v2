import type { Response } from "../../../../dto/Response";
import type { UserEntity } from "../../../../entities/UserEntity";
export interface CurrentUserContextType {
  currentUser: Response<UserEntity> | null;
}
