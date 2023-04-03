import { useState, useEffect } from "react";
import "./RegistrationList.css";
import { getRegistrationListUsers } from "../../api/AdminRequest";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import ListItem from "./component/ListItem";
import { useLoading } from "../Loader/Loader";
import logger from "../../utils/logger";

function RegistrationList() {
  const { loaderWrapper } = useLoading();
  const [users, setUsers] = useState([]);

  async function fetchUsers(signal) {
    const response = await loaderWrapper(getRegistrationListUsers(signal));
    if (response.success) {
      setUsers(response.data);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = { signal: controller.signal };
    fetchUsers(signal);
    return () => {
      controller.abort();
    };
  }, []);

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
