import React, { useEffect, useState } from "react";
import style from "./navbar.module.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";
import ParkingDate from "../DateForPaking/ParkingDate";
import Dates from "../date/Date";
import Dropdown from "../dropdown/Dropdown";
import hotel from "../../images/hotel-bg.jpg";
import hotelparking from "../../images/hotelparking-bg.jpg";
import parking from "../../images/parking-bg.jpg";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import RemoveIcon from "@mui/icons-material/Remove";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import bgrmvblk from "../../images/bgrmvblk.png";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import axios from "axios";

const Navbar = ({ list }) => {
  // Get Logged In User
  const { login } = useSelector((state) => state.setLogin);
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);

  // Dashboard Access And Logout
  const [sidetooltip, setTooltip] = useState(null);
  const openTooltip = Boolean(sidetooltip);
  const handleonClick = (event) => {
    setTooltip(event.currentTarget);
  };
  const handleonClose = () => {
    setTooltip(null);
  };

  // Popover Material UI Code
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const id = open ? "simple-popover" : undefined;
  const id1 = open1 ? "simple-popover" : undefined;

  // Popover Material UI Code
  const dispatch = useDispatch();

  // Hotel City
  const { city } = useSelector((state) => state.searchCity);
  // Parking City
  const { cityParking } = useSelector((state) => state.searchParkingCity);
  // Hotel And Parking City
  const { cityHotelAndParking } = useSelector(
    (state) => state.searchHotelAndParkingCity
  );
  const { dates } = useSelector((state) => state.searchDate);
  const datesParking = useSelector((state) => state.searchParkingDate.dates);
  const { resultPerson } = useSelector((state) => state.personAlert);
  const { resultCity } = useSelector((state) => state.cityAlert);
  const { resultVehicle } = useSelector((state) => state.vehicleAlert);
  const { resultDate } = useSelector((state) => state.dateAlert);
  const { resultDateTime } = useSelector((state) => state.dateTimeAlert);
  const { c } = useSelector((state) => state.searchVehicle);
  const { activePath } = useSelector((state) => state.activePath);
  const { options } = useSelector((state) => state.searchOption);
  const location = useLocation();
  const path = location.pathname;
  const [navSearch, setNavSearch] = useState(false);
  const [nav2, setNav2] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [alertShow, setAlertShow] = useState(false);
  const [option, setOption] = useState(options);
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const navigate = useNavigate();

  //For Mobile Rsponsive of Navbar Search Bar
  const isMobile = useMediaQuery("(max-width: 400px)");
  const isDesktop = useMediaQuery("(max-width: 992px)");
  const isTablet = useMediaQuery("(max-width: 768px)");

  const validRoom = () => {
    const numOfPerson = options.adult + option.children;
    const totalSingleRoomCapacity = option.singleRoom;
    const totalTwinRoomCapacity = option.twinRoom * 2;
    const totalfamilyRoomCapacity = option.familyRoom * 5;
    const totalRoomCapacity =
      totalSingleRoomCapacity + totalTwinRoomCapacity + totalfamilyRoomCapacity;
    if (numOfPerson > totalRoomCapacity) {
      return true;
    }
    return false;
  };

  // Hidding Alerts After Two Seconds
  if (
    resultPerson ||
    resultCity ||
    resultVehicle ||
    resultDate ||
    resultDateTime
  ) {
    setTimeout(() => {
      dispatch({
        type: "ALERTPERSON",
        payload: false,
      });
      dispatch({
        type: "ALERTCITY",
        payload: false,
      });
      dispatch({
        type: "ALERTVEHICLE",
        payload: false,
      });
      dispatch({
        type: "ALERTDATE",
        payload: false,
      });
      dispatch({
        type: "ALERTDATETIME",
        payload: false,
      });
    }, 2000);
  }

  const handleOnSearch = async () => {
    dispatch({ type: "SET_FEATURED_DATA", payload: [] });
    setOpenOptions(false);
    if (path === "/") {
      dispatch({
        type: "ALERTPERSON",
        payload: validRoom(),
      });
      if (city === "") {
        dispatch({
          type: "ALERTCITY",
          payload: true,
        });
      } else {
        dispatch({
          type: "ALERTCITY",
          payload: false,
        });
      }
      if (dates[0] === undefined || dates[1] === undefined) {
        dispatch({
          type: "ALERTDATE",
          payload: true,
        });
      } else {
        dispatch({
          type: "ALERTDATE",
          payload: false,
        });
      }
    } else if (path === "/parking") {
      if (cityParking === "") {
        dispatch({
          type: "ALERTCITY",
          payload: true,
        });
      } else {
        dispatch({
          type: "ALERTCITY",
          payload: false,
        });
      }
      if (datesParking[0] === undefined || datesParking[1] === undefined) {
        dispatch({
          type: "ALERTDATETIME",
          payload: true,
        });
      } else {
        dispatch({
          type: "ALERTDATE",
          payload: false,
        });
      }
      if (path !== "/" && c === "") {
        dispatch({
          type: "ALERTVEHICLE",
          payload: true,
        });
      } else {
        dispatch({
          type: "ALERTVEHICLE",
          payload: false,
        });
      }
    } else if (path === "/HotelAndParking") {
      dispatch({
        type: "ALERTPERSON",
        payload: validRoom(),
      });
      if (cityHotelAndParking === "") {
        dispatch({
          type: "ALERTCITY",
          payload: true,
        });
      } else {
        dispatch({
          type: "ALERTCITY",
          payload: false,
        });
      }
      if (dates[0] === undefined || dates[1] === undefined) {
        dispatch({
          type: "ALERTDATE",
          payload: true,
        });
      } else {
        dispatch({
          type: "ALERTDATE",
          payload: false,
        });
      }
      if (c === "") {
        dispatch({
          type: "ALERTVEHICLE",
          payload: true,
        });
      } else {
        dispatch({
          type: "ALERTVEHICLE",
          payload: false,
        });
      }
    }

    if (
      (path === "/" &&
        (city === "" ||
          dates[0] === undefined ||
          dates[1] === undefined ||
          validRoom())) ||
      (path === "/parking" &&
        (cityParking === "" ||
          datesParking[0] === undefined ||
          datesParking[1] === undefined ||
          c === "")) ||
      (path === "/HotelAndParking" &&
        (cityHotelAndParking === "" ||
          dates[0] === undefined ||
          dates[1] === undefined ||
          validRoom() ||
          c === ""))
    ) {
      // alert("Please fill all the fields");
      return;
    }

    if (option) {
      dispatch({
        type: "SET_OPTION",
        payload: option,
      });
    }

    navSearch
      ? navigate(`/listHotel`)
      : nav2
      ? navigate("/HotelAndParkingList")
      : navigate(`/ParkingList`);

    if (path === "/parking") {
      try {
        const url = `${api}/parking/search?city=${cityParking}&vehicles=${c}`;
        const response = await fetch(url, {
          method: "GET",
          // credentials: "include",
        });
        const { parkingList } = await response.json();
        if (parkingList) {
          dispatch({
            type: "SET_PARKING_DATA",
            payload: parkingList,
          });
        } else {
          dispatch({
            type: "SET_PARKING_DATA",
            payload: { message: "No Parking Found" },
          });
        }
      } catch (error) {}
    }
  };

  const HandleLogout = async () => {
    localStorage.clear();
    dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
    dispatch({ type: "LOGIN", payload: false });
    navigate("/");
  };

  useEffect(() => {
    if (path === "/" || path === "/listHotel" || path === "/singleHotel") {
      dispatch({
        type: "activePath",
        payload: "hotel",
      });
    } else if (path === "/parking" || path === "/ParkingList") {
      dispatch({
        type: "activePath",
        payload: "parking",
      });
    } else if (
      path === "/HotelAndParking" ||
      path === "/HotelAndParkingList" ||
      path === "/singleHotelAndParking"
    ) {
      dispatch({
        type: "activePath",
        payload: "hotelAndParking",
      });
    } else {
      dispatch({
        type: "activePath",
        payload: "",
      });
    }

    if (path === "/") {
      setNavSearch(true);
    } else if (path === "/HotelAndParking") {
      setNav2(true);
    } else if (path === "/parking") {
      setNav2(false);
      setNavSearch(false);
    }

    if (path === "/" || path === "/HotelAndParking" || path === "/parking") {
      setOption({
        adult: 1,
        children: 0,
        singleRoom: 1,
        twinRoom: 0,
        familyRoom: 0,
      });

      dispatch({
        type: "SET_DATE",
        payload: [],
      });

      dispatch({
        type: "SET_CITY",
        payload: "",
      });

      dispatch({
        type: "SET_HOTELANDPARKINGCITY",
        payload: "",
      });

      dispatch({
        type: "SET_PARKINGCITY",
        payload: "",
      });

      dispatch({
        type: "INCREMENT",
        payload: "",
      });
    }

    dispatch({
      type: "ALERTPERSON",
      payload: false,
    });

    dispatch({
      type: "ALERTCITY",
      payload: false,
    });

    dispatch({
      type: "ALERTVEHICLE",
      payload: false,
    });

    dispatch({
      type: "ALERTDATE",
      payload: false,
    });

    dispatch({
      type: "ALERTDATETIME",
      payload: false,
    });
  }, [path]);

  useEffect(() => {
    dispatch({
      type: "SET_OPTION",
      payload: option,
    });
  }, [option]);

  const [color, setColor] = useState("#fff");

  useEffect(() => {
    $(window).scroll(() => {
      let scroll = $(window).scrollTop();
      let box = $(`.${style.header_text}`).height();
      let header = $("header").height();
      if (scroll > box - header) {
        setColor("silver");
        $("header").addClass(`${style.background_header}`);
        $("li a").removeClass(`${style.text_shadow}`);
      } else {
        setColor("silver");
        $("li a").addClass(`${style.text_shadow}`);
        $("header").removeClass(`${style.background_header}`);
      }
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="w-100">
      <header
        className={`${style.header_area}  ${style.header_sticky} ${style.wow} ${
          style.slideInDown
        } ${!list ? "bg-light position-static border-bottom" : ""}`}
        data-wow-duration="0.75s"
        data-wow-delay="0s"
      >
        <div className={`${style.Container} pe-2`}>
          <div className="row">
            <div className="col-12">
              <nav className={style.main_nav}>
                <Link to="/" className={`${style.logo} ms-4`}>
                  <img
                    alt="logo"
                    style={{ width: "100%", height: "100%" }}
                    src={bgrmvblk}
                  />
                </Link>
                <ul className={style.nav}>
                  <li>
                    <NavLink
                      to="/"
                      className={`${!list ? "text-dark" : ""}`}
                      onClick={() => {
                        dispatch({
                          type: "activePath",
                          payload: "hotel",
                        });
                      }}
                    >
                      Hotels
                      <hr
                        className={`mt-0 ${style.activeTab} ${
                          activePath === "hotel" ? "d-block" : "d-none"
                        }`}
                      />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/parking"
                      className={`${!list ? "text-dark" : ""}`}
                      onClick={() => {
                        dispatch({
                          type: "activePath",
                          payload: "parking",
                        });
                      }}
                    >
                      Parkings
                      <hr
                        className={`mt-0 ${style.activeTab} ${
                          activePath === "parking" ? "d-block" : "d-none"
                        }`}
                      />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/HotelAndParking"
                      className={`${!list ? "text-dark" : ""}`}
                      onClick={() => {
                        dispatch({
                          type: "activePath",
                          payload: "hotelAndParking",
                        });
                      }}
                    >
                      Hotel and Parking
                      <hr
                        className={`mt-0 ${style.activeTab} ${
                          activePath === "hotelAndParking"
                            ? "d-block"
                            : "d-none"
                        }`}
                      />
                    </NavLink>
                  </li>
                  {login ? (
                    <>
                      <li>
                        <button
                          onClick={() => {
                            navigate("/contact");
                          }}
                          className={`${style.iconShow} btn btn-primary rounded`}
                        >
                          Contact us
                        </button>
                      </li>
                      <NavLink
                        to="/contact"
                        className={`${!list ? "text-dark" : ""} ${
                          style.iconHide
                        }`}
                      >
                        Contact us
                      </NavLink>
                      <li>
                        <div>
                          <React.Fragment>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                textAlign: "center",
                              }}
                            >
                              <Tooltip title="Account">
                                <IconButton
                                  className={style.iconShow}
                                  onClick={handleonClick}
                                  size="small"
                                  sx={{ ml: 2 }}
                                  aria-controls={
                                    open ? "account-menu" : undefined
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={open ? "true" : undefined}
                                >
                                  <Avatar sx={{ width: 32, height: 32 }}>
                                    M
                                  </Avatar>
                                </IconButton>
                              </Tooltip>
                            </Box>
                            <Menu
                              anchorEl={sidetooltip}
                              id="account-menu"
                              open={openTooltip}
                              onClose={handleonClose}
                              onClick={handleonClose}
                              PaperProps={{
                                elevation: 0,
                                sx: {
                                  overflow: "visible",
                                  filter:
                                    "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                  mt: 1.5,
                                  "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                  },
                                  "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                  },
                                },
                              }}
                              transformOrigin={{
                                horizontal: "right",
                                vertical: "top",
                              }}
                              anchorOrigin={{
                                horizontal: "right",
                                vertical: "bottom",
                              }}
                            >
                              <MenuItem onClick={handleonClose}>
                                <Avatar />{" "}
                                <Link
                                  className="text-dark"
                                  to={loggedinUser ? "/dashboard" : "/signin"}
                                >
                                  My Dashboard
                                </Link>
                              </MenuItem>
                              <Divider />

                              <MenuItem onClick={handleonClose}>
                                {loggedinUser ? (
                                  <>
                                    <ListItemIcon>
                                      <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <Link
                                      to="/"
                                      className="text-dark"
                                      onClick={HandleLogout}
                                    >
                                      Logout
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    <ListItemIcon>
                                      <Logout fontSize="small" />
                                    </ListItemIcon>
                                    <Link to="/signin" className="text-dark">
                                      Sign-in
                                    </Link>
                                  </>
                                )}
                              </MenuItem>
                            </Menu>
                          </React.Fragment>
                          <span
                            className={style.iconHide}
                            onClick={handleonClick}
                          >
                            Profile
                          </span>
                        </div>
                      </li>
                    </>
                  ) : (
                    <>
                      {" "}
                      <li>
                        <NavLink to="/signin" className={style.text_shadow}>
                          Sign In
                        </NavLink>
                      </li>
                    </>
                  )}

                  <li>
                    <span className={style.main_white_button}></span>
                  </li>
                </ul>
                <a
                  className={`${style.menu_trigger} ${
                    menuOpen ? style.active : ""
                  }`}
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                    $(`.${style.header_area} .${style.nav}`).slideToggle(200);
                  }}
                >
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {list && (
        <>
          <div
            className={style.main_banner}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(33, 33, 33,0.4), rgb(33, 33, 33,0.5)),url(${
                navSearch ? hotel : nav2 ? hotelparking : parking
              })`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className={`${style.top_text} ${style.header_text}`}>
                    <h4 className={style.text_shadow}>
                      Over 36,500+ Active Listings
                    </h4>
                    <h2 className={style.text_shadow}>
                      Find Nearby Places &amp; Things
                    </h2>
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div className={` ${style.search_form}`}>
                    <div className="row position-relative">
                      <div className={`col-lg-2 align-self-center`}>
                        {navSearch ? (
                          <fieldset className={`d-flex align-items-center`}>
                            <HotelIcon className=" me-2" />
                            <Dropdown name="cityHotel" />
                          </fieldset>
                        ) : nav2 ? (
                          <fieldset className="d-flex align-items-center">
                            <HotelIcon className=" me-2" />
                            <Dropdown name="cityHotelAndParking" />
                          </fieldset>
                        ) : (
                          <fieldset className="d-flex align-items-center">
                            <DirectionsCarIcon className=" me-2" />
                            <Dropdown name="cityParking" />
                          </fieldset>
                        )}
                      </div>
                      <div
                        className={`${
                          nav2 ? "col-lg-3" : "col-lg-4"
                        } align-self-center`}
                      >
                        <fieldset className="d-flex align-items-center">
                          <CalendarMonthIcon className=" me-2" />
                          {navSearch ? (
                            <Dates />
                          ) : nav2 ? (
                            <Dates />
                          ) : (
                            <ParkingDate />
                          )}
                        </fieldset>
                      </div>
                      <div
                        className={`${
                          nav2
                            ? "col-lg-5"
                            : navSearch
                            ? "col-lg-4"
                            : "col-lg-3"
                        } align-self-center position-relative`}
                      >
                        {navSearch ? (
                          <fieldset className="d-flex align-items-center">
                            <PersonIcon className=" me-2" />
                            <span
                              onClick={() => {
                                setOpenOptions(!openOptions);
                                dispatch({
                                  type: "ALERTPERSON",
                                  payload: false,
                                });
                              }}
                              className={`d-flex ${style.headerSearchText}`}
                            >
                              {`${options.adult} adult · ${
                                options.children
                              } children · ${
                                options.singleRoom +
                                options.twinRoom +
                                options.familyRoom
                              } room`}
                              <div className="ms-3 text-dark">
                                {openOptions ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </div>
                            </span>
                            {openOptions && (
                              <div className={`shadow-lg ${style.options}`}>
                                <div className="row">
                                  <div className="ms-1 me-5 ms-2 col-md-4 ">
                                    <h5 className="text-start my-1">
                                      Set Person
                                    </h5>
                                    <div className={style.optionItem}>
                                      <span
                                        className={`${style.optionText} `}
                                        style={{ marginRight: "35px" }}
                                      >
                                        Adult
                                      </span>
                                      <div className={style.optionCounter}>
                                        <button
                                          disabled={options.adult <= 1}
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("adult", "d")
                                          }
                                        >
                                          <RemoveIcon />
                                        </button>
                                        <span
                                          className={style.optionCounterNumber}
                                        >
                                          {options.adult}
                                        </span>
                                        <button
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("adult", "i")
                                          }
                                        >
                                          <AddIcon />
                                        </button>
                                      </div>
                                    </div>
                                    <div className={style.optionItem}>
                                      <span
                                        className={`${style.optionText} `}
                                        style={{ marginRight: "10px" }}
                                      >
                                        Children
                                      </span>
                                      <div
                                        className={`ms-1 ${style.optionCounter}`}
                                      >
                                        <button
                                          disabled={options.children <= 0}
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("children", "d")
                                          }
                                        >
                                          <RemoveIcon />
                                        </button>
                                        <span
                                          className={style.optionCounterNumber}
                                        >
                                          {options.children}
                                        </span>
                                        <button
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("children", "i")
                                          }
                                        >
                                          <AddIcon />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="border-start ms-1 col-md-4">
                                    <h5 className="text-start my-1">
                                      Set Rooms
                                    </h5>
                                    <div className={`${style.optionItem}`}>
                                      <span
                                        className={style.optionText}
                                        style={{ marginRight: "9px" }}
                                      >
                                        Single Room
                                      </span>
                                      <div className={style.optionCounter}>
                                        <button
                                          disabled={options.singleRoom <= 0}
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("singleRoom", "d")
                                          }
                                        >
                                          <RemoveIcon />
                                        </button>
                                        <span
                                          className={style.optionCounterNumber}
                                        >
                                          {options.singleRoom}
                                        </span>
                                        <button
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("singleRoom", "i")
                                          }
                                        >
                                          <AddIcon />
                                        </button>
                                      </div>
                                    </div>
                                    <div className={`${style.optionItem} ms-2`}>
                                      <span
                                        className={style.optionText}
                                        style={{ marginRight: "21px" }}
                                      >
                                        Twin Room
                                      </span>
                                      <div className={style.optionCounter}>
                                        <button
                                          disabled={options.twinRoom <= 0}
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("twinRoom", "d")
                                          }
                                        >
                                          <RemoveIcon />
                                        </button>
                                        <span
                                          className={style.optionCounterNumber}
                                        >
                                          {options.twinRoom}
                                        </span>
                                        <button
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("twinRoom", "i")
                                          }
                                        >
                                          <AddIcon />
                                        </button>
                                      </div>
                                    </div>
                                    <div className={`${style.optionItem}`}>
                                      <span
                                        className={style.optionText}
                                        style={{ marginRight: "8px" }}
                                      >
                                        Family Room
                                      </span>
                                      <div className={style.optionCounter}>
                                        <button
                                          disabled={options.familyRoom <= 0}
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("familyRoom", "d")
                                          }
                                        >
                                          <RemoveIcon />
                                        </button>
                                        <span
                                          className={style.optionCounterNumber}
                                        >
                                          {options.familyRoom}
                                        </span>
                                        <button
                                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                          onClick={() =>
                                            handleOption("familyRoom", "i")
                                          }
                                        >
                                          <AddIcon />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </fieldset>
                        ) : nav2 ? (
                          <div className="d-flex justify-content-between">
                            <fieldset className="container d-flex align-items-center">
                              <PersonIcon className=" me-2" />
                              <span
                                onClick={() => {
                                  setOpenOptions(!openOptions);
                                  dispatch({
                                    type: "ALERTPERSON",
                                    payload: false,
                                  });
                                }}
                                className={`d-flex ${style.headerSearchText}`}
                              >
                                {`${options.adult} adult · ${
                                  options.children
                                } children · ${
                                  options.singleRoom +
                                  options.twinRoom +
                                  options.familyRoom
                                } room`}
                                <div className="ms-3 text-dark">
                                  {openOptions ? (
                                    <ExpandLessIcon />
                                  ) : (
                                    <ExpandMoreIcon />
                                  )}
                                </div>
                              </span>
                              {openOptions && (
                                <div className={`shadow-lg ${style.options}`}>
                                  <div className="row">
                                    <div className="ms-1 me-5 ms-2 col-md-4 ">
                                      <h5 className="text-start my-1">
                                        Set Person
                                      </h5>
                                      <div className={style.optionItem}>
                                        <span
                                          className={`${style.optionText} `}
                                          style={{ marginRight: "35px" }}
                                        >
                                          Adult
                                        </span>
                                        <div className={style.optionCounter}>
                                          <button
                                            disabled={options.adult <= 1}
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("adult", "d")
                                            }
                                          >
                                            <RemoveIcon />
                                          </button>
                                          <span
                                            className={
                                              style.optionCounterNumber
                                            }
                                          >
                                            {options.adult}
                                          </span>
                                          <button
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("adult", "i")
                                            }
                                          >
                                            <AddIcon />
                                          </button>
                                        </div>
                                      </div>
                                      <div className={style.optionItem}>
                                        <span
                                          className={`${style.optionText} `}
                                          style={{ marginRight: "10px" }}
                                        >
                                          Children
                                        </span>
                                        <div
                                          className={`ms-1 ${style.optionCounter}`}
                                        >
                                          <button
                                            disabled={options.children <= 0}
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("children", "d")
                                            }
                                          >
                                            <RemoveIcon />
                                          </button>
                                          <span
                                            className={
                                              style.optionCounterNumber
                                            }
                                          >
                                            {options.children}
                                          </span>
                                          <button
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("children", "i")
                                            }
                                          >
                                            <AddIcon />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="border-start ms-1 col-md-4">
                                      <h5 className="text-start my-1">
                                        Set Rooms
                                      </h5>
                                      <div className={style.optionItem}>
                                        <span
                                          className={style.optionText}
                                          style={{ marginRight: "9px" }}
                                        >
                                          Single Room
                                        </span>
                                        <div className={style.optionCounter}>
                                          <button
                                            disabled={options.singleRoom <= 0}
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("singleRoom", "d")
                                            }
                                          >
                                            <RemoveIcon />
                                          </button>
                                          <span
                                            className={
                                              style.optionCounterNumber
                                            }
                                          >
                                            {options.singleRoom}
                                          </span>
                                          <button
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("singleRoom", "i")
                                            }
                                          >
                                            <AddIcon />
                                          </button>
                                        </div>
                                      </div>
                                      <div className={style.optionItem}>
                                        <span
                                          className={style.optionText}
                                          style={{ marginRight: "21px" }}
                                        >
                                          Twin Room
                                        </span>
                                        <div className={style.optionCounter}>
                                          <button
                                            disabled={options.twinRoom <= 0}
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("twinRoom", "d")
                                            }
                                          >
                                            <RemoveIcon />
                                          </button>
                                          <span
                                            className={
                                              style.optionCounterNumber
                                            }
                                          >
                                            {options.twinRoom}
                                          </span>
                                          <button
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("twinRoom", "i")
                                            }
                                          >
                                            <AddIcon />
                                          </button>
                                        </div>
                                      </div>
                                      <div className={style.optionItem}>
                                        <span
                                          className={style.optionText}
                                          style={{ marginRight: "8px" }}
                                        >
                                          Family Room
                                        </span>
                                        <div className={style.optionCounter}>
                                          <button
                                            disabled={options.familyRoom <= 0}
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("familyRoom", "d")
                                            }
                                          >
                                            <RemoveIcon />
                                          </button>
                                          <span
                                            className={
                                              style.optionCounterNumber
                                            }
                                          >
                                            {options.familyRoom}
                                          </span>
                                          <button
                                            className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                                            onClick={() =>
                                              handleOption("familyRoom", "i")
                                            }
                                          >
                                            <AddIcon />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </fieldset>
                            <fieldset className="d-flex align-items-center">
                              <LocalParkingIcon className="me-2" />
                              <input
                                type="number"
                                name="vehicle"
                                className={style.form_select}
                                placeholder="Vehicles"
                                autoComplete="off"
                                value={c}
                                // required
                                onChange={(e) =>
                                  dispatch({
                                    type: "INCREMENT",
                                    payload: e.target.value,
                                  })
                                }
                                onClick={() => {
                                  dispatch({
                                    type: "ALERTVEHICLE",
                                    payload: false,
                                  });
                                }}
                              />
                            </fieldset>
                          </div>
                        ) : (
                          <fieldset className="d-flex align-items-center">
                            <LocalParkingIcon className="me-2" />
                            <input
                              type="number"
                              name="vehicle"
                              className={style.form_select}
                              placeholder="Number of vehicles"
                              autoComplete="off"
                              value={c}
                              // required
                              onChange={(e) =>
                                dispatch({
                                  type: "INCREMENT",
                                  payload: e.target.value,
                                })
                              }
                              onClick={() => {
                                dispatch({
                                  type: "ALERTVEHICLE",
                                  payload: false,
                                });
                              }}
                            />
                          </fieldset>
                        )}
                      </div>
                      <div
                        className={`${isDesktop ? "mt-3" : ""} ${
                          nav2 || navSearch ? "col-lg-2" : "col-lg-3"
                        }`}
                      >
                        <fieldset>
                          <button
                            type="submit"
                            className={style.main_button}
                            onClick={handleOnSearch}
                          >
                            <SearchIcon /> Search Now
                          </button>

                          {list &&
                            (resultPerson ||
                              resultCity ||
                              resultVehicle ||
                              resultDate ||
                              resultDateTime) && (
                              <div className="mt-2 start-0 bg-danger bg-opacity-75 text-light rounded-3 p-3 position-absolute d-flex flex-column align-items-start">
                                <strong>Error! </strong>
                                {resultPerson && (
                                  <div>
                                    Total number of persons is more than
                                    capacity of rooms
                                  </div>
                                )}
                                {resultCity && <div>Enter city</div>}
                                {resultVehicle && (
                                  <div>Enter number of vehicles</div>
                                )}
                                {resultDate && <div>Enter Date</div>}
                                {resultDateTime && (
                                  <div>Enter Date and time</div>
                                )}
                              </div>
                            )}
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
