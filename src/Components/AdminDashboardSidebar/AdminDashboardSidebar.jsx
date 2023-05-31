import React, { useEffect } from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import user from "../../images/user.png";
import { useMediaQuery } from "@mui/material";

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
import style from "./AdminDashboardSidebar.module.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <Link to={to}>
      <MenuItem
        active={selected === title}
        style={{ color: "#141414" }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const SidebarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("dashboard");
  const { view } = useSelector((state) => state.view);

  //For Mobile Rsponsive of Navbar Search Bar
  const isMobile = useMediaQuery("(max-width: 400px)");
  const isDesktop = useMediaQuery("(max-width: 992px)");
  const isTablet = useMediaQuery("(max-width: 768px)");


  useEffect(() => {
    if (isTablet) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isTablet]);

  return (
    <Box
      sx={{
        background: `#c2c2c2 !important`,
        "& .pro-sidebar-inner": {},
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              // color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h5"
                  //    color={colors.grey[100]}
                >
                  DESALIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                sx={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "50%",
                  height: "50%",
                }}
              >
                <img
                  alt="profile-user"
                  width="100%"
                  height="100%"
                  src={user}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  // color={colors.grey[100]}
                  //   fontWeight=""
                  sx={{ m: "10px 0 0 0" }}
                >
                  john doe
                </Typography>
                <Typography
                  variant="h4"
                  //   color={colors.greenAccent[500]}
                >
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {view === "admin" ? (
              <>
                {!isCollapsed ? (
                  <h3 className={style.nav__subtitle}>Dashboard</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={style.nav__subtitle}
                  >
                    Dashboard
                  </h3>
                )}
                {SidebarDataAdminProfile.map((item, index) => {
                  return (
                    <Item
                      key={item.key}
                      title={item.title}
                      to={item.link}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
                {!isCollapsed ? (
                  <h3 className={style.nav__subtitle}>Pending Approvals</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={style.nav__subtitle}
                  >
                    Pending Approvals
                  </h3>
                )}
                {SidebarDataAdminProfilePending.map((item, index) => {
                  return (
                    <Item
                      key={item.key}
                      title={item.title}
                      to={item.link}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
              </>
            ) : view === "partner" ? (
              <>
                {!isCollapsed ? (
                  <h3 className={style.nav__subtitle}>Dashboard</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={style.nav__subtitle}
                  >
                    Dashboard
                  </h3>
                )}
                {SidebarDataPatnerProfile.map((item, index) => {
                  return (
                    <Item
                      key={item.key}
                      title={item.title}
                      to={item.link}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
                {!isCollapsed ? (
                  <h3 className={style.nav__subtitle}>Pending Approvals</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={style.nav__subtitle}
                  >
                    Pending Approvals
                  </h3>
                )}
                {SidebarDataPatnerProfilePending.map((item, index) => {
                  return (
                    <Item
                      key={item.key}
                      title={item.title}
                      to={item.link}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
              </>
            ) : (
              <>
                {!isCollapsed ? (
                  <h3 className={style.nav__subtitle}>Dashboard</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={style.nav__subtitle}
                  >
                    Dashboard
                  </h3>
                )}
                {SidebarDataUserProfile.map((item, index) => {
                  return (
                    <Item
                      key={item.key}
                      title={item.title}
                      to={item.link}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
                {!isCollapsed ? (
                  <h3 className={style.nav__subtitle}>My Bookings</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={style.nav__subtitle}
                  >
                    My Bookings
                  </h3>
                )}
                {SidebarDataUserBooking.map((item, index) => {
                  return (
                    <Item
                      key={item.key}
                      title={item.title}
                      to={item.link}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
                {!isCollapsed ? (
                  <h3 className={style.nav__subtitle}>Upcoming Bookings</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={style.nav__subtitle}
                  >
                    Upcoming Bookings
                  </h3>
                )}
                {SidebarDataUserUpcomingBooking.map((item, index) => {
                  return (
                    <Item
                      key={item.key}
                      title={item.title}
                      to={item.link}
                      icon={item.icon}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  );
                })}
              </>
            )}

            <Box
              className={`${style.nav__link} ${style.nav__logout}`}
              onClick={() => {
                navigate("/signin");
                localStorage.clear();
                dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
              }}
            >
              {SidebarDataLogout.map((item) => {
                return (
                  <Item
                    key={item.key}
                    title={item.title}
                    to={item.link}
                    icon={item.icon}
                    selected={selected}
                    setSelected={setSelected}
                  />
                );
              })}
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarAdmin;
