import "./PublishedList.css";
import { useLoading } from "../Loader/Loader";
import { useEffect, useState } from "react";
import { getDailyBalance } from "../../api/AdminRequest";
import PublishedListItem from "./components/PublishedListItem";
import socket from "../../socket.io/socket";
import { formatArrayData } from "../../utils/format";
import logger from "../../utils/logger";

function PublishedList({
  refresh = null,
  setIsResumeTrading = null,
  isPublishedList = true,
}) {
  // useStates
  const { loaderWrapper } = useLoading()
  const [publishedList, setPublishedList] = useState([]);

  // useEffects
  useEffect(() => {
    const controller = new AbortController();
    const signal = { signal: controller.signal };
    fetchPublishedList(signal);
  }, []);

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = { signal: controller.signal };
  //   if (refresh) {
  //     fetchPublishedList(signal);
  //   }
  // }, [refresh]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = { signal: controller.signal };
    socket.on("/published-list/update", () => {
      fetchPublishedList(signal);
    });
  }, [socket]);

  // functions
  async function fetchPublishedList(signal = null) {
    const dailyBalances = await loaderWrapper(getDailyBalance(signal));
    if (dailyBalances.success) {
      const formattedData = formatArrayData(dailyBalances.data);
      setPublishedList(formattedData);
    }
  }

  (function checkIsResumeTrading() {
    if (!isPublishedList) return;
    let found_Y = false;
    for (let item of publishedList) {
      if (item.status === "Y") {
        found_Y = true;
        break;
      }
    }
    !isPublishedList && setIsResumeTrading(found_Y === false);
  })();
  let index = 0;
  return (
    <div className="published-list-container">
      <>
        <div
          className={
            isPublishedList ? "published-list-row head" : "client-list-row head"
          }
        >
          {!isPublishedList && (
            <div className="published-list-cell fixed">Sr. no</div>
          )}
          {isPublishedList && (
            <div className="published-list-cell fixed">T.no</div>
          )}
          {isPublishedList && (
            <div className="published-list-cell">Tender Date</div>
          )}
          <div className="published-list-cell">Mill name</div>
          <div className="published-list-cell">Item name</div>
          {isPublishedList && (
            <div className="published-list-cell">Payment to</div>
          )}
          {isPublishedList && (
            <div className="published-list-cell">Do name</div>
          )}
          <div className="published-list-cell">Season</div>
          <div className="published-list-cell">Grade</div>
          <div className="published-list-cell">Unit</div>
          {isPublishedList && <div className="published-list-cell">Qty</div>}
          <div className="published-list-cell">Lifting Date</div>
          {isPublishedList && (
            <div className="published-list-cell">Purchase Rate</div>
          )}
          {isPublishedList && (
            <div className="published-list-cell">Mill Rate</div>
          )}
          <div className="published-list-cell">Sale Rate</div>
          {isPublishedList && (
            <div className="published-list-cell">Publish Quantal</div>
          )}
          {isPublishedList && <div className="published-list-cell">Sold</div>}
          <div className="published-list-cell">Balance</div>
          <div className="published-list-cell">Actions</div>
        </div>

        {publishedList.map((item) => {
          if (isPublishedList === false && item.status === "N") {
            return;
          }
          return (
            <PublishedListItem
              key={index}
              index={index++}
              publishedItemData={item}
              isPublishedList={isPublishedList}
              socket={socket}
            />
          );
        })}
      </>
    </div>
  );
}

export default PublishedList;
