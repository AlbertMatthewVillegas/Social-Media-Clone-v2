import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook"
import type { UserEntity } from "../../entities/UserEntity"
import { userService } from "../../services/userService"

function useProfile() {
    const { username } = useParams()
    const currentUser = useCurrentUser()
    const [user, setUser] = useState<UserEntity | undefined>(undefined)

    const isCurrentUser = user?.userId === currentUser?.userId;
    const isFollowing = user?.followers?.some((follower) => follower.userId === currentUser?.userId);

    useEffect(() => {
        if (!username) return;

        const checkIfCurrentUser = async () => {
            try {
                const fetchedUser = await userService.getUser(username)
                setUser(fetchedUser.entity)
            } catch (error) {
                console.error(error)
            }
        }
        checkIfCurrentUser()

    }, [username, currentUser])

    const initializing = username === undefined || currentUser === undefined || user === undefined

    return { user, isCurrentUser,isFollowing, initializing }
}

export default useProfile