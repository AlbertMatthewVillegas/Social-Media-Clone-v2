import { useState, type ChangeEvent, type ReactNode } from "react";
import { SearchContext } from "./context";
import { HttpError } from "../../exceptions/HttpError";
import type { UserEntity } from "../../entities/UserEntity";
import { userService } from "../../services/userService";

function SearchProvider({children}:{children?:ReactNode}){
    const [search,setSearch] = useState("");
    const [results,setResults] = useState<UserEntity[] | 'loading' | 'error' | null >(null)

    const handleSearch = async (e:ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setSearch(value)
        const query = search
        if(query.length !== 0){
            try {
                // TODO: fetch search results
                const response = await userService.search(query)
                setResults(response.entities || null)
            } catch (e: unknown){
                if(e instanceof HttpError){
                    console.log(e.message);
                    console.log(e.statusCode);
                }
            }
        }
    }
    return (
        <SearchContext.Provider value={{search,results,handleSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchProvider