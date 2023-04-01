import "./Admin.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PublishList from "../../components/PublishList/PublishList";
import {
  TfiReload,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
} from "react-icons/all";
import PublishedList from "../../components/PublishedList/PublishedList";
import { updateAllSaleRate, updateAllTrade } from "../../api/AdminRequest";
import socket from "../../socket.io/socket";
import logger from "../../utils/logger";
import Loader from "../../components/Loader/Loader";

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

  async function handleAllTradingStatus(){
    const response = await updateAllTrade({status: isResumeTrading? "Y" : "N"})
    if(response.success){
      handleRefreshPublishedList();
      socket.connected && socket.emit("update_client_list", "Req received - start updating client list")
      setIsResumeTrading(prev => !prev);
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
      if (res.success) {
        handleRefreshPublishedList();
        socket.connected && socket.emit("update_client_list", "Req received - start updating client list")
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
              onClick={() => handleAllTradingStatus()}
            >
              {isResumeTrading ? "Resume Trading" : "Stop Trading"}
            </button>
            <button className="publishedListBtn order">Order Book</button>
          </div>
        )}
      </div>
      <div className="page-container">
        {activeTab === 0 && (
          <Suspense fallback={<Loader />}>
          <PublishList
            refresh={refreshPublishList}
            setRefresh={setRefreshPublishList}
          />
          </Suspense>
        )}
        {activeTab === 1 && (
          <PublishedList
            refresh={refreshPublishedList}
            setIsResumeTrading={setIsResumeTrading}
            isResumeTrading = {isResumeTrading}
          />
        )}
        {activeTab === 2 && (
          <PublishedList
            isPublishedList={false}
          />
        )
        }
      </div>
    </div>
  );
}

export default Admin;
