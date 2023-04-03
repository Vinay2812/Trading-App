import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../../socket.io/socket";

function Redirect({ children }) {
  const admin = useSelector((state) => state.adminReducer?.adminData?.admin);
  const user = useSelector((state) => state.authReducer?.authData?.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!admin && !user) {
      navigate("/auth");
      return;
    }
    if (admin) {
      navigate("/admin");
      return;
    }

    if (user.password == null) {
      navigate(`/register/${user.userId}`);
      return;
    }
    if (user.accoid == null) {
      navigate("/home/no-authorization");
      return;
    }
    navigate("/home");
  }, [user, admin]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("add_user", user?.userId || "admin")
    })
  }, [socket])
  return <>{children}</>;
}

export default Redirect;
