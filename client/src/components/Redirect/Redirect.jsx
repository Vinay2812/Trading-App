import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logger from "../../utils/logger";
import Loader from "../Loader/Loader";

function Redirect({ children }) {
  const admin = useSelector((state) => state.adminReducer?.adminData?.admin);
  const user = useSelector((state) => state.authReducer?.authData?.userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (!admin && !user) {
      navigate("/auth");
      setLoading(false);
      return;
    }
    if (admin) {
      navigate("/admin");
      setLoading(false);
      return;
    }

    if (user.password == null) {
        logger.log("No user password found")
      navigate(`/register/${user.userId}`);
      setLoading(false);
      return;
    }
    if (user.accoid == null) {
        logger.log("No accoid")
      navigate("/home/no-authorization");
      setLoading(false);
      return;
    }
    navigate("/home");
    setLoading(false);
  }, [user, admin]);
  return <>
  {loading ? <Loader /> : ""}
  {children}
  </>;
}

export default Redirect;
