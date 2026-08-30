import { BrowserRouter, Routes, Route } from "react-router"
import LoginPage from "./pages/login"
import LandingPage from "./pages/landing"
import RegisterPage from "./pages/register"
import DashboardLayout from "./layouts/dashboard"
import SearchPage from "./pages/search"
import ProfilePage from "./pages/profile"
import HomePage from "./pages/home"
import ChatPage from "./pages/chat"

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route element={<DashboardLayout/>}>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/search" element={<SearchPage/>} />
            <Route path="/p/:slug" element={<></>} /> 
            <Route path="/messages" element={<ChatPage/>}/>
            <Route path="/:slug" element={<ProfilePage/>} /> 
          </Route>
        </Routes>
      </BrowserRouter>
  </>


  )
}
export default App
