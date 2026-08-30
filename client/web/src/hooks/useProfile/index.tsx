import { useEffect, useState } from "react"
import { useParams } from "react-router"
import type { UserEntity } from "../../entities/UserEntity"
import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook"
import { userService } from "../../services/userService"
import type { ProfilePostType, ProfileUserType } from "./types"

// TODO: make this shorter
// TODO: the whole page is rendering when follow/unfollow is clicked

function useProfile() {
    const { slug } = useParams()
    const [user, setUser] = useState<ProfileUserType>('loading')
    const [posts, setPosts] = useState<ProfilePostType>('loading')
    const [isCurrentUser, setIsCurrentUser] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false)
    const currentUser = useCurrentUser()
    
    useEffect(() => {
        const loadUser = async () => {
            if (!slug) {
                setUser('empty')
                setPosts('empty')
                return
            }

            setUser('loading')
            setPosts('loading')

            try {
                const response = await userService.getUser(slug)
                const fetchedUser = response.entity as UserEntity
                setUser(fetchedUser)
            } catch {
                setUser('error')
                setPosts('error')
            }
        }
        loadUser()
    }, [slug])

    const handleFollow = async () => {

    } 

    const handleUnfollow = async () => {

    }

    return { user, posts, isCurrentUser, isFollowing, handleFollow, handleUnfollow }
}

export default useProfile