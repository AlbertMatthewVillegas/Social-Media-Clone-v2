import { Outlet } from "react-router-dom"
import SearchProvider from "../../hooks/useSearch/provider"
import SettingsSidebar from "./components/SettingsSidebar"

function AccountsLayout(){
    return (
        <div className="">
            <SearchProvider>
            <SettingsSidebar/>
            <Outlet/>
            </SearchProvider>
        </div>
    )
}

export default AccountsLayout