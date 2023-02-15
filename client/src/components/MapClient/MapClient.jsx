import "./MapClient.css"
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function MapClient() {
  // react hooks
  const params = useParams();

  // variables
  const userId = params.id;
  const [userData, setUserData] = useState({
    userId:"", company_name: "", gst: "", address: "", state: "", district: "" 
  })
  // useEffects
  useEffect(()=>{

  }, [userId])
  // functions
  

  return (
   <div className="page">
      <AdminNavbar />
      <div className="map-container">
        <h1 className="map-title">Map Client</h1>
        <div className="user-data-container">
          <div>
            <label htmlFor="">Client Id:</label>
            <span>{userData.userId}</span>
          </div>
          <div>
            <label htmlFor="">Client Name:</label>
            <span>{userData.company_name}</span>
          </div>
          <div>
            <label htmlFor="">Gst No: </label>
            <span>{userData.gst.length ? userData.gst : "NA"}</span>
          </div>
          <div>
            <label htmlFor="">Address:</label>
            <span>{userData.address}</span>
          </div>
          <div>
            <label htmlFor="">State:</label>
            <span>{userData.state}</span>
          </div>
          <div>
            <label htmlFor="">District:</label>
            <span>{userData.district}</span>
          </div>
        </div>
        <div className="vl"></div>
        <div className="user-data-container">
          <div>
            <label htmlFor="">Account Info:</label>
            <select defaultValue="none">
              <option value="none" hidden={true}>--Select--</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Ac_Code:</label>
            <span></span>
          </div>
          <div>
            <label htmlFor="">Address:</label>
            <span></span>
          </div>
          <div>
            <label htmlFor="">Gst No: </label>
            <span></span>
          </div>
          <div className="map-btns">
            <button className="cancel">Cancel</button>
            <button className="save">Map Client</button>
          </div>
        </div>
      </div>
   </div>
  )
}

export default MapClient