import { useState, type MouseEvent } from "react"

type SortTypes = 'people you follow' | 'follows' | 'comments' | 'all'

function useNotifications(){
    const sortTypes = ['people you follow','follows','comments','all']
    const [notifications, setNotifications] = useState('') // TODO: change later
    const [sortBy, setSortBy] = useState<SortTypes>('all')
    
    const loadNotifications = () => {

    }

    const handleSortBy = (event: MouseEvent<HTMLButtonElement>) => {
        const name  = event.currentTarget.name as SortTypes
        setSortBy(name);
    }

    return {
        notifications,
        sortTypes,
        sortBy,
        loadNotifications,
        handleSortBy
    }
}

export default useNotifications