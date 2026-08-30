import { CircleUser } from "lucide-react"
import useProfile from "../../hooks/useProfile"
import PostPreview from "../../components/PostPreview"
import LoadingSpinner from "../../components/LoadingSpinner"
import { PopUpProvider } from "../../hooks/usePopUp/provider"
import type { ProfilePostType, ProfileUserType } from "../../hooks/useProfile/types"
import Button from "../../components/Button"

function ProfilePage(){
    const { user, posts, isFollowing, isCurrentUser, handleFollow, handleUnfollow } = useProfile()
    
    return (
        <div className="flex flex-col  min-h-screen overflow-y-auto">
            <div className="flex flex-col min-h-120 w-full justify-center items-center">
                <ProfileCard user={user} posts={posts}/>
                {isCurrentUser ?(
                    <div className="flex flex-row gap-4 w-full">
                        <Button> edit profile </Button>
                        <Button> view archive </Button>
                    </div>
                ):(
                    <div className="flex flex-row gap-4 w-full">
                        {isFollowing ? (
                            <Button onClick={() => handleUnfollow()}>unfollow</Button>
                        ) : (
                            <Button onClick={() => handleFollow()}>follow</Button>
                        )}
                    </div>
                )}
            </div>
            <ProfilePosts posts={posts} />
        </div>
    )
}

function ProfilePosts({ posts }:{ posts : ProfilePostType}){
    if (posts === 'loading') {
        return (
            <div>
                <LoadingSpinner/>
            </div>
        )
    }

    if (posts === 'empty' || posts === 'error' || posts.length === 0) {
        return (
            <div className="">
                <h1> Share Photos </h1>
                <p> When you share photos, they will appear on your profile. </p>
            </div>
        )
    }

    return (
        <div className=" m-4 flex flex-inline">
            {posts.map((post)=>(
                <PopUpProvider key={post.postId}>
                    <PostPreview post={post}/>
                </PopUpProvider>
            ))}
        </div>
    )
}

function ProfileCard({ user, posts }:{ user: ProfileUserType, posts : ProfilePostType }) {
    if (user === 'loading') {
        return <h1>Data is loading....</h1>
    }
    if (user === 'empty') {
        return null
    }
    if (user === 'error') {
        return <h1>No data found</h1>
    }

    return (
        <div className="flex flex-row gap-4 p-3 w-full justify-center items-center">
            {user.profilePicture ? (
                <img 
                    src={user.profilePicture} 
                    width={80} 
                    height={80} 
                    alt="user-profile-picture" 
                    className="rounded-full" 
                />
            ) : (
                <CircleUser size={80} />
            )}
            <div className="flex flex-col gap-4">
                <h2>{user.username}</h2>
                <p>{user.fullname}</p>
                <div className="flex flex-col gap-2">
                    <p>{user.bio}</p>
                    <p>
                        {posts.length} posts 
                        {'  '}
                        {user.followers.length} {user.followers.length > 1 ? 'followers' : 'follower'} 
                        {'  '}
                        {user.following.length} following 
                    </p>
                </div>
            </div>
            
        </div>
    )
}

export default ProfilePage