import { useEffect, useState, type ReactNode } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook"
import type { UserEntity } from "../../entities/UserEntity"
import { userService } from "../../services/userService"
import ProfileContext from "./context"

function ProfileProvider({ children }: { children: ReactNode }) {
    const { username } = useParams()
    const currentUser = useCurrentUser()
    const [user, setUser] = useState<UserEntity | undefined>(undefined)

    const navigate = useNavigate()
    
    const isCurrentUser = user?.userId === currentUser?.userId
    const isFollowing = user?.followers?.some((follower) => follower.userId === currentUser?.userId)

    useEffect(() => {
        if (!username) return;

        const load = async () => {
            try {
                const fetchedUser = await userService.getUser(username)
                setUser(fetchedUser.entity)
            } catch (error) {
                console.error(error)
            }
        }
        load()

    }, [username, currentUser])

    const handleFollow = () => {
        if (!currentUser) return;

        const alreadyFollows = user?.followers?.some(follower => follower.userId === currentUser.userId)

        if (alreadyFollows) return;

        setUser(prev => {
            if (!prev) return prev;
            return { ...prev, followers: [...(prev.followers ?? []), currentUser] }
        })
    }

    const handleUnfollow = () => {
        if (!currentUser) return;

        setUser(prev => {
            if (!prev) return prev;
            return { ...prev, followers: prev.followers?.filter(f => f.userId !== currentUser.userId) }
        })
    }

    const handleMessage = () => {
        // open a chatbox 
    }

    const editProfile = () => {
        navigate("/accounts/edit")
    }

    const viewArchive = () => {
        navigate("/archive/posts")
    }

    const initializing = username === undefined || currentUser === undefined || user === undefined

    return (
        <ProfileContext.Provider value={{ user, isCurrentUser, isFollowing, initializing, handleFollow, handleUnfollow, handleMessage, editProfile, viewArchive }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider