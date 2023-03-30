import { useState, useEffect } from "react";
import "./RegistrationList.css";
import { getRegistrationListUsers } from "../../api/AdminRequest";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import ListItem from "./component/ListItem";
import logger from "../../utils/logger";

function RegistrationList() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data } = await getRegistrationListUsers();
      setUsers(data);
    } catch (err) {
      logger.error(err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [window.onload]);

  return (
    <div className="page">
      <AdminNavbar />
      <div className="list-row column-names">
        <div className="list-row-item">User Id</div>
        <div className="list-row-item">Company name</div>
        <div className="list-row-item">Email</div>
        <div className="list-row-item">Mobile</div>
        <div className="list-row-item">Action</div>
      </div>
      {users
        .filter((userData) => userData.accoid == null)
        .map((userData, index) => {
          return (
            <ListItem data={userData} fetchUsers={fetchUsers} key={index} />
          );
        })}
    </div>
  );
}

export default RegistrationList;
