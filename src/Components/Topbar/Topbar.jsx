import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import bgrmvblk from "../../images/bgrmvblk.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import person from "../../images/user.png";

const Topbar = () => {
  //   const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);
  //   const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
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
          {/* <LightModeOutlinedIcon /> */}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        {/* <IconButton><SettingsOutlinedIcon /></IconButton> */}
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
