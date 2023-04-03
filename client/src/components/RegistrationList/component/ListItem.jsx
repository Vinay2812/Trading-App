import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../api/AdminRequest";
import { setAdminTab } from "../../../redux/actions/adminActions";
import { useLoading } from "../../Loader/Loader";
import logger from "../../../utils/logger";

function ListItem({ data, fetchUsers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loaderWrapper } = useLoading();

  async function handleAdd() {
    const response = await loaderWrapper(addUser(data.userId));
    if (response.success) {
      fetchUsers();
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
