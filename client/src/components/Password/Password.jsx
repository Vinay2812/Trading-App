import { useMemo } from "react";
import "./Password.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserOTP,
  resendOTP,
  updatePassword,
  verifyOTP,
} from "../../api/AuthRequest";

function Password() {
  const navigate = useNavigate();
  const params = useParams();
  const { userId } = params;
  useEffect(() => {
    if (userId === undefined || userId === null) {
      navigate("/auth");
      return;
    }
    checkValidUser();

    async function checkValidUser() {
      try {
        const res = await getUserOTP(userId);
      } catch (err) {
        navigate("/auth");
      }
    }
  }, [userId]);

  const INITIAL_PASSWORD_DETAILS = useMemo(
    () => ({
      password: "",
      confirm_password: "",
      otp: "",
    }),
    []
  );
  const [passwordDetails, setPasswordDetails] = useState(
    INITIAL_PASSWORD_DETAILS
  );
  console.log(passwordDetails);
  const [passwordPage, setPasswordPage] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setPasswordDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleResend() {
    await resendOTP({userId});
  }

  async function handleVerify() {
    const otpData = {
      otp: passwordDetails.otp,
      userId,
    };

    const validation = await verifyOTP(otpData);
    console.log(validation);
    if (validation.status === 200) {
      setPasswordPage(true);
    }
    alert(validation.data);
  }
  async function handleSubmit() {
    if (passwordDetails.password.length < 4) {
      alert("Minimum 4 character required");
      return;
    }
    if (passwordDetails.password !== passwordDetails.confirm_password) {
      alert("Password and confirm password do not match");
      return;
    }

    const updatePasswordData = {
      userId,
      password: passwordDetails.password,
    };
    const res = await updatePassword(updatePasswordData);
    if (res.status === 200) {
      alert("password updated successfully");
    }
  }
  return (
    <div className="password-container">
      <div className="container">
        <div className="password-title">
          {passwordPage
            ? "Please fill the password"
            : "Please verify your email"}
        </div>
        {passwordPage ? (
          <>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                value={passwordDetails.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                name="confirm_password"
                value={passwordDetails.confirm_password}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <div>
            <label htmlFor="otp">Enter your otp</label>
            <input
              type="text"
              placeholder="Enter your otp"
              name="otp"
              value={passwordDetails.otp}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="register-btns">
          {!passwordPage ? (
            <>
              <button className="cancel" onClick={handleResend}>
                Resend
              </button>
              <button className="save" onClick={handleVerify}>
                Verify
              </button>
            </>
          ) : (
            <button className="save" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Password;
