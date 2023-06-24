import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Featured from "../../Components/featured/Featured";
import FeaturedProperties from "../../Components/featuredProperties/FeaturedProperties";
import Footer from "../../Components/footer/Footer";

import style from "./hotelandparking.module.css";

const HotelAndParking = () => {
  return (
    <div>
      <Navbar list={true} />

      <div className={`${style.homeContainer} container`}>
        <Featured />
        
        <h1 className={`${style.homeTitle} container`}>Homes guests love</h1>
        <FeaturedProperties />
      </div>
      <Footer />
    </div>
  );
};

export default HotelAndParking;
