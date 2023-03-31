import React from "react";
import Sidebar from "../../Components/adminSidebar/Sidebar";
import style from "./Dashboard.module.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { adminCard, patnerCard, userCard } from "../../Utilis/DashboardData";
import { useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { mode } = useSelector((state) => state.mode);
  const { view } = useSelector((state) => state.view);
  const IsMedium = useMediaQuery("(max-width:1000px)");


  const card = (argument) => {
    return argument.map((element) => {
      return (
        <div className="col-md-5" key={element.key}>
          <div className={style.wrapper}>
            <Link className={`${style.card1} rounded-3`} to={element.link}>
              <h3>{element.title}</h3>
              <p className="small">{element.description} </p>
              <Link className={style.go_corner} to={element.link}>
                <div className={style.go_arrow}>→</div>
              </Link>
            </Link>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Sidebar />
      <div className={`bg-${mode === "light" ? "light" : "dark"} ${IsMedium ? "mt-5" : ""}`}>
        <div className={`bg-success w-100`}>
          <div className="d-flex align-items-center py-4 text-light">
            <ArrowForwardIosIcon className={style.header_icon} />
            <h1 className={style.header_item}>DashBoard</h1>
            <ArrowBackIosNewIcon className={style.header_icon} />
          </div>
        </div>

        <div className={`row justify-content-center mt-4`}>
          {view === "admin"
            ? card(adminCard)
            : view === "patner"
            ? card(patnerCard)
            : card(userCard)}
        </div>
      </div>
    </>
  );
}
