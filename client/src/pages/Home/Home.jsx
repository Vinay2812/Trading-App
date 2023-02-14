import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const user = useSelector((state) => state.authReducer?.authData);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!(user?.userData)){
      navigate("/auth");
      return;
    }

    if(!(user?.userData?.password)){
      navigate(`/register/${user?.userData?.userId}`)
    }
  },[user])
  return (
    <div>Home</div>
  )
}

export default Home