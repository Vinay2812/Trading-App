import { useState } from 'react'
import { modifySingleTrade } from '../../../api/AdminRequest';
import convertDate from '../../../utils/convertDate';
import convertUnit from '../../../utils/convertUnit';
import logger from '../../../utils/logger';

function ModifyDialog({dialogData, setShowModifyDialog, setListItemData, socket}) {
    // useStates
    const [saleRate, setSaleRate] = useState(dialogData.sale_rate);
    const [publishQuantal, setPublishQuantal] = useState(dialogData.published_qty);

    // functions
    function handleSaleRateChange(e){
        setSaleRate(e.target.value)
    }

    function handlePublishQuantalChange(e){
        setPublishQuantal(e.target.value)
    }

    function handleCancel(){
        setShowModifyDialog(false);
    }

    async function handleModify(){
        const confirRes = window.confirm("Are you sure to modify?");
        if(!confirRes) return;
        const data = {
            tenderid: dialogData.tenderid,
            sale_rate: saleRate,
            published_qty: publishQuantal
        }
        try {
            const res = await modifySingleTrade(data);
            if(res.status === 200){
                setListItemData(prev => ({...prev, sale_rate: saleRate, published_qty: publishQuantal}))
                setShowModifyDialog(false);
                socket.connected && socket.emit("update_client_list", "Req received - client list updation")
            }
        } catch (err) {
            setShowModifyDialog(false);
            logger.error(err)
        }
    }
  return (
    <div className="dialog-container">
        <div className="dialog-box">
            <div className="dialog-title">
                Modify Published Item
            </div>
            <div className="dialog-content">
                <div className="dialog-row">
                    <div className="dialog-cell">
                        <label htmlFor="">Tender no: </label>
                        <span>{dialogData.tender_no}</span>
                    </div>
                    <div className="dialog-cell">
                        <label htmlFor="">Item name: </label>
                        <span>{dialogData.itemname}</span>
                    </div>
                </div>
                <div className="dialog-row">
                    <div className="dialog-cell">
                        <label htmlFor="">Tender Date: </label>
                        <span>{convertDate(dialogData.tender_date)}</span>
                    </div>
                    <div className="dialog-cell">
                        <label htmlFor="">Unit</label>
                        <span>{convertUnit(dialogData.unit)}</span>
                    </div>
                </div>
                <div className="dialog-row">
                    <div className="dialog-cell">
                        <label htmlFor="">Sale Rate: </label>
                        <input type="number" value={saleRate} onChange={handleSaleRateChange}/>
                    </div>
                    <div className="dialog-cell">
                        <label htmlFor="">Publish Quantal: </label>
                        <input type="number" value={publishQuantal} onChange={handlePublishQuantalChange}/>
                    </div>
                </div>
                <div className="dialog-row">
                    <div className="dialog-cell">
                        <label htmlFor="">Sold: </label>
                        <span>{dialogData.sold}</span>
                    </div>
                    <div className="dialog-cell">
                        <label htmlFor="">Balance: </label>
                        <span>{dialogData.balance}</span>
                    </div>
                </div>
                <div className="dialog-row">
                    <div className="dialog-cell dialog-btns">
                        <button className="cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="save" onClick={handleModify}>
                            Modify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModifyDialog