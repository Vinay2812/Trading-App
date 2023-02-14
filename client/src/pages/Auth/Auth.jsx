import { useEffect, useState } from "react"
import "./Auth.css"

import Login from "../../components/Login/Login"
import Register from "../../components/Register/Register"
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";


function Auth() {
  const [registerPage, setRegisterPage] = useState(false);
  const { loading } = useSelector(state => state.authReducer)
  
  const admin = useSelector((state) => state.adminReducer?.adminData?.admin)
  const user = useSelector(state => state.authReducer?.authData?.userData);

  const navigate = useNavigate();

  useEffect(()=>{
    if(admin){
      navigate("/admin");
    }
  }, [admin])

  useEffect(()=>{
    if(user){
      navigate("/home");
    }
  }, [user])
  return (
    <div className="auth">
      {
        loading ? <Loader /> : registerPage ? <Register setRegisterPage={setRegisterPage} /> : <Login setRegisterPage={setRegisterPage} />
      }
    </div>
  )
}

export default Auth
