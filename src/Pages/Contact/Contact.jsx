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
      const response = await fetch("http://46.32.232.208:5000/contact/create", {
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
      {/* <div className="container-fluid">
        <div className={`container-fluid my-auto ${style.custom}`}>
          <div className="row">
            <div className="col">
              <div className="container text-center">
                <span className="text-uppercase fs-6">
                  Desalis Hotels
                </span>
                <h1 className="text-uppercase fw-bold fs-1">Contact us</h1>
                <hr />
                <span className="text-uppercase text-warning fs-6">
                  reservations
                </span>
                <p className="fs-5">
                  <span className="text-warning fw-bold fs-5">T:</span> +92 (42)
                  111 505 505, 3636 0210 /{" "}
                  <span className="text-warning fw-bold fs-5">F:</span> +92 (42)
                  3636 2760, 3636 4362
                  <br />
                  <span className="text-warning fw-bold fs-5">E:</span>{" "}
                  pchl@pchotels.com /{" "}
                  <span className="text-warning fw-bold fs-5">W:</span>{" "}
                  pchotels.com /{" "}
                  <span className="text-warning fw-bold fs-5">FB:</span>{" "}
                  www.facebook.com/PC.Lahore/ <br />
                  <span className="text-warning fw-bold fs-5">IG:</span>{" "}
                  www.instagram.com/pearl_continental_lahore
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <div className="container w-50  text-center">
              <label className="text-uppercase ps-2 pt-2 my-3 text-start bg-dark text-warning w-50">
                Your Message to : Desalis
              </label>
              <form className="">
                <div className="d-flex flex-row">
                  <input
                    type="text"
                    name="fname"
                    onChange={handleChange}
                    placeholder="First Name"
                    className={`${style.custom_input} me-1 w-50`}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    onChange={handleChange}
                    className={`${style.custom_input} ms-1 w-50`}
                  />
                </div>
                <div className="d-flex my-4 flex-row">
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                    className={`${style.custom_input} me-1 w-50`}
                  />
                  <input
                    type="number"
                    placeholder="Phone"
                    onChange={handleChange}
                    name="phone"
                    className={`${style.custom_input} ms-1 w-50`}
                  />
                </div>
                <label className="text-uppercase text-start" htmlFor="help">
                  How Can we help you?
                </label>
                <div className="form-floating">
                  <textarea
                    className={`form-control  shadow-none border-dark border border-1  `}
                    placeholder="Leave a comment here"
                    name="help"
                    onChange={handleChange}
                    id="floatingTextarea2"
                    style={{ height: "200px" }}
                  ></textarea>
                  <label for="floatingTextarea2">Comments</label>
                </div>
                <input
                  type="submit"
                  onClick={handleClick}
                  className="font-medium text-base px-4 py-2 my-3 leading-relaxed inline-block rounded-4 whitespace-nowrap cursor-pointer bg-black text-white"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="container-fluid">
        <div className={`container-fluid my-auto ${style.custom}`}>
          <div className="row">
            <div className="col">
              <div className="container text-center">
                <span className="text-uppercase fs-6">Desalis Hotels</span>
                <h1 className="text-uppercase fw-bold fs-1">Contact us</h1>
                <hr />
                <span className="text-uppercase text-warning fs-6">
                  reservations
                </span>
                <p className="fs-5">
                  <span className="text-warning fw-bold fs-5">T:</span> +92 (42)
                  111 505 505, 3636 0210 /{" "}
                  <span className="text-warning fw-bold fs-5">F:</span> +92 (42)
                  3636 2760, 3636 4362
                  <br />
                  <span className="text-warning fw-bold fs-5">E:</span>{" "}
                  pchl@pchotels.com /{" "}
                  <span className="text-warning fw-bold fs-5">W:</span>{" "}
                  pchotels.com /{" "}
                  <span className="text-warning fw-bold fs-5">FB:</span>{" "}
                  www.facebook.com/PC.Lahore/ <br />
                  <span className="text-warning fw-bold fs-5">IG:</span>{" "}
                  www.instagram.com/pearl_continental_lahore
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col">
            <div className="container text-center">
              <label className="text-uppercase ps-2 pt-2 my-3 text-start bg-dark text-warning w-50">
                Your Message to : Desalis
              </label>
              <form>
                <div className="row mb-4">
                  <div className="col-sm-6">
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="First Name"
                      name="fname"
                      onChange={handleChange}
                      type="text"
                      variant="standard"
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Last Name"
                      type="text"
                      name="lname"
                      variant="standard"
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-sm-6">
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      type="email"
                      variant="standard"
                    />
                  </div>
                  <div className="col-sm-6">
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Phone"
                      name="phone"
                      onChange={handleChange}
                      type="number"
                      variant="standard"
                    />
                  </div>
                </div>
                <label className="text-uppercase text-start" htmlFor="help">
                  How can we help you?
                </label>
                <div className="form-floating mb-4">
                  <div className="form-floating">
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Comments"
                      value={user.help}
                      name="help"
                      onChange={handleChange}
                      type="text"
                      variant="standard"
                    />
                  </div>
                  <button className="btn my-2 me-auto btn-primary btn-lg">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> */}
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

{
  /* <input
                      type="text"
                      name="fname"
                      onChange={handleChange}
                      placeholder="First Name"
                      className={`${style.custom_input} form-control`}
                    /> */
}
