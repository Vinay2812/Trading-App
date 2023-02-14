import "./Admin.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { useEffect } from "react";
import { useAdmin } from "../../hooks/useAdmin";
import { useNavigate } from "react-router-dom";

function Admin() {
  // check if admin is logged in
  const admin = useAdmin();


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
