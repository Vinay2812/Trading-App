import "./PublishedList.css";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { getQryTrDailyBalance } from "../../api/AdminRequest";
import PublishedListItem from "./components/PublishedListItem";

function PublishedList({ refresh, setIsResumeTrading }) {
  // useStates
  const [loading, setLoading] = useState(false);
  const [publishedList, setPublishedList] = useState([]);

  // useEffects
  useEffect(() => {
    const controller = new AbortController();
    const signal = { signal: controller.signal };
    fetchPublishedList(signal).catch((err) => setLoading(false));
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const signal = { signal: controller.signal };
    if (refresh) {
      fetchPublishedList(signal).catch((err) => setLoading(false));
    }
  }, [refresh]);

  // functions
  async function fetchPublishedList(signal = null) {
    setLoading(true);
    const res = await getQryTrDailyBalance();
    if (res.status === 200) {
      setPublishedList(res.data);
      setLoading(false);
    }
  }

  (function checkIsResumeTrading() {
    let found_Y = false;
    for (let item of publishedList) {
      if (item.status === "Y") {
        found_Y = true;
        break;
      }
    }
    setIsResumeTrading(found_Y === false);
  })();
  return (
    <div className="published-list-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="published-list-row head">
            <div className="published-list-cell">T.no</div>
            <div className="published-list-cell">Tender Date</div>
            <div className="published-list-cell">Mill name</div>
            <div className="published-list-cell">Item name</div>
            <div className="published-list-cell">Payment to</div>
            <div className="published-list-cell">Do name</div>
            <div className="published-list-cell">Season</div>
            <div className="published-list-cell">Grade</div>
            <div className="published-list-cell">Unit</div>
            <div className="published-list-cell">Qty</div>
            <div className="published-list-cell">Lifting Date</div>
            <div className="published-list-cell">Purchase Rate</div>
            <div className="published-list-cell">Mill Rate</div>
            <div className="published-list-cell">Sale Rate</div>
            <div className="published-list-cell">Publish Quantal</div>
            <div className="published-list-cell">Sold</div>
            <div className="published-list-cell">Balance</div>
            <div className="published-list-cell">Actions</div>
          </div>
          {publishedList.map((item, index) => {
            return (
              <PublishedListItem
                key={index}
                publishedItemData={item}
                setIsResumeTrading={setIsResumeTrading}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default PublishedList;
