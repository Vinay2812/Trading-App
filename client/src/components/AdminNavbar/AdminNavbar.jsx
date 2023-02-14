
import { useDispatch } from "react-redux";
import "./AdminNavbar.css";
import { adminLogout } from "../../redux/actions/adminActions";
import { FiLogOut } from "react-icons/all"
import { setAdminActiveTab, useAdminActiveTab } from "../../hooks/activeAdminTab";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const dispatch = useDispatch();
  const active = useAdminActiveTab();
  const navigate = useNavigate();

  useEffect(() => {
      switch (active){
        case 0: 
          navigate("/admin")
          break;
        case 1:
          navigate("/admin/registration-list")
          break;
        default:
          navigate("/admin");
          return
      }
  }, [active])
  function handleLogout(){
    dispatch(adminLogout());
  }
  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => setAdminActiveTab(0, dispatch)}>LATA INFOTECH</div>
      <div className="navbar-items">
        <div onClick={() => setAdminActiveTab(1, dispatch)} className={active === 1? "active" : ""}>Registration list</div>
        <div onClick={() => setAdminActiveTab(2, dispatch)} className={active === 2? "active" : ""}>Sales</div>
        <div onClick={() => setAdminActiveTab(3, dispatch)} className={active === 3? "active" : ""}>User Management</div>
        <div onClick={() => setAdminActiveTab(4, dispatch)} className={active === 4? "active" : ""}>Reports</div>
      </div>
      <div className="navbar-btns">
        <button onClick={handleLogout}> <FiLogOut /> Admin  </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
