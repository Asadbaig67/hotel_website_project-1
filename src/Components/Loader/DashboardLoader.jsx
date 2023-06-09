import React from "react";
import style from "./dashboardloader.module.css";
import AdminSidebar from "../adminSidebar/AdminSidebar";

const DashboardLoader = () => {
  return (
    <div>
      <AdminSidebar />
      <div class={style.loader_dash}>
        <div class={style.bar_dash}></div>
        <div class={style.bar_dash}></div>
        <div class={style.bar_dash}></div>
        <div class={style.bar_dash}></div>
      </div>
    </div>
  );
};

export default DashboardLoader;
