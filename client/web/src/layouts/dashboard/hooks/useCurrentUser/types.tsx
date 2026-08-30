import type { Response } from "../../../../dto/server/Response";
import type { UserEntity } from "../../../../entities/UserEntity";
export interface CurrentUserContextType {
  currentUser: Response<UserEntity> | null;
}
