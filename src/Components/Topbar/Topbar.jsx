import React, { useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import bgrmvblk from "../../images/bgrmvblk.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import person from "../../images/user.png";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";

const Topbar = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

  const { notification } = useSelector((state) => state.setNotification);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  useEffect(() => {
    const fetchNotification = async () => {
      const data = await axios.get(
        `${api}/notification/getNotification/${user._id}`
      );
      dispatch({ type: "SET_NOTIFICATION", payload: data.data });
    };
    fetchNotification();
  }, []);

  const handleNotication = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      position="sticky"
      backgroundColor="white"
      top={0}
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        borderRadius="3px"
      >
        <div className="container-fluid">
          <Link className={`navbar-brand fs-2 mx-3 `} to="/dashboard">
            <img
              alt="logo"
              style={{ width: "15%", height: "15%" }}
              src={bgrmvblk}
            />
          </Link>
        </div>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <DarkModeOutlinedIcon />
        </IconButton>
        <IconButton>
          <Button
            aria-describedby={id}
            onClick={handleNotication}
          >
            <Badge color="primary" badgeContent={notification.length} max={99}>
              <NotificationsOutlinedIcon />
            </Badge>
          </Button>
          <Popover
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                height: "100%",
                maxHeight: 360,
                bgcolor: "background.paper",
              }}
            >
              {notification === [] ? (
                <CircularProgress />
              ) : (
                notification.map((item) => {
                  return (
                    <>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="Remy Sharp"
                            src={user.photo ? user.photo : person}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.type}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {item.title}
                              </Typography>
                              {` — ${item.message}`}
                              {` — ${item.date}`}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  );
                })
              )}
            </List>
          </Popover>
        </IconButton>
        <IconButton>
          <div>
            <a
              className="nav-link dropdown-toggle w-50"
              href="/"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user.photo ? user.photo : person}
                style={{ width: "25px", height: "25px" }}
                className="rounded-circle border border-2"
                alt="..."
              />
              {/* <span style={{ fontSize: "12px" }}>{user.firstName}</span> */}
            </a>
            <ul className={`dropdown-menu`}>
              <li>
                <Link className={`dropdown-item`} to={`/`}>
                  Home
                </Link>
              </li>
              <li>
                <Link className={`dropdown-item`} to={`/profile`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link className={`dropdown-item`} to={`/profile`}>
                  Account settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className={`dropdown-item`}
                  onClick={() => {
                    navigate("/signin");
                    localStorage.clear();
                    dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
                  }}
                >
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
