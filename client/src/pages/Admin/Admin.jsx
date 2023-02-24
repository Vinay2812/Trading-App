import "./Admin.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PublishList from "../../components/PublishList/PublishList";
import { TfiReload } from "react-icons/all";
import PublishedList from "../../components/PublishedList/PublishedList";
import { stopAllTrade } from "../../api/AdminRequest";

function Admin() {
  // hooks
  const navigate = useNavigate();

  // useSelectors
  const admin = useSelector((state) => state.adminReducer?.adminData?.admin);

  // useStates
  const [activeTab, setActiveTab] = useState(0);
  const [refreshPublishList, setRefreshPublishList] = useState(false);
  const [refreshPublishedList, setRefreshPublishedList] = useState(false);

  //useEffects
  useEffect(() => {
    if (!admin) {
      navigate("/auth");
    }
  }, [admin]);

  // functions
  function handleTabClick(index) {
    setActiveTab(index);
  }

  function handleRefreshPublishList(){
    setRefreshPublishList(true);
  }
  async function handleStopTrading(){
    try {
      const res = await stopAllTrade();
      if(res.status === 200){
        setRefreshPublishedList(true);
        alert("All trading stopped successfully");
        setTimeout(() => {
          setRefreshPublishedList(false);
        }, 1000);
      }
    } catch (err) {
      setRefreshPublishedList(false);
    }
  }

  return (
    <div className="page">
      <AdminNavbar />
      <div className="page-tabs">
        <div
          className={`page-tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          Publish List
        </div>
        <div
          className={`page-tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
        >
          Published List
        </div>
        <div
          className={`page-tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
        >
          Client List
        </div>
        {
          activeTab === 0 &&
          <button className="refreshBtn" onClick={handleRefreshPublishList}>
              <TfiReload className="reload" /> {"Refresh"}
          </button>
        }
        {
          activeTab === 1 &&
          <div className="publishedListBtns">
            <button className="publishedListBtn" onClick={handleStopTrading}>
              Stop Trading
            </button>
            <button className="publishedListBtn">
              Order Book
            </button>
          </div>
        }
      </div>
      <div className="page-container">
        {activeTab === 0 && (
          <PublishList refresh={refreshPublishList} setRefresh={setRefreshPublishList} />
        )}
        {
          activeTab === 1 && (
            <PublishedList refresh={refreshPublishedList}/>
          )
        }
      </div>
    </div>
  );
}

export default Admin;
