import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { login, updateAccoid } from "../../redux/actions/authActions";
import socket from "../../socket.io/socket";
import logger from "../../utils/logger";

function NoAuthorization() {
  const style = {
    display: "flex",
    height: "60vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("/client/update-authorization", (accoid) => {
      logger.log(accoid);
      dispatch(updateAccoid({ accoid }));
      navigate("/home");
    });
  }, [socket]);
  return (
    <>
      <Navbar />
      <div className="page">
        <div style={style}>
          <h1 style={{ fontSize: "50px", color: "tomato" }}>402 Response</h1>
          <h2>You are not authorized by admin</h2>
          <h2>Please contact admin</h2>
        </div>
      </div>
    </>
  );
}

export default NoAuthorization;
