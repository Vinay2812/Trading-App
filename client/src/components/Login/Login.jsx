import { useState, useEffect } from "react";
import "./Login.css";
import {
  AiFillLock,
  IoCall,
  RiLockPasswordFill,
  HiOutlineOfficeBuilding,
  BiUserCircle,
} from "react-icons/all";
import { getComapanies, getUser, resendOTP } from "../../api/AuthRequest";
import { adminLogin } from "../../redux/actions/adminActions";
import { login } from "../../redux/actions/authActions"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"

function Login({ setRegisterPage }) {
  const INITIAL_LOGIN_DATA = {
    username: "",
    mobile: "",
    company_name: "",
    password: "",
  };

  const [loginData, setLoginData] = useState(INITIAL_LOGIN_DATA);
  const [companies, setCompanies] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setLoginData(INITIAL_LOGIN_DATA);
  }, [isAdmin]);

  useEffect(() => {
    async function fetchCompanies() {
      const modifiedMobile = loginData.mobile.substring(
        loginData.mobile.length - 10,
        loginData.mobile.length
      );
      try {
        const { data } = await getComapanies(modifiedMobile);
        setCompanies(() => {
          let modifiedCompanies = data.map((obj) => obj.company_name);
          modifiedCompanies.sort();
          return modifiedCompanies;
        });
      } catch (err) {}
    }
    if (loginData.mobile.length >= 10) {
      fetchCompanies();
    } else {
      setCompanies([]);
    }
  }, [loginData.mobile]);

  function handleChange(e) {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCheckBoxChange(e) {
    setIsAdmin((prev) => !prev);
  }

  async function handleLogin() {
    if (isAdmin) {
      dispatch(adminLogin(loginData));
    } else {
      dispatch(login({...loginData, mobile: loginData.mobile.substring(loginData.mobile.length - 10, loginData.mobile.length)}));
    }
  }

  async function handleForgotPassword() {
    if (loginData.mobile < 10) {
      alert("Invalid mobile number");
      return;
    }

    if (!loginData.company_name.length) {
      alert("Please select the company name");
      return;
    }

    try {
      const {data} = await getUser(loginData);
      if(data?.userId){
        await resendOTP({userId: data.userId});
        navigate(`/register/${res.data.userId}`);
      }
    } catch (err) {}
  }
  return (
    <div className="login-container">
      <div className="login-title">
        <div className="logo">
          <AiFillLock />
        </div>
        <div className="text">Sign in</div>
      </div>
      <div className="input">
        {isAdmin ? <BiUserCircle /> : <IoCall />}
        <input
          type="text"
          placeholder={isAdmin ? "Username *" : "Mobile Number *"}
          name={isAdmin ? "username" : "mobile"}
          onChange={handleChange}
          value={isAdmin ? loginData.username : loginData.mobile}
        />
      </div>
      {!isAdmin && (
        <div className="input">
          <HiOutlineOfficeBuilding />
          <select
            disabled={companies.length === 0}
            name="company_name"
            onChange={handleChange}
            defaultValue="none"
          >
            <option value="none" hidden={true}></option>
            {companies.map((company, index) => {
              return <option value={company} key={index}>{company}</option>;
            })}
          </select>
        </div>
      )}

      <div className="input">
        <RiLockPasswordFill />
        <input
          type="password"
          placeholder="Password *"
          name="password"
          onChange={handleChange}
          value={loginData.password}
        />
      </div>
      <div className="checkbox-container">
        <input
          type="checkbox"
          name="admin"
          className="checkbox"
          checked={isAdmin === true}
          onChange={handleCheckBoxChange}
        />
        <label htmlFor="admin">Sign in as admin</label>
      </div>
      <button className="save" onClick={handleLogin}>
        SIGN IN
      </button>
      <div className="links">
        <p onClick={handleForgotPassword}>Forgot password</p>
        <p onClick={() => setRegisterPage(true)}>
          Don't have an account? Signup
        </p>
      </div>
    </div>
  );
}

export default Login;
