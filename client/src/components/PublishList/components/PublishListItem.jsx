import React, { useState } from "react";
import PublishDialog from "./PublishDialog";
import convertDate from "../../../utils/convertDate";

function PublishListItem({ publishListItem }) {
  // useStates
  const [listItemData, setListItemData] = useState({
    ...publishListItem,
    unit: "Q",
    sale_rate: "",
    publish_quantal: "",
  });
  const [showDialog, setShowDialog] = useState(false);

  // functions

  function handleInputChange(e) {
    const { name, value } = e.target;
    setListItemData((prev) => ({ ...prev, [name]: value }));
  }

  function handlePublishBtnClicked() {
    if (!listItemData.sale_rate || listItemData.sale_rate?.length === 0) {
      alert("Please enter sale rate for Tender no. " + listItemData.tender_no);
      return;
    }
    if (
      !listItemData.publish_quantal ||
      listItemData.publish_quantal?.length === 0
    ) {
      alert(
        "Please enter publish quantal for Tender no. " + listItemData.tender_no
      );
      return;
    }
    setShowDialog((prev) => !prev);
  }
  return (
    <div className="publish-list-row">
      <div className="publish-list-cell fixed">{listItemData.tender_no}</div>
      <div className="publish-list-cell">
        {convertDate(listItemData.tender_date)}
      </div>
      <div className="publish-list-cell">{listItemData.mill_short_name}</div>
      <div className="publish-list-cell">{listItemData.item_name}</div>
      <div className="publish-list-cell">{listItemData.payment_to_name}</div>
      <div className="publish-list-cell">{listItemData.tender_do_name}</div>
      <div className="publish-list-cell">{listItemData.season}</div>
      <div className="publish-list-cell">{listItemData.grade}</div>
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
      <div className="publish-list-cell">{listItemData.balance}</div>
      <div className="publish-list-cell">
        {convertDate(listItemData.lifting_date)}
      </div>
      <div className="publish-list-cell">{listItemData.purchase_rate}</div>
      <div className="publish-list-cell">{listItemData.mill_rate}</div>
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
      {showDialog && (
        <PublishDialog
          publishItem={listItemData}
          setShowDialog={setShowDialog}
        />
      )}
    </div>
  );
}

export default PublishListItem;
