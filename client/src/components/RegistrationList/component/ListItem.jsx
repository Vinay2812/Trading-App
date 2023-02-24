import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../api/AdminRequest";
import { setAdminTab } from "../../../redux/actions/adminActions";

function ListItem({ data, fetchUsers }) {
  // const [authorized, setAuthorized] = useState(data.authorized === 1)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleAdd() {
    try {
      const res = await addUser(data.userId);
      if (res.status === 200) await fetchUsers();
    } catch (err) {
      alert("Failed");
    }
  }
  function handleMap() {
    dispatch(setAdminTab(6));
    navigate(`/admin/map/${data.userId}`);
  }

  return (
    <div className="list-row">
      <div className="list-row-item">{data.userId}</div>
      <div className="list-row-item">{data.company_name}</div>
      <div className="list-row-item">{data.email}</div>
      <div className="list-row-item">{data.mobile}</div>
      <div className="list-row-item btns">
        <button className="add" onClick={handleAdd}>
          Add
        </button>
        <button className="map" onClick={handleMap}>
          Map
        </button>
      </div>
    </div>
  );
}
export default ListItem;
