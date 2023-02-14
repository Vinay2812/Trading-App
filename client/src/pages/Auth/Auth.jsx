import { useState } from "react"
import "./Auth.css"

import Login from "../../components/Login/Login"
import Register from "../../components/Register/Register"

function Auth() {
  const [registerPage, setRegisterPage] = useState(false);
  return (
    <div className="auth">
      {
        registerPage ? <Register setRegisterPage = {setRegisterPage}/> : <Login setRegisterPage = {setRegisterPage}/>
      }
    </div>
  )
}

export default Auth
