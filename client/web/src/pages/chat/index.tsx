import useCurrentUser from "../../layouts/dashboard/hooks/useCurrentUser/hook"


function ChatPage(){
    const currentUser = useCurrentUser()
    
    return (
        <div className="w-full flex flex-row p-4 gap-4">
            <div className="border rounded-xl p-4 w-100">
                chat sidebar

            </div>

            <div className="border rounded-xl p-4 w-full">
                chat main body
            </div>
        </div>
    )
}

export default ChatPage