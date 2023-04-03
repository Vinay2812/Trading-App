import { lazy } from "react";
const BankDetailCard = lazy(() => import("../BankDetailCard/BankDetailCard"))
import "./BankDetails.css";

function BankDetails({ bankDetailArray, setBankDetailArray }) {
    function handleAddBankDetail(e){
        e.preventDefault();
        const bankDetail = {
            id: bankDetailArray.length + 1,
            account_name: "",
            account_number: "",
            account_type: "",
            bank_name: "",
            branch: "",
            ifsc: "",
        };

        setBankDetailArray([...bankDetailArray, bankDetail]);
    }
    return (
    <div className="bank-detail-container">
      {bankDetailArray.map((bankDetail) => {
        return (
          <BankDetailCard
            bankDetail={bankDetail}
            bankDetailArray={bankDetailArray}
            setBankDetailArray={setBankDetailArray}
            key={bankDetail.id}
          />
        );
      })}
      <button className="add-bank-btn" disabled={bankDetailArray.length >= 5} onClick={handleAddBankDetail}>
        ADD BANK + 1
      </button>
    </div>
  );
}

export default BankDetails;
