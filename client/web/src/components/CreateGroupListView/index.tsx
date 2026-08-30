import { CircleUser } from "lucide-react";
import useSearch from "../../hooks/useSearch/hook";

function CreateGroupListView() {
    const { results } = useSearch()
    
    if (results === 'empty') {
        return <div className="text-[#948D83]">start searching...</div>
    }

    if (results === 'loading') {
        return <div className="text-[#948D83]">Loading search results...</div>;
    }

    if (results === 'error') {
        return <div className="text-red-400">Failed to load search results.</div>;
    }

    if (!results || results.length === 0) {
        return <div className="text-[#948D83]">No users found.</div>;
    }

    return (
        <div className="flex flex-col gap-2">
            {results.map(user => (
                <label
                    key={user.userId}
                    className="flex cursor-pointer flex-row items-center gap-3 rounded-xl bg-[#212624] p-3 text-white transition hover:bg-white/10"
                >
                    <input type="checkbox" className="h-4 w-4 rounded border-[#948D83] bg-transparent accent-[#F9DD55]" />
                    {!user.profilePicture ? <CircleUser size={30}/> : <img src={user.profilePicture} className="rounded-full" width={30} height={30} alt="user-profile-picture"/>}
                    <div className="flex flex-col gap0-2">
                        <p className="font-semibold">{user.fullname}</p>
                        <p className="text-sm text-[#948D83]">@{user.username}</p>
                    </div>
                </label>
            ))}
        </div>
    );
}

export default CreateGroupListView