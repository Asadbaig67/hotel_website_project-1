import React from "react";
import style from "./Loader.module.css";
import logo from "../../images/bgrmvblk.png";

const Loader = () => {
  return (
    <div className="container-fluid" style={{ overflowX: "hidden" }}>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ height: "50vh" }}
      >
        <img
          src={logo}
          className="mb-3"
          style={{ height: "100px", width: "100px" }}
          alt=""
        />
        <div className={style.loader}></div>
      </div>
    </div>
  );
};

export default Loader;
