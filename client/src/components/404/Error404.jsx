import React from "react";

function Error404() {
  const style = {
    display: "flex",
    height: "100vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };
  return (
    <div style={style}>
      <h1 style={{ fontSize: "50px", color: "tomato" }}>404 Response</h1>
      <h2>This page doesn't exist</h2>
      <h2>Please use valid url</h2>
    </div>
  );
}

export default Error404;
