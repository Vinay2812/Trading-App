import "./BankDetailCard.css";
import { AiFillDelete } from "react-icons/ai";
import { accountType } from "./accountType";

function BankDetailCard({ bankDetail, bankDetailArray, setBankDetailArray }) {
  function handleDelete() {
    if (bankDetailArray.length === 1) return;
    let count = 1;
    const updatedBankDetailArray = bankDetailArray
      .map((detail) => {
        return detail.id === bankDetail.id ? null : { ...detail, id: count++ };
      })
      .filter((data) => data !== null);

    setBankDetailArray(updatedBankDetailArray);
  }

  function handleChange(e) {
    setBankDetailArray((prev) => {
      return prev.map((detail) => {
        return detail.id === bankDetail.id
          ? { ...detail, [e.target.name]: e.target.value }
          : detail;
      });
    });
  }
  return (
    <div className="bank-detail-card">
      <div className="bank-detail-card-title">
        Bank Detail {bankDetail.id}: <AiFillDelete onClick={handleDelete} />
      </div>
      <div className="bank-card-grid-container">
        <input
          type="text"
          placeholder="Account name"
          required={true}
          name="account_name"
          value={bankDetail.account_name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Account Number"
          name="account_number"
          required={true}
          value={bankDetail.account_number}
          onChange={handleChange}
        />
        <select
          name="account_type"
          id=""
          defaultValue="none"
          onChange={handleChange}
        >
          <option value="none" disabled={true} hidden={true}>
            Select Account Type
          </option>
          {accountType.map((type) => {
            return (
              <option value={type} key={type}>
                {type}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="Bank Name"
          name="bank_name"
          required={true}
          value={bankDetail.bank_name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Branch"
          required={true}
          name="branch"
          value={bankDetail.branch}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="IFSC"
          required={true}
          name="ifsc"
          value={bankDetail.ifsc}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default BankDetailCard;
