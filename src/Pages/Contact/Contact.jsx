import React, { useState } from "react";
import style from "./contact.module.css";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import TextField from "@mui/material/TextField";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import axios from "axios";
const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

const Contact = () => {
  const dispatch = useDispatch();
  const { contactData } = useSelector((state) => state.setData);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    help: "",
    phone: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;

    setUser({ ...user, [e.target.name]: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "setData",
      payload: user,
    });
    setTimeout(() => {
      console.log(contactData);
    }, 5000);
  };
  const HandleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/contact/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.fname,
          email: user.email,
          message: user.help,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      
      <section className={`${style.contact_section} spad`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className={style.contact_text}>
                <h2>Contact Info</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="py-2">
                  <div className="my-2">
                    <HomeRoundedIcon color="primary" />
                    <span className="mx-2 fw-bold">Address:</span>
                    <small className="fw-lighter text-muted">
                      856 Cordia Extension Apt.356,Lake,US
                    </small>
                  </div>
                  <div className="my-2">
                    <LocalPhoneRoundedIcon color="primary" />
                    <span className="mx-2 fw-bold">Phone:</span>
                    <small className="fw-lighter text-muted">
                      (12) 345 67890
                    </small>
                  </div>
                  <div className="my-2">
                    <EmailRoundedIcon color="primary" />
                    <span className="mx-2 fw-bold">Email:</span>
                    <small className="fw-lighter text-muted">
                      infoatdesalis@desalis.com
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 offset-lg-1">
              <form action="#" className={style.contact_form}>
                <div className="row">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      name="fname"
                      value={user.fname}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      required
                      name="help"
                      value={user.help}
                      onChange={handleChange}
                      placeholder="Your Message"
                    ></textarea>
                    <button
                      className="btn btn-primary"
                      onClick={HandleClick}
                      type="submit"
                    >
                      Submit Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={style.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0606825994123!2d-72.8735845851828!3d40.760690042573295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e85b24c9274c91%3A0xf310d41b791bcb71!2sWilliam%20Floyd%20Pkwy%2C%20Mastic%20Beach%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1578582744646!5m2!1sen!2sbd"
              height="470"
              style={{ border: "0" }}
              allowfullscreen=""
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;

