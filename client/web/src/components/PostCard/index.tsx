import { Heart, MessageCircle, CircleUser } from "lucide-react";
import type { PostEntity } from "../../entities/PostEntity";
import MediaRenderer from "../MediaRenderer";
import getTimeElapsed from "../../utils/getTimeElapsed";


function PostCard({ post }:{ post : PostEntity }){
    const imgSharedSizes = 50
    return (
        <div className="flex flex-col gap-4 border p-4 pb-8 rounded-2xl h-160 w-120">
            <div className="flex flex-row gap-4 items-center">
                {post.user?.profilePicture ? (<img src={post.user.profilePicture} alt="user-profile-picture" width={imgSharedSizes} height={imgSharedSizes}/>) : <CircleUser size={imgSharedSizes}/>}
                <div>
                    <h3>{post.user?.username}</h3>
                    <p>{post.user?.fullname}</p>
                </div>

                <p>{getTimeElapsed(post.createdAt || '','letter')}</p>
            </div>
            <div className="flex flex-row gap-4 max-w-120 overflow-auto border rounded-2xl">
                {post.content?.length === 0 ? ( 
                    <div className="w-100 h-120 rounded-2xl">
                        Error Loading Media
                        
                    </div> 
                ):(
                    post.content?.map((media, index) => (
                    <MediaRenderer src={media} key={`${media}-${index}`}/>
                ))) }
            </div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            
            <div className="flex flex-row gap-4">
                <button>
                    <Heart/>    
                </button> 
                {post.likes?.length || 0}
                <button>
                    <MessageCircle/>
                </button> 
                {post.comments?.length || 0}
            </div>
        </div>
    )
}

export default PostCard