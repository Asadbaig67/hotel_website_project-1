import React, { useState, useRef } from "react";
import style from "./Otp.module.css";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Otpverify = () => {
  const Navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 450px)");
  const dispatch = useDispatch();
  const { userWithToken } = useSelector((state) => state.getResetToken);
  const email = userWithToken.email;

  const [otp, setOtp] = useState("");
  const inputs = useRef([]);

  const handleChange = (event, index) => {
    const { value } = event.target;
    setOtp((prevOtp) => {
      const otpArray = prevOtp.split("");
      otpArray[index] = value;
      return otpArray.join("");
    });
    if (value !== "") {
      inputs.current[index + 1].focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text");
    const otpArray = pasteData.split("").slice(0, 6);
    setOtp(otpArray.join(""));
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
      inputs.current[index - 1].focus();
    }
  };

  const handleResendOTP = () => {
    // handle resend OTP logic
  };
  const handleVerify = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5000/otp/verifyotp", {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (!data) Navigate("/forgetpassword");
    Navigate("/reset/password");
  };

  return (
    <div className="container-fluid text-center ">
      <div className={`container ${isMobile ? "" : "w-50"}  border border-2`}>
        <label className={`${style.otp_label}`}>Enter OTP</label>
        <div className="row">
          <div
            className={`col-12 d-flex flex-wrap justify-content-center ${style.otp_input_container}`}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div className="col-2">
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index] || ""}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  //   onPaste={handlePaste}
                  ref={(input) => (inputs.current[index] = input)}
                  className={`${style.otp_input}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <button className={`btn btn-primary btn-sm`} onClick={handleVerify}>
            Verify Otp
          </button>
        </div>
        <div className="d-flex flex-row justify-content-around">
          <p className="me-1">Didn't receive the OTP? Click here to resend.</p>
          <button
            className={`btn btn-primary btn-sm`}
            onClick={handleResendOTP}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otpverify;
