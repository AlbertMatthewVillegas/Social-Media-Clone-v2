import CurrentUserCard from "../../components/CurrentUserCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import PostCard from "../../components/PostCard";
import type { PostEntity } from "../../entities/PostEntity";
import useHome from "../../hooks/useHome";
import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook";


function HomePage() {
    
    const user = useCurrentUser()
    return (
       <div className="flex flex-row w-full p-8">
            <div className="flex-1 ">
                <PostListView/>
            </div>
            <CurrentUserCard user={user}/>
       </div>
    );
}

function PostListView(){
    const { posts } = useHome()
    if(posts === 'loading'){
        return (
            <div className="flex w-full h-full items-center justify-center">
                <LoadingSpinner/>
            </div>
        )
    }

    if(posts === null){
        return (
            <div className="flex w-full h-full items-center justify-center">
                no posts to show
            </div>
        )
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            {posts.map((post:PostEntity) => (
                <PostCard post={post} key={post.postId}/>
            ))}
        </div>
    )
}

export default HomePage