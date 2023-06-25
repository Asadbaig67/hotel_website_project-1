import "./mailList.css";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import axios from "axios";

const MailList = () => {
  const isXtraSmallScreen = useMediaQuery("(max-width: 450px)");
  const [email, setEmail] = useState("");
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const HandleChange = (e) => {
    setEmail(e.target.value);
  };

  const HandleClick = async (e) => {
    e.preventDefault();
    let url = `${api}/newsletter/subscribe`;
    try {
      const response = await axios.post(url, { email });
    } catch (error) {
      console.error(error); // Handle any errors that occurred during the request
    }
    setEmail("");
  };
  return (
    <div
      className={`mail mt-2 ${isXtraSmallScreen ? "align-items-center" : ""} `}
    >
      <h1 className={`text-start fs-4 text-uppercase`}>News Letter</h1>
      <h1 className="mailTitle text-start fs-6">Save time, save money!</h1>
      <span className="mailDesc text-start ">
        Sign up and get the best deals
      </span>
      <form action="">
        <div className="mailInputContainer mt-3">
          <input
            type="email"
            value={email}
            onChange={HandleChange}
            required
            placeholder="Your Email"
          />
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={HandleClick}
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default MailList;
