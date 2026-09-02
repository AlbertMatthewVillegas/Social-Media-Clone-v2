import { Camera, CircleUser, Heart, MessageCircle } from "lucide-react"
import { motion } from "motion/react"
import Button from "../../components/Button"
import LoadingSpinner from "../../components/LoadingSpinner"
import MediaRenderer from "../../components/MediaRenderer"
import useProfile from "../../hooks/useProfile/hook"
import { PopUpProvider } from "../../hooks/usePopUp/provider"
import ProfileProvider from "../../hooks/useProfile/provider"

function ProfilePage(){
    return (
        <ProfileProvider>
            <ProfileBody/>
        </ProfileProvider>
    )

    
}



export default ProfilePage

function ProfileBody(){
    const { initializing } = useProfile()
    
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
                <ProfileCard/>
                <ProfileMisc/>
                <PostListView/>

            </div>
        </div>
    )
}

function ProfileCard() {
    const { user } = useProfile()
    if(user === undefined) {
        return null
    }

    const { profilePicture, fullname, username, followers, following, bio, posts } = user
    const hasPfp = profilePicture ? true : false
    const imgSize = 160 

    return <div className="flex flex-row gap-4">
        {hasPfp ? <img src={profilePicture} alt="current-user-profile-picture" height={imgSize} width={imgSize} /> : <CircleUser size={imgSize} />}
        <div className="flex flex-col gap-4">
            <span> {fullname}</span>
            <span> {username}</span>
            <span> {posts?.length} posts {followers?.length} followers {following?.length} following </span>
            <span> {bio || 'no bio yet, start writting.'} </span>
        </div>
    </div>
}

function ProfileMisc(){
    const { isFollowing, isCurrentUser, handleFollow, handleUnfollow, handleMessage, editProfile, viewArchive } = useProfile()
    if(isCurrentUser){
        return (
            <div className="flex flex-row gap-3">
                <Button onClick={editProfile}> edit profile </Button>
                <Button onClick={viewArchive}> view archive </Button>
            </div>
        )
    }

    if(isFollowing){
        return (
            <div className="flex flex-row gap-3">
                <Button onClick={handleUnfollow}> following </Button>
                <Button onClick={handleMessage}> message </Button>
            </div>
        )
    } 

    return (
            <div className="flex flex-row gap-3">
                <Button onClick={handleFollow}> follow </Button>
                <Button onClick={handleMessage}> message </Button>
            </div>
        )

}

function PostListView(){
    const { user, isCurrentUser } = useProfile()
    const posts = user?.posts

    if(posts === undefined){
        return <h1>failed to load posts</h1>
    }

    if(posts.length === 0){
        if(isCurrentUser){
            return (
                <div className="flex flex-col gap-4 w-full justify-center items-center">
                    <div className="border rounded-full w-fit p-3">
                        <Camera size={50}/>
                    </div>
                    <h1>Share Photos</h1>
                    <p>When you share photos, they will appear on your profile.</p>
                    
                </div>
            )
        }

        return (
            <div className="flex flex-col gap-4 w-full justify-center items-center">
                <h1>this user has no posts</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-row gap-4 p-4">
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