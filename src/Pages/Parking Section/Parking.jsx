import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import slider from "../../images/slider-bg.jpg";
import style from "./parking.module.css";
import about from "../../images/about-img.jpg";
import w1 from "../../images/w1.png";
import w2 from "../../images/w2.png";
import w3 from "../../images/w3.png";
import pricing from "../../images/pricing-bg.jpg";
import c1 from "../../images/c1.jpg";
import c2 from "../../images/c2.jpg";
import Footer from "../../Components/footer/Footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { pink } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";

const Parking = () => {
  const isXtraSmallScreen = useMediaQuery("(max-width:450px)");

  return (
    <div className="continer-fluid">
      <Navbar list={true} />

      {/* <!-- about section --> */}

      <section
        className={`${style.about_section} ${
          isXtraSmallScreen ? "" : style.layout_padding
        } ${isXtraSmallScreen ? "pt-3" : ""}`}
      >
        <div className={` container `}>
          <div
            className={style.heading_container}
            // style={{ marginBottom: "30px" }}
          >
            <h2 className="fw-bold fs-2 my-1">
              About{" "}
              <span
                className=""
                style={{
                  borderBottom: "3px solid rgba(255, 74, 87, 0.8)",
                  borderColor: "#ff4a57",
                }}
              >
                Us
              </span>{" "}
            </h2>
            <p
              className={`text-start ${
                isXtraSmallScreen ? "my-2" : "mb-2 mt-1"
              } `}
            >
              We are a dedicated team passionate about providing seamless
              parking experiences. With years of expertise in the industry, we
              understand the importance of reliable parking options and strive
              to make your journey stress-free.
            </p>
          </div>
          <div
            className="row"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className={`col-lg-6 ${isXtraSmallScreen ? "pt-0 mt-0" : ""}`}>
              <div className={`${style.img_box}`}>
                <img
                  src={about}
                  style={{
                    boxShadow: "-2px 12px 22px -5px rgba(0,0,0,0.31)",
                    maxWidth: "100%",
                  }}
                  className="rounded-1 mt-0 pt-0"
                  alt=""
                />
              </div>
            </div>
            <div className={`col-lg-6 ${isXtraSmallScreen ? "pt-3" : ""}`}>
              <div className={`${style.detail_box}`}>
                <h2
                  className={`fw-bold fs-4 ${
                    isXtraSmallScreen ? "my-1" : "mb-2"
                  }`}
                >
                  We Are Here For Help
                </h2>
                <p className="text-start">
                  We understand that the parking booking process can be
                  overwhelming at times. That's why our dedicated customer
                  support team is here to assist you every step of the way.
                  Whether you have questions about parking options, need help
                  with online booking, or require assistance with any aspect of
                  your reservation, we're ready to help. Our knowledgeable and
                  friendly team is committed to providing excellent customer
                  service, ensuring your satisfaction.
                </p>
                <p className="text-start">
                  We prioritize addressing your queries and concerns promptly,
                  allowing you to proceed with your reservation confidently.
                  Your convenience and peace of mind are our top priorities as
                  we strive to make your experience with us smooth and pleasant.
                  Reach out to our customer support team for any assistance you
                  may need – we're here to make your parking booking experience
                  a breeze.
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- end about section --> */}

      {/* <!-- why section --> */}

      <section
        className={`${style.why_section} ${
          isXtraSmallScreen ? "" : style.layout_padding_bottom
        } ${isXtraSmallScreen ? "pt-1 mt-1" : ""}`}
      >
        <div className="container">
          <div className="col-md-10 px-0">
            <div className={`${style.heading_container}`}>
              <h4 className={`fw-bold fs-2 ${isXtraSmallScreen ? "mb-2" : ""}`}>
                Why Choose{" "}
                <span
                  className=""
                  style={{
                    borderBottom: "3px solid rgba(255, 74, 87, 0.8)",
                    borderColor: "#ff4a57",
                  }}
                >
                  Us
                </span>{" "}
              </h4>
              <p className={`text-dark ${isXtraSmallScreen ? "" : "mt-1"}`}>
                When it comes to parking bookings, we stand out from the rest.
                Here's why you should choose us:
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className={`${style.box}`}>
                <div className={`${style.img_box}`}>
                  <img src={w1} style={{ width: "55px" }} alt="" />
                </div>
                <div className={`${style.detail_box}`}>
                  <h4 className="my-2">No Booking Fees</h4>
                  <p className="text-light">
                    We believe in transparency, which is why we don't charge any
                    additional booking fees. You pay only for the parking spot,
                    ensuring a fair and cost-effective experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className={`${style.box}`}>
                <div className={`${style.img_box}`}>
                  <img src={w2} alt="" />
                </div>
                <div className={`${style.detail_box}`}>
                  <h4 className="my-2">Online Payments</h4>
                  <p className="text-light">
                    Say goodbye to cash transactions and long queues. Our secure
                    online payment system allows you to conveniently pay for
                    your parking reservation in advance, saving you time and
                    effort.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className={`${style.box}`}>
                <div className={`${style.img_box}`}>
                  <img src={w3} alt="" />
                </div>
                <div className={`${style.detail_box}`}>
                  <h4 className="my-2">Simple Booking Process</h4>
                  <p className="text-light">
                    We value your time, so we've designed a user-friendly
                    booking process that takes only a few minutes to complete.
                    With just a few clicks, you can secure your parking spot
                    hassle-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- end why section --> */}


      <Footer />
    </div>
  );
};

export default Parking;
