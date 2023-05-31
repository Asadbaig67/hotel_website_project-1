import React, { useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import bgrmvblk from "../../images/bgrmvblk.png";
import { Link } from "react-router-dom";

const Topbar = () => {
  //   const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);
  //   const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <div className="container-fluid">
          <Link
            className={`navbar-brand fs-2 mx-3 `}
            to="/dashboard"
          >
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
          <PersonOutlineOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
