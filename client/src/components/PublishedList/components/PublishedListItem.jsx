import convertDate from "../../../utils/convertDate"
import convertUnit from "../../../utils/convertUnit"
import { FaEdit, BsPauseCircle, BsFillPlayFill } from "react-icons/all"
import { useState } from "react";
import { stopSingleTrade, startSingleTrade } from "../../../api/AdminRequest";

function PublishedListItem({ publishedItemData }) {

  // useStates
  const [listItemData, setListItemData] = useState(publishedItemData)
  // functions

  async function handleTradeBtnClick() {
    try {
      if(listItemData.status === 'Y'){
        const res = await stopSingleTrade({tenderid: listItemData.tenderid});
        if(res.status === 200){
          setListItemData(prev => ({...prev, status: 'N'}))
          alert(listItemData.tender_no + " Trade Stopped")
        }
      }
      else{
        const res = await startSingleTrade({tenderid: listItemData.tenderid});
        if(res.status === 200){
          setListItemData(prev => ({...prev, status: 'Y'}))
          alert(listItemData.tender_no + " Trade Started")
        }
      }
    } catch (err) {
      alert("Something went wrong")
    }
  }

  return (
    <div className="published-list-row">
      <div className="published-list-cell">{listItemData.tender_no}</div>
      <div className="published-list-cell">{convertDate(listItemData.tender_date)}</div>
      <div className="published-list-cell">{listItemData.millshortname}</div>
      <div className="published-list-cell">{listItemData.itemname}</div>
      <div className="published-list-cell">
        {listItemData.paymenttoshortname}
      </div>
      <div className="published-list-cell">
        {listItemData.tenderdoshortname}
      </div>
      <div className="published-list-cell">{listItemData.season}</div>
      <div className="published-list-cell">{listItemData.grade}</div>
      <div className="published-list-cell">{convertUnit(listItemData.unit)}</div>
      <div className="published-list-cell">{listItemData.qty}</div>
      <div className="published-list-cell">{convertDate(listItemData.lifting_date)}</div>
      <div className="published-list-cell">{listItemData.purc_rate}</div>
      <div className="published-list-cell">{listItemData.mill_rate}</div>
      <div className="published-list-cell">{listItemData.sale_rate}</div>
      <div className="published-list-cell">{listItemData.published_qty}</div>
      <div className="published-list-cell">{listItemData.sold}</div>
      <div className="published-list-cell">{listItemData.balance}</div>
      <div className="published-list-cell btns-container">
        <div className="edit">
         <FaEdit/>
         <span>Modify</span>
        </div>
        <div className={`${listItemData.status === 'Y'? "stop" : "start"}`} onClick={handleTradeBtnClick}>
         {listItemData.status === 'Y' ? <BsPauseCircle /> : <BsFillPlayFill/>}
         <span>{listItemData.status === 'Y' ? "Stop" : "Start"}</span>
        </div>
      </div>
    </div>
  );
}

export default PublishedListItem;
