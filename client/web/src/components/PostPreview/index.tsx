import { Heart, MessageCircle } from "lucide-react";
import MediaRenderer from "../MediaRenderer";
import { usePopUp } from "../../hooks/usePopUp/hook";
import { useHover } from "../../hooks/useHover";
import type { PostEntity } from "../../entities/PostEntity";
import PostPopUp from "../PostPopUp";

interface PostPreviewProps {
    post : PostEntity
}

function PostPreview({ post }: PostPreviewProps) {
    const { isHovering, handleMouseEnter, handleMouseLeave } = useHover();
    const { openPopup, isPopupOpen } = usePopUp();

    return (
        <div
            className="rounded-lg relative cursor-pointer flex items-center justify-center w-100 h-120"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={openPopup}
        >

            {isHovering && (
                <div className="absolute z-10 bg-black/75 flex items-center justify-center w-full h-full">
                    <div className="flex items-center gap-4 text-white">
                        <Heart size={24} fill="white" />
                        <span className="text-lg font-semibold">{post.likes.length}</span>
                        <MessageCircle size={24} fill="white" />
                        <span className="text-lg font-semibold">{post.comments.length}</span>
                    </div>
                </div>
            )}

            <MediaRenderer src={post.content[0]} idx={0} />
            {isPopupOpen && <PostPopUp post={post}/>}
            
        </div>
    );
}

export default PostPreview;
