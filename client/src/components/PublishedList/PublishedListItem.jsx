import convertDate from "../../utils/convertDate"
import convertUnit from "../../utils/convertUnit"
import { FaEdit, BsPauseCircle } from "react-icons/all"

function PublishedListItem({ listItemData }) {
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
        <div className="stop">
         <BsPauseCircle />
         <span>Stop</span>
        </div>
      </div>
    </div>
  );
}

export default PublishedListItem;
