import { useEffect, useState } from "react"
import type { PostEntity } from "../../entities/PostEntity"
import { postService } from "../../services/postService"

function useHome(){
    
    const [posts, setPosts] = useState<PostEntity[] | 'loading' | undefined>(undefined)
    
    useEffect(()=>{
        try {
            const loadPosts = async () => {
                setPosts('loading')
                const response = await postService.getAllPosts()
                setPosts(response.entities as PostEntity[])
            }
            loadPosts()
        } catch (error) {
            console.error(error)
        }
    },[])

    return {
        posts
    }
}

export default useHome