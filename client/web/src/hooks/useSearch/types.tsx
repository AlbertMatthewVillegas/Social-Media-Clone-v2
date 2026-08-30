import type { ChangeEvent } from "react";
import type { UserEntity } from "../../entities/UserEntity";


export interface SearchContextType {
    search:string;
    results: UserEntity[] | 'loading' | 'error' | 'empty';
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

