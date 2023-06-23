import React, { useState, useRef } from "react";
import style from "./Otp.module.css";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const Otpverify = () => {
  const Navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 450px)");
  const dispatch = useDispatch();
  const { userWithToken } = useSelector((state) => state.getResetToken);
  const email = userWithToken.email;

  const [otp, setOtp] = useState("");
  const inputs = useRef([]);
  const [alertOn, setAlertOn] = useState(false);
  const [alertErrorOn, setAlertErrorOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [openError, setOpenError] = useState(true);

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
    setAlertOn(true);
    const response = await fetch("http://46.32.232.208:5000/otp/verifyotp", {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    console.log(data);
    if (!data) {
      setAlertErrorOn(true);
    }
    setAlertOn(false);
    if (data) {
      // Navigate("/reset/password");
    }
  };

  return (
    <>
      {alertErrorOn && (
        <Collapse in={openError}>
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Incorrect OTP</AlertTitle>
              <strong>Your OTP is not correct or is expired.</strong>
            </Alert>
          </Stack>
        </Collapse>
      )}
      {alertOn && (
        <Collapse in={open}>
          <Stack sx={{ width: "100%" }} spacing={1}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>OTP Verification</AlertTitle>
              <strong>
                Please wait while yout OTP is being verified!.Once its done you
                will be redirected to the reset password page.
              </strong>
            </Alert>
          </Stack>
        </Collapse>
      )}
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
            <p className="me-1">
              Didn't receive the OTP? Click here to resend.
            </p>
            <button
              className={`btn btn-primary btn-sm`}
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otpverify;
