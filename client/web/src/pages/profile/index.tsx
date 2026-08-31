import { Camera, CircleUser, Heart, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import Button from "../../components/Button"
import LoadingSpinner from "../../components/LoadingSpinner"
import MediaRenderer from "../../components/MediaRenderer"
import type { PostEntity } from "../../entities/PostEntity"
import type { UserEntity } from "../../entities/UserEntity"
import useProfile from "../../hooks/useProfile"
import { PopUpProvider } from "../../hooks/usePopUp/provider"

function ProfilePage(){
    const { user, isCurrentUser, isFollowing, initializing } = useProfile()
    
    if(initializing) {
        return (
            <div className="flex w-full min-h-screen justify-center items-center">
                <LoadingSpinner/>
            </div>
        )
    }

    return (
        <div className="flex flex-col  min-h-screen overflow-y-auto p-3 w-full">
            <div className="border border-white flex w-full h-full flex-col"> 
                <ProfileCard user={user}/>
                <ProfileMisc isFollowing={isFollowing} isCurrentUser={isCurrentUser}/>
                <PostListView posts={user?.posts}/>

            </div>
        </div>
    )
}

export default ProfilePage

function ProfileCard({ user }: { user: UserEntity | undefined }) {
    if(user === undefined) {
        return null
    }

    const { profilePicture, fullname, username, followers, following, bio, posts } = user
    const hasPfp = profilePicture ? true : false
    const imgSize = 160 

    return <div className="flex flex-row gap-4">
        {hasPfp ? <img src={profilePicture} alt="current-user-profile-picture" height={imgSize} width={imgSize} /> : <CircleUser size={imgSize} />}
        <div className="flex flex-col gap-4">
            <h2> {fullname}</h2>
            <h2> {username}</h2>
            <h2> {posts?.length} posts {followers?.length} followers {following?.length} following </h2>
            <h2> {bio || 'no bio yet, start writting.'} </h2>
        </div>
    </div>
}

function ProfileMisc({ isFollowing, isCurrentUser }: { isFollowing: boolean | undefined, isCurrentUser: boolean }){
    if(isCurrentUser){
        return (
            <div className="flex flex-row gap-3">
                <Button> edit profile </Button>
                <Button> view archive </Button>
            </div>
        )
    }

    if(isFollowing){
        return (
            <div className="flex flex-row gap-3">
                <Button> following </Button>
                <Button> message </Button>
            </div>
        )
    } 

    return (
            <div className="flex flex-row gap-3">
                <Button> follow </Button>
                <Button> message </Button>
            </div>
        )

}

function PostListView({posts}:{posts:PostEntity[] | undefined}){
    if(posts === undefined){
        return <h1>failed to load posts</h1>
    }

    if(posts.length === 0){
        return (
            <div className="flex flex-col gap-4 w-full">
                <div className="border rounded-full w-fit p-3">
                    <Camera size={50}/>
                </div>
                <h1>Share Photos</h1>
                <p>When you share photos, they will appear on your profile.</p>
                
            </div>
        )
    }

    return (
        <div className="flex flex-row gap-4">
            {posts.map((post)=>(
                <div className="relative border rounded-xl w-100 h-160 overflow-hidden group" key={post.postId}>
                    <PopUpProvider>
                        <MediaRenderer src={post.content?.at(0)} />

                        <motion.div
                            className=" cursor-pointer absolute inset-0 flex items-center justify-center gap-6 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={false}
                        >
                            <div className="flex items-center gap-1">
                                <Heart size={20} fill="white" />
                                <span>{post.likes?.length ?? 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle size={20} fill="white" />
                                <span>{post.comments?.length ?? 0}</span>
                            </div>
                        </motion.div>
                    </PopUpProvider> {/* TODO: create a function component that pops up and redirects to /p/postId later */}
                </div>
            ))}
        </div>
    )
}