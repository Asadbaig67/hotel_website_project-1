import React, { useState } from "react";
import style from "./Sidebar.module.css";
import Navbar from "../adminNavbar/Navbar";
import { useDispatch } from "react-redux";
import {
  SidebarDataAdminProfile,
  SidebarDataAdminProfilePending,
  SidebarDataPatnerProfile,
  SidebarDataPatnerProfilePending,
  SidebarDataUserProfile,
  SidebarDataLogout,
  SidebarDataUserBooking,
  SidebarDataUserUpcomingBooking,
} from "../../Utilis/SidebarData";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Sidebar() {
  const { mode } = useSelector((state) => state.mode);
  const { view } = useSelector((state) => state.view);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  // const [logState, setLogState] = useState(isLogin());

  // const handleLogout = () => {
  //   logout();
  //   setLogState(false);
  // };

  const sidebarProfile = (argument) => {
    return argument.map((element) => {
      const loc = location.pathname;
      return (
        <div key={element.key}>
          <Link
            to={element.link}
            className={`${style.nav__link} ${
              loc === element.link
                ? "text-success"
                : mode === "dark"
                ? "text-light"
                : "text-dark"
            } `}
          >
            <span className={style.nav__icon}>{element.icon}</span>
            <span className={style.nav__name}>{element.title}</span>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      {/* {!logState ? <Navigate to="/login" replace="true" /> : null} */}

      {/* {confirmMessage ? (
        <div
          className="position-fixed w-25
      index2 rounded element"
        >
          <div className="pb-5 shadow-lg ">
            <div className="bg-info rounded-top row justify-content-between">
              <p className="p-2 fw-semibold col-md-2">Logout</p>
              <div className="col-md-1 p-2">
                <CancelIcon
                  className="del_icon"
                  onClick={() => {
                    setConfirmMessage(false);
                  }}
                />
              </div>
            </div>
            <div className="mx-5 mt-5 mb-2">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-4 mx-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setConfirmMessage(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="col-md-4 mx-2">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}
      <header className={style.header}>
        <Navbar />
      </header>
      <div
        className={`${style.nav} bg-${mode === "dark" ? "dark" : "light"}`}
        id="navbar"
      >
        <nav className={style.nav__container}>
          <div>
            <Link
              to="/"
              className={`${style.nav__link} ${style.nav__logo} text-${
                mode === "dark" ? "light" : "dark"
              }`}
            >
              <span className={style.nav__logo__name}>DESALIS</span>
            </Link>

            <div className={style.nav__list}>
              <div className={style.nav__items}>
                <h3
                  className={`${style.nav__subtitle} text-${
                    mode === "dark" ? "light" : "dark"
                  }`}
                >
                  Profile
                </h3>
                {view === "admin" ? (
                  <>
                    {sidebarProfile(SidebarDataAdminProfile)}
                    <h3
                      className={`${style.nav__subtitle} text-${
                        mode === "dark" ? "light" : "dark"
                      }`}
                    >
                      Pending Requests
                    </h3>
                    {sidebarProfile(SidebarDataAdminProfilePending)}
                  </>
                ) : view === "partner" ? (
                  <>
                    {sidebarProfile(SidebarDataPatnerProfile)}
                    <h3
                      className={`${style.nav__subtitle} text-${
                        mode === "dark" ? "light" : "dark"
                      }`}
                    >
                      Pending Approvals
                    </h3>
                    {sidebarProfile(SidebarDataPatnerProfilePending)}
                  </>
                ) : (
                  <>
                    {sidebarProfile(SidebarDataUserProfile)}
                    <h3
                      className={`${style.nav__subtitle} text-${
                        mode === "dark" ? "light" : "dark"
                      }`}
                    >
                      My Bookings
                    </h3>
                    {sidebarProfile(SidebarDataUserBooking)}
                    <h3
                      className={`${style.nav__subtitle} text-${
                        mode === "dark" ? "light" : "dark"
                      }`}
                    >
                      Upcoming Bookings
                    </h3>
                    {sidebarProfile(SidebarDataUserUpcomingBooking)}
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            className={`${style.nav__link} ${style.nav__logout} text-${
              mode === "dark" ? "light" : "dark"
            }`}
            onClick={() => {
              setConfirmMessage(true);
              dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
            }}
          >
            {SidebarDataLogout.map((element) => {
              return (
                <div key={element.title}>
                  <span className={style.nav__icon}>{element.icon}</span>
                  <span className={style.nav__name}>{element.title}</span>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
