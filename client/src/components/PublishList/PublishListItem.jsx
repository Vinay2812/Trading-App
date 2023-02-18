import React, { useState } from "react";
import PublishDialog from "./PublishDialog";

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
    balance
  } = publishListItem;

  // useStates
  const [listItemData, setListItemData] = useState({
    Tender_No,
    Tender_Date: convertDate(Tender_Date),
    millshortname,
    itemname,
    paymenttoshortname,
    tenderdoshortname,
    season,
    Grade,
    Quantal,
    Lifting_Date: convertDate(Lifting_Date),
    Purc_Rate,
    Mill_Rate,
    mc,
    pt,
    itemcode,
    tenderid,
    td,
    balance,
    unit: "none",
    sale_rate: "",
    publish_quantal: "",
  });
  const [showDialog, setShowDialog] = useState(false);

  // functions
  function convertDate(date) {
    if(!date || !date?.length)return;

    const d = new Date(date);
    return (
      d.getDay() +
      1 +
      "/" +
      (d.getMonth() + 1) +
      "/" +
      d.getFullYear().toString().substring(2, 4)
    );
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setListItemData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePublishBtnClicked() {
    if(listItemData.unit === "none"){
      alert("Please select a unit for Tender no. " + Tender_No);
      return;
    }

    if(!listItemData.sale_rate || listItemData.sale_rate?.length === 0){
      alert("Please enter sale rate for Tender no. " + Tender_No);
      return;
    }

    if(!listItemData.publish_quantal || listItemData.publish_quantal?.length === 0){
      alert("Please enter publish quantal for Tender no. " + Tender_No);
      return;
    }


    setShowDialog(prev => !prev);
  }
  return (
    <div className="publish-list-row">
      <div className="publish-list-cell">{listItemData.Tender_No}</div>
      <div className="publish-list-cell">
        {listItemData.Tender_Date}
      </div>
      <div className="publish-list-cell">{listItemData.millshortname}</div>
      <div className="publish-list-cell">{listItemData.itemname}</div>
      <div className="publish-list-cell">{listItemData.paymenttoshortname}</div>
      <div className="publish-list-cell">{listItemData.tenderdoshortname}</div>
      <div className="publish-list-cell">{listItemData.season}</div>
      <div className="publish-list-cell">{listItemData.Grade}</div>
      <div className="publish-list-cell">
        <select
          name="unit"
          value={listItemData.unit}
          onChange={handleInputChange}
        >
          <option value="none" hidden={true}>
            Select
          </option>
          <option>Quantal</option>
          <option>Metric Tone</option>
          <option>Litre </option>
        </select>
      </div>
      <div className="publish-list-cell">{listItemData.Quantal}</div>
      <div className="publish-list-cell">
        {listItemData.Lifting_Date}
      </div>
      <div className="publish-list-cell">{listItemData.Purc_Rate}</div>
      <div className="publish-list-cell">{listItemData.Mill_Rate}</div>
      <div className="publish-list-cell">
        <input
          type="number"
          placeholder="Sale Rate"
          name="sale_rate"
          value={listItemData.sale_rate}
          onChange={handleInputChange}
        />
      </div>
      <div className="publish-list-cell">
        <input
          type="number"
          placeholder="Publish Quantal"
          name="publish_quantal"
          value={listItemData.publish_quantal}
          onChange={handleInputChange}
        />
      </div>
      <div className="publish-list-cell">
        <button
          className="list-item-publish-btn"
          onClick={handlePublishBtnClicked}
        >
          Publish
        </button>
      </div>
      {showDialog && <PublishDialog publishItem={listItemData} setShowDialog={setShowDialog}/>}
    </div>
  );
}

export default PublishListItem;
