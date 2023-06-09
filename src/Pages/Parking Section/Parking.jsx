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
                <button className={`${isXtraSmallScreen ? "mt-3" : "mt-3"}`}>
                  Read More
                </button>
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
                Eaque nostrum quis ad aliquam autem odio assumenda accusamus,
                consequuntur, iste voluptate voluptates quia non dicta hic
                repellendus similique a facere earum omnis? Repellendus nemo,
                aspernatur ullam est deserunt officiis.
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

      {/* <!-- pricing section --> */}

      <section
        className={`${style.pricing_section} ${style.layout_padding}`}
        style={{ backgroundImage: `url(${pricing})` }}
      >
        {/* <div className={`${style.bg_box}`}>
          <img src={pricing} alt="" />
        </div> */}
        <div className="container">
          <div className={`${style.heading_container} ${style.heading_center}`}>
            <h2 className="fw-bold fs-3">Our Pricing</h2>
          </div>
          <div className="col-xl-10 px-0 mx-auto">
            <div className="row">
              <div className="col-md-6 col-lg-4 mx-auto">
                <div className={`${style.box}`}>
                  <h4 className={`${style.price}`}>$10</h4>
                  <h5
                    className={`${style.name} pb-1 mb-1 fw-bold text-dark`}
                    style={{
                      borderBottom: "3px solid rgba(255, 74, 87, 0.8)",
                      borderColor: "#ff4a57",
                      display: "inline-block",
                    }}
                  >
                    Basic
                  </h5>
                  <p className="">
                    Our Basic plan offers affordable parking options without
                    compromising on quality. Enjoy peace of mind knowing your
                    vehicle is in safe hands.
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mx-auto">
                <div className={`${style.box} ${style.box_center}`}>
                  <h4 className={`${style.price}`}>$30</h4>
                  <div className="" style={{ marginTop: "75px" }}>
                    <h5
                      className={`${style.name} pb-1 mb-1 fw-bold text-dark`}
                      style={{
                        borderBottom: "3px solid rgba(255, 74, 87, 0.8)",
                        borderColor: "#ff4a57",
                        display: "inline-block",
                      }}
                    >
                      Premium
                    </h5>
                    <p className="">
                      For the ultimate parking experience, our Premium plan
                      offers exclusive perks and premium amenities. Indulge in
                      luxury and convenience as we cater to your every need.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mx-auto">
                <div className={`${style.box}`}>
                  <h4 className={`${style.price}`}>$20 </h4>
                  <h5
                    className={`${style.name} pb-1 mb-1 fw-bold text-dark`}
                    style={{
                      borderBottom: "3px solid rgba(255, 74, 87, 0.8)",
                      borderColor: "#ff4a57",
                      display: "inline-block",
                    }}
                  >
                    Standard
                  </h5>
                  <p>
                    Upgrade to our Standard plan for added benefits and
                    features. Experience enhanced security measures and
                    additional services for a seamless parking experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- end pricing section --> */}

      {/* <!-- client section --> */}

      {/* <section
        className={`${style.client_section} ${
          isXtraSmallScreen ? "" : style.layout_padding
        }`}
      >
        <div className="container">
          <div className={`${style.heading_container} col`}>
            <h3 className="fw-bold">
              What Says Our <span>Client</span>
            </h3>
          </div>
          <div className={`${style.client_container}`}>
            <div className={`${style.carousel_wrap}`}>
              <div
                className={`${style.owl_carousel} ${style.client_owl_carousel}`}
              >
                <div className={`${style.item}`}>
                  <div className={`${style.box}`}>
                    <div className={`${style.detail_box}`}>
                      <p className="">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim
                      </p>
                    </div>
                    <div className={`${style.client_id}`}>
                      <div className={`${style.img_box}`}>
                        <img src={c1} alt="" className="img-1" />
                      </div>
                      <div className={`${style.name}`}>
                        <h6>Lisa Adams</h6>
                        <p>Magna</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${style.item}`}>
                  <div className={`${style.box}`}>
                    <div className={`${style.detail_box}`}>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim Lorem ipsum dolor sit
                        amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim
                      </p>
                    </div>
                    <div className={`${style.client_id}`}>
                      <div className={`${style.img_box}`}>
                        <img src={c2} alt="" className="img-1" />
                      </div>
                      <div className={`${style.name}`}>
                        <h6>Michel Trout</h6>
                        <p>Magna</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- end client section --> */}

      {/* <!-- info section --> */}
      {/* <section className={`${style.info_section} my-4`}>
        <div className="container">
          <div className={`${style.info_top}`}>
            <div className="row ">
              <div className={`col-md-6 col-lg-3 ${style.info_col}`}>
                <div className={`${style.info_form}`}>
                  <h4 className={`text-dark fw-bold`}>Stay Connected</h4>
                  <form action="">
                    <input type="email" placeholder="Enter Your Email" />
                    <button
                      type="submit"
                      className="btn btn-primary btn-block btn-lg  text-dark"
                    >
                      Subscribe
                    </button>
                  </form>
                  <div className="">
                    <a href="">
                      <FacebookIcon
                        sx={{ fontSize: 50 }}
                        color="primary"
                        className="m-2 ms-3"
                      />
                    </a>
                    <a href="">
                      <TwitterIcon
                        sx={{ fontSize: 50 }}
                        className="text-info m-2 ms-3 "
                      />
                    </a>
                    <a href="">
                      <InstagramIcon
                        sx={{ color: pink[500], fontSize: 50 }}
                        className=" m-2  ms-3 "
                      />
                    </a>
                    <a href="">
                      <LinkedInIcon
                        sx={{ fontSize: 50 }}
                        color="primary"
                        className=" m-2 ms-3 "
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className={`col-md-6 col-lg-3 ${style.info_col}`}>
                <div className={`${style.info_detail}`}>
                  <h4 className="text-dark fw-bold">About Us</h4>
                  <p className="text-dark">
                    Necessitatibus, culpa, totam quod neque cum officiis odio,
                    excepturi magnam incidunt voluptates sed voluptate id
                    expedita sint! Cum veritatis iusto molestiae reiciendis
                    deserunt vel odio incidunt, tenetur itaque. Ullam, iste!
                  </p>
                </div>
              </div>
              <div className={`col-md-6 col-lg-3 ${style.info_col}`}>
                <div className={`${style.info_detail}`}>
                  <h4 className="text-dark fw-bold">Online Booking</h4>
                  <p className="text-dark">
                    Accusantium quis architecto, necessitatibus libero nemo
                    facere perferendis obcaecati pariatur magni quod praesentium
                    provident nisi impedit nobis omnis. Assumenda vero impedit
                    dolorum perspiciatis, ipsa quasi corrupti numquam.
                  </p>
                </div>
              </div>
              <div className={`col-md-6 col-lg-3 ${style.info_col}`}>
                <h4 className="text-dark fw-bold">Contact us</h4>
                <p className="text-dark">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit
                </p>
                <div className={`${style.contact_nav}`}>
                  <a href="">
                    <LocationOnIcon color="secondary" className="me-2" />
                    <span className="text-dark">Location</span>
                  </a>
                  <a href="">
                    <CallIcon className="text-info me-2" />
                    <span className="text-dark">Call : +01 123455678990</span>
                  </a>
                  <a href="">
                    <EmailIcon className="text-secondary me-2" />
                    <span className="text-dark">Email : demo@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <!-- end info_section --> */}

      {/* <!-- footer section --> */}
      <Footer />
      {/* <footer className="footer_section">
        <div className="container">
          <p>
            &copy; <span id="displayYear"></span> All Rights Reserved By
            <a href="https://html.design/">Free Html Templates</a>
          </p>
        </div>
      </footer> */}
      {/* <!-- footer section --> */}
    </div>
  );
};

export default Parking;
