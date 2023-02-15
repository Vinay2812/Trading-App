import { useState, useEffect } from "react";
import "./RegistrationList.css";
import { addUser, getUsers, updateAuthorization } from "../../api/AdminRequest";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminTab } from "../../redux/actions/adminActions";

function ListItem({ data, fetchUsers }) {
    // const [authorized, setAuthorized] = useState(data.authorized === 1)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleAdd(){
      const res = await addUser(data.userId);
      console.log(res.data);
      await fetchUsers();
    }

    function handleMap(){
      dispatch(setAdminTab(6))
      navigate(`/admin/map/${data.userId}`);

    }

  return (
    <div className="list-row">
      <div className="list-row-item">{data.userId}</div>
      <div className="list-row-item">{data.company_name}</div>
      <div className="list-row-item">{data.email}</div>
      <div className="list-row-item">{data.mobile}</div>
      <div className="list-row-item btns">
       <button className="add" onClick={handleAdd}>Add</button>
       <button className="map" onClick={handleMap}>Map</button>
      </div>
    </div>
  );
}

function RegistrationList() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (err) {}
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
      {users.filter((userData) => userData.accoid == null).map((userData, index) => {
        return (
          <ListItem
            data={userData}
            fetchUsers = {fetchUsers}
            key={index}
          />
        );
      })}
    </div>
  );
}

export default RegistrationList;
