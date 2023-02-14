import './App.css'
import { Routes, Route } from 'react-router-dom'
import Auth from "./pages/Auth/Auth"
import Password from './components/Password/Password'
import Admin from './pages/Admin/Admin'
import { useSelector } from 'react-redux'
import Home from './pages/Home/Home'
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
 
function App() {
  const user = useSelector((state) => state.authReducer?.authData?.userData)
  const admin = useSelector((state) => state.adminReducer?.adminData?.admin);
  const navigate = useNavigate();
  useEffect(()=>{
    if(admin){
      navigate("/admin");
      return;
    }
    if(!user){
      navigate("/auth");
      return;
    }

    if(user.password === null){
      navigate(`/register/${user.userId}`);
      return;
    }

    navigate("/home");
  }, [user, admin])
  return (
    <div className="App">
      <Routes>
        <Route path='/auth' element={<Auth />}/>
        <Route path="/home" element = {<Home />} />
        <Route path='/register/:userId' element={<Password />}/>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App
