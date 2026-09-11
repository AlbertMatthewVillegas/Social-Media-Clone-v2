import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  Heart,
  MessageCircle,
  Send,
  Smile,
  Ellipsis,
  X,
} from "lucide-react";
import type { PostEntity } from "../../entities/PostEntity";
import MediaRenderer from "../MediaRenderer";
import { usePopUp } from "../../hooks/usePopUp/hook";
import { usePostSlider } from "../../hooks/usePostSlider";
import usePostEngagement from "../../hooks/usePostEngagement";
import { PostEngagementProvider } from "../../hooks/usePostEngagement";
import type { CommentEntity } from "../../entities/CommentEntity";

function PostPopUp({ post }: { post: PostEntity }) {
  return (
    <PostEngagementProvider post={post}>
      <PostPopUpContent />
    </PostEngagementProvider>
  );
}

function PostPopUpContent() {
  const { post } = usePostEngagement();
  const { isPopupOpen, closePopup } = usePopUp();
  const { currentIndex, goToPrevious, goToNext } = usePostSlider(post);

  if (!isPopupOpen || !post?.content?.length) {
    return null;
  }

  const isFirstContent = currentIndex === 0;
  const isLastContent = currentIndex === post.content?.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="text-white fixed right-10 top-10 z-10"
        onClick={closePopup}
      >
        <X size={24} />
      </button>
      <div className="relative w-full flex flex-row  max-w-4xl h-full max-h-[80vh] bg-black rounded-lg overflow-hidden">
        <div className="flex-5 flex items-center justify-center bg-black">
          {!isFirstContent && (
            <button
              className="relative left-10 text-white z-10"
              onClick={goToPrevious}
            >
              <ChevronLeft size={32} />
            </button>
          )}
          <MediaRenderer src={post.content[currentIndex]} />
          {!isLastContent && (
            <button
              className="relative right-10 text-white z-10"
              onClick={goToNext}
            >
              <ChevronRight size={32} />
            </button>
          )}
        </div>

        <div className="flex-4 flex flex-col p-4 bg-neutral-900">
          <PostHeader />
          <PostDetails />
          <PostEngagementControls />
        </div>
      </div>
    </div>
  );
}

export default PostPopUp;

function PostEngagementControls() {
  const { post, isLiked, commentText, setCommentText, toggleLike, addComment } =
    usePostEngagement();

  return (
    <div className="flex flex-col p-4 border flex-2">
      <div className="flex flex-row items-center gap-4 mb-4">
        <button className="text-white" onClick={toggleLike}>
          <Heart size={24} fill={isLiked ? "red" : "none"} />
        </button>
        <button className="text-white">
          <MessageCircle size={24} />
        </button>
        <button className="text-white">
          <Bookmark size={24} />
        </button>
      </div>
      <span className="text-white mb-4">{post.likes?.length} likes</span>
      <div className="flex flex-row items-center gap-4">
        <button className="text-white">
          <Smile size={24} />
        </button>
        <input
          type="text"
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent outline-none text-white placeholder-neutral-400"
        />
        <button className="text-white" onClick={addComment}>
          <Send size={24} />
        </button>
      </div>
    </div>
  );
}

function PostDetails() {
  const imgSharedSize = 40; // Set the desired size for the shared image
  const { post } = usePostEngagement();
  const { user, title, description } = post;
  return (
    <div className="flex flex-col flex-8 overflow-y-auto">
      <div className="flex flex-row gap-2">
        {user?.profilePicture ? (
          <img
            width={imgSharedSize}
            height={imgSharedSize}
            src={user?.profilePicture}
            alt={user?.username}
            className="rounded-full"
          />
        ) : (
          <CircleUser />
        )}
        {user?.username} {title} {description}
      </div>
      {post.comments?.map((comment: CommentEntity) => (
        <div key={comment.commentId} className="flex flex-row gap-2 mt-2">
          {comment.user?.profilePicture ? (
            <img
              width={40}
              height={40}
              src={comment.user?.profilePicture}
              alt={comment.user?.username}
              className="rounded-full"
            />
          ) : (
            <CircleUser />
          )}
          <div className="flex flex-col">
            <span className="text-white font-semibold">
              {comment.user?.username}
            </span>
            <span className="text-white">{comment.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function PostHeader() {
  const imgSharedSize = 40; // Set the desired size for the shared image
  const { post } = usePostEngagement();
  const { user } = post;
  if (!post) {
    return (
      <div className="flex-4 flex flex-col p-4 bg-neutral-900">
        <span>Loading...</span>
      </div>
    );
  }

  if (post === undefined) {
    return (
      <div className="flex-4 flex flex-col p-4 bg-neutral-900">
        <span>Error: User not found</span>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center justify-between gap-4 mb-4 flex-1">
      <div className="flex flex-row items-center gap-2">
        {user?.profilePicture ? (
          <img
            width={imgSharedSize}
            height={imgSharedSize}
            src={user?.profilePicture}
            alt={user?.username}
            className="rounded-full"
          />
        ) : (
          <CircleUser />
        )}
        <span className="text-white">{user?.username}</span>
      </div>
      <button className="text-white">
        <Ellipsis size={24} />
      </button>
    </div>
  );
}
