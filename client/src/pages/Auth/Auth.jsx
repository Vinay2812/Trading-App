import { useState } from "react"
import "./Auth.css"
import Login from "../../components/Login/Login"
import Register from "../../components/Register/Register"
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";



function Auth() {
  const [registerPage, setRegisterPage] = useState(false);
  const { loading } = useSelector(state => state.authReducer)
  
  return (
    <div className="auth">
      {
        registerPage ? <Register setRegisterPage={setRegisterPage} /> : <Login setRegisterPage={setRegisterPage} />
      }
    </div>
  )
}

export default Auth
