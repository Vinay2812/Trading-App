import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

function NoAuthorization() {
  const style = {
    display: "flex",
    height: "60vh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  }
  return (
    <>
      <Navbar />
      <div className='page'>
        <div style={style}>
          <h1 style={{fontSize: "50px", color: "tomato"}}>
            402 Response
          </h1>
          <h2>You are not authorized by admin</h2>
          <h2>
            Please contact admin
          </h2>
        </div>
      </div>
    </>
  )
}

export default NoAuthorization