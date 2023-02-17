import React, { useState } from "react";

function PublishListItem({ publishListItem }) {
  // variables
  const {
    Tender_No,
    Tender_Date,
    millshortname,
    itemname,
    paymenttoshortname,
    tenderdoshortname,
    season,
    Grade,
    Quantal,
    Lifting_Date,
    Purc_Rate,
    Mill_Rate,
    mc,
    pt,
    itemcode,
    tenderid,
    td,
  } = publishListItem;

  // useStates
  const [listItemData, setListItemData] = useState({
    Tender_No,
    Tender_Date,
    millshortname,
    itemname,
    paymenttoshortname,
    tenderdoshortname,
    season,
    Grade,
    Quantal,
    Lifting_Date,
    Purc_Rate,
    Mill_Rate,
    mc,
    pt,
    itemcode,
    tenderid,
    td,
    unit: "none",
    sale_rate: "",
    publish_quantal: "",
  });

  // functions
  function convertDate(date){
    return new Date(date).toLocaleDateString();
  }

  return (
    <div className="publish-list-row">
      <div className="publish-list-cell">{listItemData.Tender_No}</div>
      <div className="publish-list-cell">{convertDate(listItemData.Tender_Date)}</div>
      <div className="publish-list-cell">{listItemData.millshortname}</div>
      <div className="publish-list-cell">{listItemData.itemname}</div>
      <div className="publish-list-cell">{listItemData.paymenttoshortname}</div>
      <div className="publish-list-cell">{listItemData.tenderdoshortname}</div>
      <div className="publish-list-cell">{listItemData.season}</div>
      <div className="publish-list-cell">{listItemData.Grade}</div>
      <div className="publish-list-cell">
        <select name="unit" defaultValue="none" value={listItemData.unit}>
          <option value="none" hidden={true}>Select</option>
          <option>Quantal</option>
          <option>Metric Tone</option>
          <option>Litre </option>
        </select>
      </div>
      <div className="publish-list-cell">{listItemData.Quantal}</div>
      <div className="publish-list-cell">{convertDate(listItemData.Lifting_Date)}</div>
      <div className="publish-list-cell">{listItemData.Purc_Rate}</div>
      <div className="publish-list-cell">{listItemData.Mill_Rate}</div>
      <div className="publish-list-cell">
        <input type="text" placeholder="Sale Rate" name="sale_rate" value={listItemData.sale_rate}/>
      </div>
      <div className="publish-list-cell">
      <input type="text" placeholder="Publish Quantal" name="publish_quantal" value={listItemData.publish_quantal}/>
      </div>
      <div className="publish-list-cell">
        <button className="list-item-publish-btn">
          Publish
        </button>
      </div>
    </div>
  );
}

export default PublishListItem;
