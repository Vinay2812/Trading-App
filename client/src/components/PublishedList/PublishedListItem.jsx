import React from "react";

function PublishedListItem({ listItemData }) {
  return (
    <div className="published-list-row">
      <div className="published-list-cell">{listItemData.Tender_No}</div>
      <div className="published-list-cell">{listItemData.Tender_Date}</div>
      <div className="published-list-cell">{listItemData.millshortname}</div>
      <div className="published-list-cell">{listItemData.itemname}</div>
      <div className="published-list-cell">
        {listItemData.paymenttoshortname}
      </div>
      <div className="published-list-cell">
        {listItemData.tenderdoshortname}
      </div>
      <div className="published-list-cell">{listItemData.season}</div>
      <div className="published-list-cell">{listItemData.Grade}</div>
      <div className="published-list-cell">{listItemData.unit}</div>
      <div className="published-list-cell">{listItemData.Quantal}</div>
      <div className="published-list-cell">{listItemData.Lifting_Date}</div>
      <div className="published-list-cell">{listItemData.Purc_Rate}</div>
      <div className="published-list-cell">{listItemData.Mill_Rate}</div>
      <div className="published-list-cell">{listItemData.sale_rate}</div>
      <div className="published-list-cell">
       {listItemData.publish_quantal}
      </div>
      <div className="published-list-cell">
        <button>
          Modify
        </button>
        <button>
          Stop
        </button>
      </div>
    </div>
  );
}

export default PublishedListItem;
