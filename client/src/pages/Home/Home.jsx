import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser'

function Home() {
  const user = useUser();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
      navigate("/auth");
    }
  },[user])
  return (
    <div>Home</div>
  )
}

export default Home