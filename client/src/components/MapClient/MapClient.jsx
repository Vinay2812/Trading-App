import "./MapClient.css";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllCompanyNames,
  getCompanyUserDataById,
  getUserDataFromNt1AccountMaster,
} from "../../api/UserRequest";
import { useLoading } from "../Loader/Loader";
import { mapClient } from "../../api/AdminRequest";
import logger from "../../utils/logger";
import socket from "../../socket.io/socket";

function MapClient() {
  // react hooks
  const params = useParams();
  const navigate = useNavigate();
  const { loaderWrapper } = useLoading();
  // variables
  const userId = params.id;
  // useStates
  const [userData, setUserData] = useState({
    userId: "",
    company_name: "",
    gst: "",
    address: "",
    state: "",
    district: "",
  });
  const [accountDropdown, setAccountDropdown] = useState([]);
  const [accountData, setAccountData] = useState({
    accoid: "",
    Ac_Name_E: "none",
    Ac_Code: "NA",
    Address_E: "NA",
    Gst_No: "NA",
  });

  // useEffects
  useEffect(() => {
    const controller = new AbortController();
    const signal = { signal: controller.signal };

    fetchInitialClientData(userId, signal);

    return () => {
      controller.abort();
      console.log("Fetch client data aborted");
    };
  }, [userId]);

  // functions
  async function fetchInitialClientData(userId, signal) {
    try {
      const [res1, res2] = await loaderWrapper(Promise.all([
        getCompanyUserDataById(userId, signal),
        getAllCompanyNames(signal),
      ]));
      const clientData = res1.data;
      const accountData = res2.data;
      setUserData(clientData);
      setAccountDropdown(accountData);
    } catch (err) {}
  }

  async function handleDropDownChange(e) {
    const accoid = e.target.value;
    try {
      const res = await loaderWrapper(getUserDataFromNt1AccountMaster(accoid));
      setAccountData(res.data);
    } catch (err) {
      logger.error(err);
    }
  }

  function handleCancelMap() {
    navigate("/admin/registration-list");
  }

  async function handleMapClient() {
    const userSelection = confirm("Are you sure?");
    if (userSelection) {
      try {
        const mapData = {
          userId,
          accoid: accountData.accoid,
        };
        await loaderWrapper(mapClient(mapData));
      } catch (err) {
        logger.log(err);
      }
      handleCancelMap();
    } else {
      document.querySelector("#cancel").focus();
    }
  }
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
            <select onChange={handleDropDownChange} value={accountData.accoid}>
              <option value="none" hidden={true}>
                --Select--
              </option>
              {accountDropdown.map((acc) => {
                return (
                  <option value={acc.accoid} key={acc.accoid}>
                    {acc.Ac_Name_E}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="">Ac_Code:</label>
            <span>{accountData.Ac_Code}</span>
          </div>
          <div>
            <label htmlFor="">Address:</label>
            <span>
              {accountData.Address_E?.length ? accountData.Address_E : "NA"}
            </span>
          </div>
          <div>
            <label htmlFor="">Gst No: </label>
            <span>{accountData.Gst_No.length ? accountData.Gst_No : "NA"}</span>
          </div>
          <div className="map-btns">
            <button className="cancel" onClick={handleCancelMap}>
              Cancel
            </button>
            <button className="save" id="cancel" onClick={handleMapClient}>
              Map Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapClient;
