import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Tooltip, useMediaQuery, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import pic from "./pic.jpg";
import axios from "axios";
import { IconButton } from "@mui/material";
import moment from "moment";

const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [notificationDotVisible, setNotificationDotVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const open = Boolean(anchorEl);
  const openNotification = Boolean(anchorElNotification);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickNotification = (event) => {
    if (notifications.length > 0) setAnchorElNotification(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNotification = () => {
    setAnchorElNotification(null);
  };
  const isTablet = useMediaQuery("(max-width:992px)");
  const HandleLogout = async () => {
    localStorage.clear();
    dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
    dispatch({ type: "LOGIN", payload: false });
    navigate("/");
  };
  useEffect(() => {
    const getNotifications = async () => {
      const res = await axios.get(
        `${api}/notification/getNotification/${user._id}`
      );
      const data = res.data;
      const unread = data.filter((item) => item.read === false);
      setNotifications(data.reverse());
      if (!(unread.length > 0)) {
        setNotificationDotVisible(true);
      } else {
        setNotificationDotVisible(false);
      }
    };
    getNotifications();
  }, []);

  const markAsRead = async (notification) => {
    const id = notification._id;
    console.log(notification);
    const res = await axios.put(`${api}/notification/markAsRead/${id}`);
    console.log(res.data);
  };
  return (
    <nav
      class="navbar navbar-expand-lg bg-body-tertiary"
      style={{
        zIndex: "4",
        position: "fixed",
        marginLeft: "45px",
        top: "0",
        left: "0",
        right: "0",
        backgroundColor: "#00073d",
      }}
    >
      <div class="container-fluid">
        <a
          class="navbar-brand fs-3 p-0 mx-auto text-light"
          style={{ fontFamily: "sans-serif" }}
        >
          Desalis
        </a>
        {isTablet && (
          <div className="d-flex">
            <Tooltip
              title={`${
                !notificationDotVisible ? "Notifications" : "No notifications"
              }`}
              arrow
            >
              <IconButton
                id="demo-positioned-button"
                aria-controls={
                  openNotification ? "demo-positioned-menu" : undefined
                }
                sx={{ color: "white", padding: "0" }}
                aria-haspopup="true"
                aria-expanded={openNotification ? "true" : undefined}
                onClick={handleClickNotification}
              >
                <Badge
                  variant="dot"
                  invisible={notificationDotVisible}
                  color="primary"
                  size="small"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Menu" arrow>
              <IconButton
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                sx={{ color: "white" }}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>

      <div>
        {!isTablet && (
          <div className="d-flex">
            <Tooltip
              title={`${
                !notificationDotVisible ? "Notifications" : "No notifications"
              }`}
              arrow
            >
              <IconButton
                id="demo-positioned-notification-button"
                aria-controls={
                  openNotification
                    ? "demo-positioned-notification-menu"
                    : undefined
                }
                sx={{ color: "white !important", padding: "0" }}
                aria-haspopup="true"
                aria-expanded={openNotification ? "true" : undefined}
                onClick={handleClickNotification}
              >
                <Badge
                  variant="dot"
                  invisible={notificationDotVisible}
                  color="primary"
                  size="small"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Menu" arrow>
              <Button
                id="demo-positioned-button"
                aria-controls={open ? "demo-positioned-menu" : undefined}
                sx={{ color: "white" }}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </Button>
            </Tooltip>
          </div>
        )}

        {/* More Options */}
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          PaperProps={{
            style: {
              width: "150px", // Set your desired width here
              borderRadius: "10px",
            },
          }}
        >
          <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
          <hr className="mx-2 my-0" />
          <MenuItem
            onClick={() =>
              navigate(
                `/${user.account_type}${
                  user.account_type === "partner" ? `/${user.partner_type}` : ""
                }/profile`
              )
            }
          >
            My Profile
          </MenuItem>
          <hr className="mx-2 my-0" />
          <MenuItem onClick={HandleLogout}>Logout</MenuItem>
        </Menu>

        {/* Notification */}
        <Menu
          id="demo-positioned-notification-menu"
          aria-labelledby="demo-positioned-notification-button"
          anchorEl={anchorElNotification}
          open={openNotification}
          onClose={handleCloseNotification}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            style: {
              width: "300px", // Set your desired width here
              borderRadius: "10px",
              maxHeight: "400px",
              overflow: "auto",
            },
          }}
        >
          {notifications &&
            notifications.map((notification, i) => {
              return (
                <>
                  <MenuItem
                    className={`${
                      !notification.read ? "bg-primary bg-opacity-25" : ""
                    } `}
                    onClick={() => {
                      markAsRead(notification);
                    }}
                  >
                    <div className={`row justify-content-between w-100`}>
                      <div className="col-2">
                        <img
                          src={pic}
                          alt="pic"
                          className="rounded-circle"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </div>
                      <div className="col-9">
                        <div>
                          <p
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              fontWeight: "bold",
                              fontSize: "10px",
                            }}
                          >
                            {notification.title}
                          </p>
                          <p
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              fontSize: "12px",
                            }}
                          >
                            {notification.message}
                          </p>
                          <p
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              fontSize: "10px",
                            }}
                          >
                            {moment(notification.date).format(
                              "MMMM D, YYYY HH:mm:ss"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </MenuItem>
                  {notifications.length - 1 === i ? null : (
                    <hr className="m-0" />
                  )}
                  {/* <hr className="mx-4"/> */}
                </>
              );
            })}
        </Menu>
      </div>
    </nav>
  );
};

export default AdminNav;
