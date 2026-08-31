import type { UserEntity } from "../../entities/UserEntity"

export interface ProfileContextValue {
    user: UserEntity | undefined
    isCurrentUser: boolean
    isFollowing: boolean | undefined
    initializing: boolean
    handleFollow: () => void
    handleUnfollow: () => void
    handleMessage: () => void
    editProfile: () => void
    viewArchive: () => void
}