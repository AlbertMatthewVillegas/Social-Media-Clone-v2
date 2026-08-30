import { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router"
import type { UserEntity } from "../../entities/UserEntity"
import { userService } from "../../services/server/userService"
import type { PostEntity } from "../../entities/PostEntity"
import { postService } from "../../services/server/postService"
import type { ProfilePostType, ProfileUserType } from "./types"
import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook"
import { type FollowRequest } from "../../dto/server/FollowRequest"

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

    useEffect(() => {
        const load = () => {
            if (
                user !== 'loading' &&
                user !== 'error' &&
                user !== 'empty' &&
                currentUser !== undefined &&
                currentUser !== null
            ) {
                setIsCurrentUser(currentUser.userId === user.userId)
                setIsFollowing(currentUser.following.some((u) => u.userId === user.userId))
            } else {
                setIsCurrentUser(false)
                setIsFollowing(false)
            }
        }

        load()
    }, [user, currentUser])

    useEffect(() => {
        const loadPosts = async () => {
            if (user === 'loading') {
                setPosts('loading')
                return
            }

            if (user === 'empty') {
                setPosts('empty')
                return
            }

            if (user === 'error') {
                setPosts('error')
                return
            }

            setPosts('loading')

            try {
                const response = await postService.getAllPosts(user.userId)
                const fetchedPosts = response.entities as PostEntity[]
                setPosts(fetchedPosts)
            } catch {
                setPosts('error')
            }
        }

        loadPosts()
    }, [user])

    const handleFollow = useCallback(async () => {
        if (currentUser && user !== 'loading' && user !== 'error' && user !== 'empty') {
            try {
                const request: FollowRequest = {
                    userId: currentUser.userId,
                    targetUserId: user.userId
                }
                await userService.addFollowing(request)
                setIsFollowing(true)
                setUser(prev => {
                    if (prev !== 'loading' && prev !== 'error' && prev !== 'empty') {
                        return {
                            ...prev,
                            followers: [...prev.followers, currentUser]
                        }
                    }
                    return prev
                })
            } catch (error) {
                console.error("Failed to follow user:", error)
                throw error
            }
        }
    }, [currentUser, user])

    const handleUnfollow = useCallback(async () => {
        if (currentUser && user !== 'loading' && user !== 'error' && user !== 'empty') {
            try {
                await userService.removeFollowing(currentUser.userId, user.userId)
                setIsFollowing(false)
                setUser(prev => {
                    if (prev !== 'loading' && prev !== 'error' && prev !== 'empty') {
                        return {
                            ...prev,
                            followers: prev.followers.filter(u => u.userId !== currentUser.userId)
                        }
                    }
                    return prev
                })
            } catch (error) {
                console.error("Failed to unfollow user:", error)
                throw error
            }
        }
    }, [currentUser, user])

    return { user, posts, isCurrentUser, isFollowing, handleFollow, handleUnfollow }
}

export default useProfile