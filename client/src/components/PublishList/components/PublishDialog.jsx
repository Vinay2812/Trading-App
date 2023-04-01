import React, { useState } from "react";
import { postDailyPublish } from "../../../api/AdminRequest";
import Loader from "../../Loader/Loader";
import convertDate from "../../../utils/convertDate";
import convertUnit from "../../../utils/convertUnit";
import logger from "../../../utils/logger";
import socket from "../../../socket.io/socket";

function PublishDialog({ publishItem, setShowDialog }) {
  // useStates
  const [dialogData, setDialogData] = useState({
    ...publishItem,
    type: "F",
    multiple_of: 160,
    auto_confirm: "Y",
  });
  const [loading, setLoading] = useState(false);

  // functions
  function handleInputChange(e) {
    const { name, value } = e.target;
    setDialogData((prev) => ({ ...prev, [name]: value }));
  }

  function handleDialogCancel() {
    setShowDialog((prev) => !prev);
  }

  async function handleDialogPublish() {
    setLoading(true);
    const res = await postDailyPublish(dialogData);
    if (res?.success) {
      socket.connected &&
        socket.emit(
          "update_client_list",
          "Req received - client list updation"
        );
      setShowDialog(false);
    }
    setLoading(false);
  }

  return (
    <div className="dialog-container">
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <div className="dialog-box">
          <div className="dialog-title">Publish Dialog</div>
          <div className="dialog-content">
            <div className="dialog-row">
              <div className="dialog-cell">
                <label htmlFor="">Mill name: </label>
                <span>{dialogData.mill_short_name}</span>
              </div>
              <div className="dialog-cell">
                <label htmlFor="">Product: </label>
                <span>{dialogData.item_name}</span>
              </div>
            </div>
            <div className="dialog-row">
              <div className="dialog-cell">
                <label htmlFor="">Grade: </label>
                <span>{dialogData.grade}</span>
              </div>
              <div className="dialog-cell">
                <label htmlFor="">Season: </label>
                <span>{dialogData.season}</span>
              </div>
            </div>
            <div className="dialog-row">
              <div className="dialog-cell">
                <label htmlFor="">Selling Unit: </label>
                <span>{convertUnit(dialogData.unit)}</span>
              </div>
              <div className="dialog-cell">
                <label htmlFor="">Lifting Date: </label>
                <span>{convertDate(dialogData.lifting_date)}</span>
              </div>
            </div>
            <div className="dialog-row">
              <div className="dialog-cell">
                <label htmlFor="">Type: </label>
                <select
                  value={dialogData.type}
                  name="type"
                  onChange={handleInputChange}
                >
                  <option value="F">Full</option>
                  <option value="P">Partial</option>
                </select>
              </div>
              <div className="dialog-cell">
                <label htmlFor="">Multiple of: </label>
                <input
                  type="number"
                  value={dialogData.multiple_of}
                  placeholder="Multiple of"
                  name="multiple_of"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="dialog-row">
              <div className="dialog-cell">
                <label htmlFor="">Auto Confirm: </label>
                <select
                  value={dialogData.auto_confirm}
                  name="auto_confirmation"
                  onChange={handleInputChange}
                >
                  <option value="Y">Yes</option>
                  <option value="N">No</option>
                </select>
              </div>
            </div>
            <div className="dialog-row">
              <div className="dialog-btns">
                <button className="cancel" onClick={handleDialogCancel}>
                  Cancel
                </button>
                <button className="save" onClick={handleDialogPublish}>
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>
  );
}

export default PublishDialog;
