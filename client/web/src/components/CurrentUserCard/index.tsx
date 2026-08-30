import { CircleUser } from "lucide-react"
import type { UserEntity } from "../../entities/UserEntity"

function CurrentUserCard({ user }: { user?: UserEntity }){
    
    const imgSharedSizes = 50
    return (
        <div className="border rounded-2xl p-4 flex flex-row items-center gap-4 h-fit">
            {user?.profilePicture ? (<img src={user.profilePicture} alt="user-profile-picture" width={imgSharedSizes} height={imgSharedSizes}/>) : <CircleUser size={imgSharedSizes}/>}
            <div>
                <h3>{user?.username}</h3>
                <p>{user?.fullname}</p>
            </div>
        </div>
    )
}

export default CurrentUserCard