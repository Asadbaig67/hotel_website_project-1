import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
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
import { useSelector } from "react-redux";

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { view } = useSelector((state) => state.view);

  // const inputAnimation = {
  //   hidden: {
  //     width: 0,
  //     padding: 0,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  //   show: {
  //     width: "140px",
  //     padding: "5px 15px",
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

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
          if (route.subRoutes) {
            return (
              <SidebarMenu
                setIsOpen={setIsOpen}
                route={route}
                showAnimation={showAnimation}
                isOpen={isOpen}
              />
            );
          }

          return (
            <NavLink
              to={route.link}
              key={index}
              className="link"
              activeClassName="active_tab"
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
      <div className="main-container " style={{ position: "fixed" }}>
        <motion.div
          animate={{
            width: isOpen ? "300px" : "45px",

            // transition: {
            //   duration: 0.2,
            //   type: "spring",
            //   damping: 8,
            // },
          }}
          className={`sidebar`}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
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

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
