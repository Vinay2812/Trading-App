import { useEffect, useState } from "react"
import "./Auth.css"

import Login from "../../components/Login/Login"
import Register from "../../components/Register/Register"
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../hooks/useAdmin";
import {useUser} from "../../hooks/useUser"

function Auth() {
  const [registerPage, setRegisterPage] = useState(false);
  const { loading } = useSelector(state => state.authReducer)
  
  const admin = useAdmin();
  const user = useUser();

  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      navigate("/home");
      return;
    }

    if(admin){
      navigate("/admin");
    }
  }, [user, admin])
  return (
    <div className="auth">
      {
        loading ? <Loader /> : registerPage ? <Register setRegisterPage={setRegisterPage} /> : <Login setRegisterPage={setRegisterPage} />
      }
    </div>
  )
}

export default Auth
