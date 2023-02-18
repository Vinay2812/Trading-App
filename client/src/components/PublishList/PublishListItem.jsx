import React, { useState } from "react";
import PublishDialog from "./PublishDialog";

function PublishListItem({ publishListItem }) {

  // useStates
  const [listItemData, setListItemData] = useState({
    ...publishListItem,
    Tender_Date: convertDate(publishListItem.Tender_Date),
    Lifting_Date: convertDate(publishListItem.Lifting_Date),
    unit: "Q",
    sale_rate: "",
    publish_quantal: ""
  });
  const [showDialog, setShowDialog] = useState(false);

  // functions
  function convertDate(date) {
    if(!date || !date?.length)return;
    return new Date(date).toLocaleDateString();
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setListItemData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePublishBtnClicked() {

    if(!listItemData.sale_rate || listItemData.sale_rate?.length === 0){
      alert("Please enter sale rate for Tender no. " + listItemData.Tender_No);
      return;
    }

    if(!listItemData.publish_quantal || listItemData.publish_quantal?.length === 0){
      alert("Please enter publish quantal for Tender no. " + listItemData.Tender_No);
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
          <option value="Q">Quantal</option>
          <option value="M">Metric Tone</option>
          <option value="L">Litre </option>
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
