import React from "react";
import { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Featured from "../../Components/featured/Featured";
import FeaturedProperties from "../../Components/featuredProperties/FeaturedProperties";
import Footer from "../../Components/footer/Footer";
import MailList from "../../Components/mailList/MailList";
// import PropertyList from "../../Components/propertyList/PropertyList";
import style from "./home.module.css";
import { useMediaQuery } from "@mui/material";

const Home = (props) => {
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const isXtraSmallScreen = useMediaQuery("(max-width: 450px)");
  const logout = () => {
    window.open(`${api}/user/logout`, "_self");
  };

  // State For Logged In User
  const [user, setUser] = useState(null);

  // Api Request To Get Logged In User
  const getUser = async () => {
    try {
      const url = `${api}/user/login`;
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar list={true} />
      <div className={`${style.homeContainer} container`}>
        <h1
          className={`${style.homeTitle} fw-bold ${
            isXtraSmallScreen ? "fs-4" : "fs-3"
          }`}
        >
          Find your perfect stay
        </h1>

        <Featured />

        <h1
          className={`${style.homeTitle}  fw-bold ${
            isXtraSmallScreen ? "fs-4" : "fs-3"
          }`}
        >
          Hotels Guests love
        </h1>
        <FeaturedProperties />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
