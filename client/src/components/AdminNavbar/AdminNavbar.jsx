
import { useDispatch } from "react-redux";
import "./AdminNavbar.css";
import { adminLogout } from "../../redux/actions/adminActions";

function AdminNavbar({active, setActive}) {
  const dispatch = useDispatch();
  function handleLogout(){
    dispatch(adminLogout());
  }
  return (
    <div className="navbar">
      <div className="navbar-logo">LATA INFOTECH</div>
      <div className="navbar-items">
        <div onClick={() => setActive(1)} className={active === 1? "active" : ""}>Registration list</div>
        <div onClick={() => setActive(2)} className={active === 2? "active" : ""}>Sales</div>
        <div onClick={() => setActive(3)} className={active === 3? "active" : ""}>User Management</div>
        <div onClick={() => setActive(4)} className={active === 4? "active" : ""}>Reports</div>
      </div>
      <div className="navbar-btns">
        <button> ADMIN </button>
        <button onClick={handleLogout}> LOGOUT </button>
      </div>
    </div>
  );
}

export default AdminNavbar;
