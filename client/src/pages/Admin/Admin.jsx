import "./Admin.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PublishList from "../../components/PublishList/PublishList";
import {
  TfiReload,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/all";
import PublishedList from "../../components/PublishedList/PublishedList";
import { startAllTrade, stopAllTrade, updateAllSaleRate } from "../../api/AdminRequest";

function Admin() {
  // hooks
  const navigate = useNavigate();

  // useSelectors
  const admin = useSelector((state) => state.adminReducer?.adminData?.admin);

  // useStates
  const [activeTab, setActiveTab] = useState(0);
  const [refreshPublishList, setRefreshPublishList] = useState(false);
  const [refreshPublishedList, setRefreshPublishedList] = useState(false);
  const [saleRateChange, setSaleRateChange] = useState("");
  const [isResumeTrading, setIsResumeTrading] = useState(false);

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

  function handleRefreshPublishList() {
    setRefreshPublishList(true);
  }

  function handleRefreshPublishedList() {
    setRefreshPublishedList(true);
    setTimeout(() => {
      setRefreshPublishedList(false);
    }, 1000);
  }

  function handleSaleRateChange(e) {
    setSaleRateChange(e.target.value);
  }

  function handleIncreaseAllSaleRate() {
    let incVal = Math.abs(
      parseInt(saleRateChange.length ? saleRateChange : "0")
    );
    updateSaleRate(incVal);
    setSaleRateChange("");
  }

  function handleDecreaseAllSaleRate() {
    let decVal =
      -1 * Math.abs(parseInt(saleRateChange.length ? saleRateChange : "0"));
    updateSaleRate(decVal);
    setSaleRateChange("");
  }

  async function handleStopTrading() {
    try {
      const res = await stopAllTrade();
      if (res.status === 200) {
        handleRefreshPublishedList();
        alert("All trading stopped successfully");
      }
    } catch (err) {
      setRefreshPublishedList(false);
    }
  }

  async function handleResumeTrading() {
    try {
      const res = await startAllTrade();
      if (res.status === 200) {
        handleRefreshPublishedList();
        alert("All trading resumed successfully");
      }
    } catch (err) {
      setRefreshPublishedList(false);
    }
  }

  async function updateSaleRate(val) {
    if (val == 0) return;

    const quesRes = confirm(
      `Are you sure you want to ${
        val > 0 ? "increase" : "decrease"
      } all sale rate by ${Math.abs(val)} ?`
    );
    if (quesRes) {
      const res = await updateAllSaleRate({ sale_rate: val });
      if (res.status === 200) {
        handleRefreshPublishedList();
        setTimeout(() => {
          alert("Sale rate updated successfully");
        }, 500);
      }
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
        {activeTab === 0 && (
          <button className="refreshBtn" onClick={handleRefreshPublishList}>
            <TfiReload className="reload" /> {"Refresh"}
          </button>
        )}
        {activeTab === 1 && (
          <div className="publishedListBtns">
            <div className="inc-sale-rate">
              <AiOutlineArrowDown onClick={handleDecreaseAllSaleRate} />
              <input
                type="number"
                placeholder="+/- sale rate by"
                value={saleRateChange}
                onChange={handleSaleRateChange}
              />
              <AiOutlineArrowUp onClick={handleIncreaseAllSaleRate} />
            </div>
            <button
              className="publishedListBtn stop-all"
              onClick={() => isResumeTrading ? handleResumeTrading() : handleStopTrading()}
            >
              {isResumeTrading ? "Resume Trading" : "Stop Trading"}
            </button>
            <button className="publishedListBtn order">Order Book</button>
          </div>
        )}
      </div>
      <div className="page-container">
        {activeTab === 0 && (
          <PublishList
            refresh={refreshPublishList}
            setRefresh={setRefreshPublishList}
          />
        )}
        {activeTab === 1 && (
          <PublishedList
            refresh={refreshPublishedList}
            setIsResumeTrading={setIsResumeTrading}
            isResumeTrading = {isResumeTrading}
          />
        )}
      </div>
    </div>
  );
}

export default Admin;
