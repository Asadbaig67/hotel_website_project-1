import React from "react";
import style from "./dashboardloader.module.css";
import Sidebar from "../Sidebar/SideBar";

const DashboardLoader = () => {
  return (
    <div>
      <Sidebar />
      <div className={style.loader_dash}>
        <div className={style.bar_dash}></div>
        <div className={style.bar_dash}></div>
        <div className={style.bar_dash}></div>
        <div className={style.bar_dash}></div>
      </div>
    </div>
  );
};

export default DashboardLoader;
