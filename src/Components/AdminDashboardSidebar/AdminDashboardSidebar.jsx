import React, { useState, useEffect, useRef } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import person from "../../images/user.png";
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
import styles from "./AdminDashboardSidebar.module.css";
import styled from "styled-components";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        active={selected === title}
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

const ItemLogout = ({ title, icon, selected, setSelected }) => {
  const location = useLocation();
  const loc = location.pathname;
  const style = {
    backgroundColor: "#c2c2c2",
  };

  return (
    <StyledMenuItem
      active={selected === title}
      style={style}
      onClick={() => {
        setSelected(title);
      }}
      icon={icon}
    >
      {title}
    </StyledMenuItem>
  );
};

const SidebarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { view } = useSelector((state) => state.view);
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

  //For Mobile Rsponsive of Navbar Search Bar
  const isMobile = useMediaQuery("(max-width: 400px)");
  const isDesktop = useMediaQuery("(max-width: 992px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (isTablet) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isTablet]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const logout = () => {
    navigate("/signin");
    localStorage.clear();
    dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
  };

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
              backgroundColor: "#c2c2c2",
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
                  src={user.photo ? user.photo : person}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h5"
                  // color={colors.grey[100]}
                  //   fontWeight=""
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.firstName + " " + user.lastName}
                </Typography>
                <Typography
                  variant="h6"
                  //   color={colors.greenAccent[500]}
                >
                  {user.account_type}
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
              onClick={handleClickOpen}
            >
              {SidebarDataLogout.map((item) => {
                return (
                  <ItemLogout
                    key={item.key}
                    title={item.title}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Logout"}</DialogTitle>
        <hr className="m-0" />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" color="error" onClick={logout}>Log out</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SidebarAdmin;
