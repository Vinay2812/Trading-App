import { FiLogOut } from "react-icons/all";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/logout";

function Navbar() {
  // hooks
  const navigate = useNavigate();

  // redux
  const user = useSelector((state) => state.authReducer?.authData?.userData);

  // functions
  function handleLogout() {
    logout();
  }

  function toHome() {
    navigate("/home");
  }
  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={toHome}>
        LATA INFOTECH
      </div>
      <div className="navbar-items"></div>
      <div className="navbar-btns">
        <button onClick={handleLogout}>
          {" "}
          <FiLogOut /> {user?.email.split("@")[0]}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
