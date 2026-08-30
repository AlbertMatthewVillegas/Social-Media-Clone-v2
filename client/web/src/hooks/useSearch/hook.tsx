import { useContext } from "react"
import { SearchContext } from "./context"

function useSearch(){
    const context = useContext(SearchContext)
    if(!context) throw new Error("useSearch/SearchContext should be used inside SearchProvider!")
    return context
}

export default useSearch