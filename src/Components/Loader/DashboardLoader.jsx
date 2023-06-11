import React from "react";
import style from "./dashboardloader.module.css";
import AdminSidebar from "../adminSidebar/AdminSidebar";

const DashboardLoader = () => {
  return (
    <div>
      <AdminSidebar />
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
