import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PublishedList from '../../components/PublishedList/PublishedList';

function Home() {
  // hooks
  const navigate = useNavigate();

  // redux
  const user = useSelector((state) => state.authReducer?.authData);

  // useEffect
  useEffect(()=>{
    if(!(user?.userData) || !user){
      navigate("/auth");
      return;
    }

    if(!(user?.userData?.password)){
      navigate(`/register/${user?.userData?.userId}`)
      return;
    }

    if(!(user?.userData?.accoid)){
      navigate("/home/no-authorozation")
      return;
    }
  },[user])
  return (
    <>
      <Navbar />
      <div className="page">
        <PublishedList isPublishedList={false}/>
      </div>
    </>
  )
}

export default Home