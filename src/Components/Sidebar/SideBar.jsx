import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "./Sidebar.css";
import {
  SidebarDataAdminProfile,
  SidebarDataAdminProfilePending,
  SidebarDataPatnerProfile,
  SidebarDataPatnerProfilePending,
  SidebarDataUserProfile,
  SidebarDataUserBooking,
  SidebarDataUserUpcomingBooking,
} from "../../Utilis/SidebarData";
import { useDispatch, useSelector } from "react-redux";

const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.openSidebar);
  const toggle = () => dispatch({ type: "TOGGLESIDEBAR", payload: !isOpen });
  const { view } = useSelector((state) => state.view);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const sidebarDataFunction = (routes) => {
    return (
      <>
        {routes.map((route, index) => {
          return (
            <NavLink
              to={route.link}
              key={index}
              className="link"
              activeClassName="activee"
            >
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {route.title}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="main-container h-100">
        <motion.div
          animate={{
            width: isOpen ? "300px" : "45px",
          }}
          style={{ zIndex: "6" }}
          className={`sidebar`}
        >
          <div className="top_section ms-1">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Admin
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>
          <section className="routes">
            {view === "admin" ? (
              <>
                {sidebarDataFunction(SidebarDataAdminProfile)}
                <h3 className={`${isOpen ? "" : "d-none"} divider_heading`}>
                  Pending Requests
                </h3>
                {sidebarDataFunction(SidebarDataAdminProfilePending)}
              </>
            ) : view === "partner" ? (
              <>
                {sidebarDataFunction(SidebarDataPatnerProfile)}
                <h3 className={`${isOpen ? "" : "d-none"} divider_heading`}>
                  Pending Requests
                </h3>
                {sidebarDataFunction(SidebarDataPatnerProfilePending)}
              </>
            ) : view === "user" ? (
              <>
                {sidebarDataFunction(SidebarDataUserProfile)}
                <h3 className={`${isOpen ? "" : "d-none"} divider_heading`}>
                  Your Bookings
                </h3>
                {sidebarDataFunction(SidebarDataUserBooking)}
                <h3 className={`${isOpen ? "" : "d-none"} divider_heading`}>
                  Your Upcoming Bookings
                </h3>
                {sidebarDataFunction(SidebarDataUserUpcomingBooking)}
              </>
            ) : null}
          </section>
        </motion.div>

        <main
          style={{
            margin: `${isOpen ? "130px" : "0px"}`,
            transitionDelay: `${isOpen ? "0.1s" : "0.2s"}`,
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default SideBar;
