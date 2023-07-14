import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isTablet = useMediaQuery("(max-width:992px)");
  const HandleLogout = async () => {
    localStorage.clear();
    dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
    dispatch({ type: "LOGIN", payload: false });
    navigate("/");
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
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
        )}
      </div>

      <div>
        {!isTablet && (
          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
        )}
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
        >
          <MenuItem>
            <Link to="/" style={{ color: "black" }}>
              Home
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/profile" style={{ color: "black" }}>
              My Profile
            </Link>
          </MenuItem>
          <MenuItem onClick={HandleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </nav>
  );
};

export default AdminNav;
