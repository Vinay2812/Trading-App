import { useEffect, useState } from "react";
import "./PublishList.css";
import { useLoading } from "../Loader/Loader";
import { getTenderBalances } from "../../api/AdminRequest";
import PublishListItem from "./components/PublishListItem";
import logger from "../../utils/logger";
import { formatArrayData } from "../../utils/format";

function PublishList({ isPublishList = true, refresh, setRefresh }) {
  const { loaderWrapper, setLoading } = useLoading();
  // useStates
  const [publishList, setPublishList] = useState([]);

  // useEffects
  useEffect(() => {
    const controller = new AbortController();
    const signal = { signal: controller.signal };

    if (refresh || isPublishList !== null) {
      fetchPublishList(signal);
      setRefresh(false);
    }

    return () => {
      setRefresh(false);
      setLoading(false);
      refresh && controller.abort();
    };
  }, [refresh, isPublishList]);

  // functions
  async function fetchPublishList(signal = null) {
    const tenderBalances = await loaderWrapper(getTenderBalances(signal));
    if (tenderBalances.success) {
      setPublishList((prev) => formatArrayData(tenderBalances.data));
    }
  }

  return (
    <div className="publish-list-container">
      <>
        <div className="publish-list-row head">
          <div className="publish-list-cell fixed">Tender no</div>
          <div className="publish-list-cell">Tender Date</div>
          <div className="publish-list-cell">Mill name</div>
          <div className="publish-list-cell">Item name</div>
          <div className="publish-list-cell">Payment to</div>
          <div className="publish-list-cell">Do name</div>
          <div className="publish-list-cell">Season</div>
          <div className="publish-list-cell">Grade</div>
          <div className="publish-list-cell">Unit</div>
          <div className="publish-list-cell">Qty</div>
          <div className="publish-list-cell">Lifting Date</div>
          <div className="publish-list-cell">Purchase Rate</div>
          <div className="publish-list-cell">Mill Rate</div>
          <div className="publish-list-cell">Sale Rate</div>
          <div className="publish-list-cell">Publish Quantal</div>
          <div className="publish-list-cell">Action</div>
        </div>
        {publishList.map((publishListItem, index) => {
          return (
            <PublishListItem key={index} publishListItem={publishListItem} />
          );
        })}
      </>
    </div>
  );
}

export default PublishList;
