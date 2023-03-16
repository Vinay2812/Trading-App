import { useState, useEffect } from "react";
import "./Register.css";
import allDistricts from "./data/districts.json";
import states from "./data/states.json";
import { constitutionFirm } from "./data/contitution-firm";
import { AiFillSave } from "react-icons/ai";
import validateForm from "./utils/FormValidation.js";
// import { register } from "../../redux/actions/authActions";
import { register } from "../../api/AuthRequest";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import BankDetails from "./components/BankDetails/BankDetails";
import ContactDetails from "./components/ContactDetails/ContactDetails";
import { login } from "../../redux/actions/authActions";

function Register({ setRegisterPage }) {
  states.sort((a, b) => a.code - b.code);
  const [hasGST, setHasGST] = useState(false);
  const [stateCode, setStateCode] = useState("0");
  const [stateDistricts, setStateDistricts] = useState([
    { name: "Not Available" },
  ]);
  const [error, setError] = useState("");

  const INITIAL_USER_STATE = {
    company_name: "",
    email: "",
    address: "",
    state: "",
    district: "",
    pincode: "",
    mobile: "",
    whatsapp: "",
    gst: "",
    pan: "",
    fssai: "",
    tan: "",
    constitution_of_firm: "",
  };

  const INTIAL_BANK_DETAIL_ARRAY = [
    {
      id: 1,
      account_name: "",
      account_number: "",
      account_type: "",
      bank_name: "",
      branch: "",
      ifsc: "",
    },
  ];

  const INITIAL_CONTACT_ARRAY = [
    {
      id: 1,
      full_name: "",
      designation: "",
      mobile: "",
      whatsapp: "",
      email: "",
    },
  ];

  const [userDetails, setUserDetails] = useState(INITIAL_USER_STATE);
  const [bankDetailArray, setBankDetailArray] = useState(
    INTIAL_BANK_DETAIL_ARRAY
  );
  const [contactArray, setContactArray] = useState(INITIAL_CONTACT_ARRAY);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const reqDistricts =
      stateCode === "0"
        ? [{ name: "Not Available" }]
        : allDistricts.find(
            (state) => state.code.toString() === stateCode.toString()
          ).districts;
    setStateDistricts(reqDistricts);
  }, [stateCode]);

  useEffect(() => {
    if (!error.length) return;
    const timeout = setTimeout(() => {
      setError("");
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  function handleStateChange(e) {
    setStateCode(e.target.value);
    const selectedState = states.find(
      (state) => state.code.toString() === e.target.value.toString()
    ).name;
    setUserDetails((prev) => ({ ...prev, state: selectedState }));
  }

  function handleGSTChange(e) {
    const gst = e.target.value;
    setUserDetails((prev) => ({ ...prev, gst: gst }));
    if (
      gst.length >= 2 &&
      userDetails.state.length &&
      userDetails.state.substring(0, 2) !== gst.substring(0, 2)
    ) {
      setError("Invalid GST");
    }

    if (gst.length === 15) {
      setUserDetails((prev) => ({ ...prev, pan: gst.substring(2, 12) }));
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (hasGST && userDetails.gst.length !== 15) {
      setError("Invalid gst");
      return;
    }
    const validation = validateForm(
      {
        userData: userDetails,
        contactData: contactArray,
        bankData: bankDetailArray,
      },
      setError
    );

    if (validation === true) {
      setLoading(true);
      const updatedMobile = userDetails.mobile.substring(
        userDetails.mobile.length - 10,
        userDetails.mobile.length
      );
      const formData = {
        userData: { ...userDetails, mobile: updatedMobile },
        bankData: bankDetailArray,
        contactData: contactArray,
      };
      register(formData)
        .then((res) => {
          const { mobile, company_name, password, userId } = res.data.userData;
          dispatch(login({mobile, company_name, password}))
          navigate(`/register/${userId}`)
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          logger.error(err)
        });
    }
  }
  return (
    <div className="register-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="register-title">
            User Registration
            {error.length ? <div className="error">{error}</div> : ""}
          </div>

          <div className="row">
            <div>
              <label htmlFor="company_name">Company name</label>
              <input
                type="text"
                name="company_name"
                required={true}
                value={userDetails.company_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                required={true}
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="address">Address</label>
              <textarea
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="drp-state">State</label>
              <select
                name="drp-state"
                defaultValue="none"
                onChange={handleStateChange}
              >
                <option value="none" disabled={true} hidden={true}></option>
                {states.map((state) => {
                  return (
                    <option value={state.code} key={state.id}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="district">District</label>
              <select
                name="district"
                defaultValue={0}
                onChange={handleChange}
                disabled={userDetails.state.length === 0}
              >
                <option value={0} disabled hidden></option>
                {stateDistricts.map((district) => {
                  return (
                    <option value={district.name} key={district.name}>
                      {district.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="pincode">Pincode</label>
              <input
                type="number"
                name="pincode"
                required={true}
                value={userDetails.pincode}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                name="mobile"
                required={true}
                value={userDetails.mobile}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                value={userDetails.whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            {hasGST ? (
              <div>
                <label htmlFor="gst">GST</label>
                <div>
                  <input
                    type="checkbox"
                    name="gst_registered"
                    checked={hasGST}
                    onChange={() => {
                      setHasGST((prev) => !prev);
                    }}
                  />
                  <input
                    type="text"
                    className="gst"
                    name="gst"
                    required={true}
                    value={userDetails.gst}
                    onChange={handleGSTChange}
                  />
                </div>
              </div>
            ) : (
              <div className="gst-checkbox">
                <input
                  type="checkbox"
                  name="gst_registered"
                  checked={hasGST}
                  onChange={() => {
                    setHasGST(true);
                  }}
                />
                <label htmlFor="gst_registered">Is GST Registered</label>
              </div>
            )}

            <div>
              <label htmlFor="pan">PAN</label>
              <input
                type="text"
                name="pan"
                required={true}
                value={userDetails.pan}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="fssai">FSSAI</label>
              <input
                type="text"
                name="fssai"
                value={userDetails.fssai}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="tan">TAN</label>
              <input
                type="text"
                name="tan"
                value={userDetails.tan}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="constitution_of_firm">
                Constitution of the Firm
              </label>
              <select
                name="constitution_of_firm"
                id=""
                defaultValue="none"
                onChange={handleChange}
              >
                <option value="none" disabled={true} hidden={true}></option>
                {constitutionFirm.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <BankDetails
            bankDetailArray={bankDetailArray}
            setBankDetailArray={setBankDetailArray}
          />

          <ContactDetails
            contactArray={contactArray}
            setContactArray={setContactArray}
          />

          <div className="register-btns">
            <button className="cancel" onClick={() => setRegisterPage(false)}>
              CANCEL
            </button>
            <button className="save" onClick={handleSubmit}>
              {<AiFillSave />} SAVE
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Register;
