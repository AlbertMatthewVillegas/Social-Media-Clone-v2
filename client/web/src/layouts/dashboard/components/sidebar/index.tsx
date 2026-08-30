import {useNavigate} from "react-router-dom";
import AnimatedNavButton from "../animated-button";
import { Heart, Home, Menu, MessageCircle, Plus, Search, UserCircle } from "lucide-react";
import useCurrentUser from "../../hooks/useCurrentUser/hook"
import { NotificationSidebar } from "../../../../components/NotificationSidebar";
import CreateButton from "../create-popup";
import MoreButton from "../more-popup";

function DashboardSidebar() {
  const navigate = useNavigate()
  const user = useCurrentUser()

  return (
    <div className="h-screen p-4 flex flex-col justify-between">
      <div>
        <h3> zerofuku </h3>
      </div>
      <div className="flex flex-col gap-4">
        <AnimatedNavButton onClick={()=>navigate('/home')}>
          <Home /> home
        </AnimatedNavButton>
        <AnimatedNavButton onClick={()=>navigate('/messages')}>
          <MessageCircle /> messages
        </AnimatedNavButton>
        <AnimatedNavButton onClick={()=>navigate('/search')}>
          <Search /> search
        </AnimatedNavButton>
        <NotificationSidebar>
          <Heart /> notifications  
        </NotificationSidebar>  

        <CreateButton>
          <Plus/> create
        </CreateButton>
        
        <AnimatedNavButton onClick={()=>navigate('/'+user?.username)}>
          {user?.profilePicture ? (<img src={user.profilePicture} alt="Profile" className="w-6 h-6 rounded-full" />) : <UserCircle/>} profile
        </AnimatedNavButton>
      </div>

      <MoreButton>
        <Menu /> more
      </MoreButton>
      
    </div>
  );
}






export default DashboardSidebar;