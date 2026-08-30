import { Bookmark, ChevronLeft, ChevronRight, CircleUser, Heart, MessageCircle, Send, Smile, X } from "lucide-react";
import type { PostEntity } from "../../entities/PostEntity";
import MediaRenderer from "../MediaRenderer";
import { usePopUp } from "../../hooks/usePopUp/hook";
import { usePostPopUp } from "../../hooks/usePostPopUp";
import getTimeElapsed from "../../utils/getTimeElapsed";
import { useEffect } from "react";

interface PostPopUpProps {
    post: PostEntity;
}

function PostPopUp({ post }: PostPopUpProps) {
    const { isPopupOpen, closePopup } = usePopUp();
    const { currentIndex, totalSlides, goToPrevious, goToNext, goToSlide } = usePostPopUp(post);

    useEffect(()=>{
        const result = isPopupOpen
        console.log(result)
    },[isPopupOpen])

    if (!isPopupOpen || !post?.content?.length) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={closePopup}
        >
            <div
                className="flex w-[960px] h-[560px] overflow-hidden rounded-2xl bg-black"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex-[3]">
                    <MediaRenderer src={post.content[currentIndex]} idx={currentIndex} />
                </div>

                <div className="flex flex-[2] flex-col text-white">
                    <div className="flex p-3 flex-row justify-between">
                        <div className="flex flex-row gap-2 items-center p-2">
                            {post.user.profilePicture ? post.user.profilePicture : (<CircleUser size={40} />)}
                            <div className="flex flex-col">
                                <h3>{post.user.username}</h3>
                                <p>{post.user.fullname}</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={(event) => {
                                event.stopPropagation();
                                closePopup();
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100"
                        >
                            <X size={20} fill="black" />
                        </button>
                    </div>

                    <hr />

                    <div className="p-4 h-full w-full">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        {post.description && <p className="mt-2 text-sm">{post.description}</p>}
                    </div>

                    <hr />

                    <div className="flex flex-row gap-2 p-4">
                        <Heart />
                        <MessageCircle />
                        <Send />
                        <Bookmark />
                    </div>
                    <div className="p-4">
                        <h3>{post.likes.length} likes</h3>
                        <p>{getTimeElapsed(post.createdAt, 'phrase')}</p>
                    </div>
                    <hr></hr>
                    <div className="p-4 w-full flex flex-row gap-4">
                        <button>
                            <Smile/>
                        </button>

                        <input className="w-full outline-none">
                        
                        </input>
                        <button> Post </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPopUp;
