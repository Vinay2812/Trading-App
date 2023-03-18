import convertDate from "../../../utils/convertDate";
import convertUnit from "../../../utils/convertUnit";
import { FaEdit, BsPauseCircle, BsFillPlayFill } from "react-icons/all";
import { useState } from "react";
import { stopSingleTrade, startSingleTrade } from "../../../api/AdminRequest";
import ModifyDialog from "./ModifyDialog";

function PublishedListItem({ index = null, publishedItemData, isPublishedList, socket }) {
  // useStates
  const [listItemData, setListItemData] = useState(publishedItemData);
  const [showModifyDialog, setShowModifyDialog] = useState(false);

  // functions
  async function handleTradeBtnClick() {
    try {
      if (listItemData.status === "Y") {
        const res = await stopSingleTrade({ tenderid: listItemData.tenderid });
        if (res.status === 200) {
          setListItemData((prev) => ({ ...prev, status: "N" }));
          alert(listItemData.tender_no + " Trade Stopped");
          socket.connected && socket.emit("update_client_list", "Req received - client list updation")
        }
      } else {
        const res = await startSingleTrade({ tenderid: listItemData.tenderid });
        if (res.status === 200) {
          setListItemData((prev) => ({ ...prev, status: "Y" }));
          alert(listItemData.tender_no + " Trade Started");
          socket.connected && socket.emit("update_client_list", "Req received - client list updation")
        }
      }
    } catch (err) {
      logger.error(err)
    }
  }

  return (
    <div className={isPublishedList ? "published-list-row" : "client-list-row"}>
      {!isPublishedList && <div className="published-list-cell">{index + 1}</div>}
      {isPublishedList && <div className="published-list-cell">{listItemData.tender_no}</div>}
      {isPublishedList && <div className="published-list-cell">
        {convertDate(listItemData.tender_date)}
      </div>}
      <div className="published-list-cell">{listItemData.millshortname}</div>
      <div className="published-list-cell">{listItemData.itemname}</div>
      {isPublishedList && <div className="published-list-cell">
        {listItemData.paymenttoshortname}
      </div>}
      {isPublishedList && <div className="published-list-cell">
        {listItemData.tenderdoshortname}
      </div>}
      <div className="published-list-cell">{listItemData.season}</div>
      <div className="published-list-cell">{listItemData.grade}</div>
      <div className="published-list-cell">
        {convertUnit(listItemData.unit)}
      </div>
      {isPublishedList && <div className="published-list-cell">{listItemData.qty}</div>}
      <div className="published-list-cell">
        {convertDate(listItemData.lifting_date)}
      </div>
      {isPublishedList && <div className="published-list-cell">{listItemData.purc_rate}</div>}
      {isPublishedList && <div className="published-list-cell">{listItemData.mill_rate}</div>}
      <div className="published-list-cell">{listItemData.sale_rate}</div>
      {isPublishedList && <div className="published-list-cell">{listItemData.published_qty}</div>}
      {isPublishedList && <div className="published-list-cell">{listItemData.sold}</div>}
      <div className="published-list-cell">{listItemData.balance}</div>
      <div className="published-list-cell btns-container">
        {
          isPublishedList ?
          <>
            <div className="edit" onClick={() => setShowModifyDialog(true)}>
              <FaEdit />
              <span>Modify</span>
            </div>
            <div
              className={`${listItemData.status === "Y" ? "stop" : "start"}`}
              onClick={handleTradeBtnClick}
            >
              {listItemData.status === "Y" ? <BsPauseCircle /> : <BsFillPlayFill />}
              <span>{listItemData.status === "Y" ? "Stop" : "Start"}</span>
            </div>
          </>
          : <button className="buy">Buy</button>
        }
      </div>
      {showModifyDialog && (
        <ModifyDialog
          dialogData={listItemData}
          setShowModifyDialog={setShowModifyDialog}
          setListItemData = {setListItemData}
          socket = {socket}
        />
      )}
    </div>
  );
}

export default PublishedListItem;
