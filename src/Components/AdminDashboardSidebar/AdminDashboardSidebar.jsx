import React from "react";
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import user from "../../images/user.png";
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
import styles from "./AdminDashboardSidebar.module.css";
import styled from "styled-components";

const StyledMenuItem = styled(MenuItem)`
  color: #141414;
  &:hover {
    color: #6870fa;
  }
  &:active {
    color: #4cceac;
  }
`;

const Item = ({ title, to, icon, selected, setSelected }) => {
  const location = useLocation();
  const loc = location.pathname;
  const style = {
    backgroundColor: "#c2c2c2",
  };
  return (
    <Link to={to}>
      <StyledMenuItem
        style={style}
        onClick={() => {
          setSelected(title);
        }}
        icon={icon}
      >
        {title}
      </StyledMenuItem>
    </Link>
  );
};

const SidebarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { view } = useSelector((state) => state.view);

  return (
    <Box>
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor="#c2c2c2"
        transitionDuration="80"
      >
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
                  <h3 className={styles.nav__subtitle}>Dashboard</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={styles.nav__subtitle}
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
                  <h3 className={styles.nav__subtitle}>Pending Approvals</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={styles.nav__subtitle}
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
                  <h3 className={styles.nav__subtitle}>Dashboard</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={styles.nav__subtitle}
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
                  <h3 className={styles.nav__subtitle}>Pending Approvals</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={styles.nav__subtitle}
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
                  <h3 className={styles.nav__subtitle}>Dashboard</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={styles.nav__subtitle}
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
                  <h3 className={styles.nav__subtitle}>My Bookings</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={styles.nav__subtitle}
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
                  <h3 className={styles.nav__subtitle}>Upcoming Bookings</h3>
                ) : (
                  <h3
                    style={{ fontSize: "0.6rem" }}
                    className={styles.nav__subtitle}
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
              className={`${styles.nav__link} ${styles.nav__logout}`}
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
