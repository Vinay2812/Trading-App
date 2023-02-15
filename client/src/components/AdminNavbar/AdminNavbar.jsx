
import { useDispatch, useSelector } from "react-redux";
import { adminLogout, setAdminTab } from "../../redux/actions/adminActions";
import { FiLogOut } from "react-icons/all"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const dispatch = useDispatch();
  const active = useSelector(state => state.adminReducer?.activeTab)
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
          return
      }
  }, [active])

  function handleLogout(){
    dispatch(adminLogout());
  }

  function setAdminActiveTab(tab){
    dispatch(setAdminTab(tab));
  }
  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => setAdminActiveTab(0)}>LATA INFOTECH</div>
      <div className="navbar-items">
        <div onClick={() => setAdminActiveTab(1)} className={active === 1? "active" : ""}>Registration list</div>
        <div onClick={() => setAdminActiveTab(2)} className={active === 2? "active" : ""}>Sales</div>
        <div onClick={() => setAdminActiveTab(3)} className={active === 3? "active" : ""}>User Management</div>
        <div onClick={() => setAdminActiveTab(4)} className={active === 4? "active" : ""}>Reports</div>
      </div>
      <div className="navbar-btns">
        <button onClick={handleLogout}> <FiLogOut /> Admin  </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
