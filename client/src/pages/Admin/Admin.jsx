import "./Admin.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { useState } from "react";
import RegistrationList from "../../components/RegistrationList/RegistrationList";

function Admin() {
  const [active, setActive] = useState(1);
  return (
    <div className="page">
      <AdminNavbar active={active} setActive={setActive} />
      {active === 1 && <RegistrationList />}
    </div>
  );
}

export default Admin;
