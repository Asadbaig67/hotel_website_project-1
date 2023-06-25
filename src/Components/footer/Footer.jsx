import style from "./footer.module.css";
import { Link } from "react-router-dom";
import MailList from "../mailList/MailList";
import { useMediaQuery } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InfoIcon from "@mui/icons-material/Info";
import Hotel from "@mui/icons-material/Hotel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PeopleIcon from "@mui/icons-material/People";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Footer = () => {
  const isXtraSmallScreen = useMediaQuery("(max-width:576px)");

  return (
    <footer
      className="pt-4 pb-4 text-white position-absolute end-0 container-fluid"
      style={{ backgroundColor: "#003580", marginTop: "25px" }}
    >
      <div className="container text-md-left">
        <div
          className={`row  ${
            isXtraSmallScreen ? "text-start ms-2" : "text-start"
          } text-md-left justify-content-between`}
        >
          <div
            className={`col-lg-5 ${
              isXtraSmallScreen ? "ps-4" : ""
            } my-1 col-xl-3 col-md-5 col-sm-5 col-8`}
          >
            <h5 className="text-uppercase" style={{ fontSize: "20px" }}>
              Quick Links
            </h5>

            <ul className={`${style.fList} mt-4`}>
              <li className={style.fListItem}>
                <Link to="/" className="d-flex justify-content-start">
                  <Hotel className="me-2" />
                  <span className="fs-6">Hotel</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/parking" className="d-flex justify-content-start">
                  <DirectionsCarIcon className="me-2" />
                  <span className="fs-6">Parking</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link
                  to="/HotelAndParking"
                  className="d-flex justify-content-start"
                >
                  <Hotel className="me-2" />
                  <span className="fs-6">Hotel And Parking</span>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`col-lg-5 ${
              isXtraSmallScreen ? "ps-4" : ""
            } my-1 col-xl-3 col-md-5 col-sm-5 col-8`}
          >
            <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
              Company
            </h4>

            <ul className={`${style.fList} mt-4`}>
              <li className={style.fListItem}>
                <Link to="/about" className="d-flex justify-content-start">
                  <InfoIcon className="me-2" />
                  <span className="fs-6">About Us</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/" className="d-flex justify-content-start">
                  <PeopleIcon className="me-2" />
                  <span className="fs-6">Our Partners</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/" className="d-flex justify-content-start">
                  <PersonOutlineIcon className="me-2" />
                  <span className="fs-6">Our Clients</span>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`col-lg-5 ${
              isXtraSmallScreen ? "ps-4" : ""
            } my-1 col-xl-3 col-md-5 col-sm-5 col-8`}
          >
            <h4 className="text-uppercase" style={{ fontSize: "20px" }}>
              Contact Us
            </h4>

            <ul className={`${style.fList} mt-4`}>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <CallIcon className="me-2" />{" "}
                  <span className=" fs-6">+92 (233) 5263282</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <CallIcon className="me-2" />
                  <span className="fs-6">+92 (303) 1233980</span>
                </Link>
              </li>
              <li className={style.fListItem}>
                <Link to="/contact" className="d-flex justify-content-start">
                  <EmailIcon className="me-2" />
                  <span className="fs-6">info@desalis.com</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-5 my-1 col-xl-3 col-md-5 col-sm-5 col-8">
            <MailList />
          </div>
          <hr className="mt-3 " />
          <div className="row m-0">
            <div
              className={`${
                isXtraSmallScreen ? "text-center" : "text-start"
              }  col-xl-6 col-md-6 col-12`}
            >
              <InstagramIcon className={`mx-1 fs-1  ${style.insta} `} />
              <FacebookIcon className={`mx-1 fs-1 ${style.facebook}`} />
              <TwitterIcon className={`mx-1 fs-1 ${style.tweeter}`} />
              <LinkedInIcon className={`mx-1 fs-1 ${style.linkedin}`} />
            </div>
            <div
              className={`${
                isXtraSmallScreen ? "text-center" : "text-end"
              }  col-xl-6 col-md-6 col-12`}
              style={{ fontSize: "20px" }}
            >
              Copyright © 2022 DESALIS.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
