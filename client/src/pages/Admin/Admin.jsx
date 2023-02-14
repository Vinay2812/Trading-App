import "./Admin.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Admin() {
  // check if admin is logged in
  const admin = useSelector((state) => state.adminReducer?.adminData?.admin)

  const navigate = useNavigate();
  useEffect(()=>{
    if(!admin){
      navigate("/auth")
    }
  }, [admin])


  return (
    <div className="page">
      <AdminNavbar />
    </div>
  );
}

export default Admin;
