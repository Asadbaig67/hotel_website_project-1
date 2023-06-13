import * as React from "react";
import { useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import {
  SidebarDataAdminProfile,
  SidebarDataAdminProfilePending,
  SidebarDataPatnerProfile,
  SidebarDataPatnerProfilePending,
  SidebarDataUserProfile,
  SidebarDataUserBooking,
  SidebarDataUserUpcomingBooking,
  SidebarDataLogout,
} from "../../Utilis/SidebarData";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./AdminSidebar.module.css";
import bgrmvblk from "../../images/bgrmvblk.png";
import person from "../../images/user.png";
import Popover from "@mui/material/Popover";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { AccountCircle } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminSidebar() {
  const location = useLocation();
  const path = location.pathname;
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const { notification } = useSelector((state) => state.setNotification);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openNotification = Boolean(anchorEl);
  const id = openNotification ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const view = useSelector((state) => state.view.view);
  const theme = useTheme();
  const { open } = useSelector((state) => state.toggleSidebar);
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      const data = await axios.get(
        `http://localhost:5000/notification/getNotification/${user._id}`
      );
      dispatch({ type: "SET_NOTIFICATION", payload: data.data });
    };
    fetchNotification();
  }, []);

  const handleNotication = async (event) => {
    setAnchorEl(event.currentTarget);
    console.log(notification);
  };

  const handleCloseNotifcation = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    dispatch({ type: "SET_TOGGLE", payload: true });
    // setOpen(true);
  };

  const handleDrawerClose = () => {
    dispatch({ type: "SET_TOGGLE", payload: false });
    // setOpen(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const logout = () => {
    navigate("/signin");
    localStorage.clear();
    dispatch({ type: "SET_LOGGEDIN_USER", payload: {} });
    dispatch({ type: "LOGIN", payload: false });
  };

  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const isMenuOpen = Boolean(anchorElMenu);
  const handleProfileMenuOpen = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorElMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
      <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
      <MenuItem onClick={() => navigate("/profile")}>Account settings</MenuItem>
      <MenuItem onClick={handleClickOpen}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleNotication}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />{" "}
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
            </Typography> */}
            <Box
              sx={{
                width: { lg: "6%", m: "7%", xs: "25%", sm: "20%" },
              }}
            >
              <img src={bgrmvblk} alt="" className="w-100" />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {/* <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge
                  onClick={handleNotication}
                  badgeContent={notification.length}
                  max={99}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>

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
                  open={openNotification}
                  anchorEl={anchorEl}
                  onClose={handleCloseNotifcation}
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
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt="Remy Sharp"
                  src={user.photo ? user.photo : person}
                />
                {/* <AccountCircle /> */}
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none", sm: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Drawer variant="permanent" open={open}>
          {/* <div className="d-flex justify-content-around"> */}
          <DrawerHeader
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h5" noWrap component="div">
              DESALIS
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          {/* </div> */}
          <Divider />

          {open && (
            <List>
              <div className="d-flex justify-content-center">
                <img src={user.photo ? user.photo : person} alt="user" />
              </div>
              <div className="d-flex flex-column align-items-center">
                <Typography variant="h5" noWrap component="div">
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="p" noWrap component="div">
                  {user.account_type}
                </Typography>
              </div>
            </List>
          )}
          {view === "admin" ? (
            <>
              <List>
                <Typography
                  variant={open ? "h6" : "p"}
                  sx={{ marginLeft: "8px" }}
                >
                  Dashboard
                </Typography>
                {SidebarDataAdminProfile.map((element, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => {
                        navigate(element.link);
                      }}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: `${path === element.link ? "#00838f" : "#000"}`,
                        fontWeight: `${
                          path === element.link ? "800" : "normal"
                        }`,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: `${
                            path === element.link ? "#00838f" : "#000"
                          }`,
                          fontWeight: `${
                            path === element.link ? "800" : "normal"
                          }`,
                        }}
                      >
                        {element.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={element.title}
                        sx={{
                          opacity: open ? 1 : 0,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                <Typography
                  variant={open ? "h6" : "p"}
                  sx={{ marginLeft: "8px" }}
                >
                  Pending Requests
                </Typography>
                {SidebarDataAdminProfilePending.map((element, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => navigate(element.link)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: `${path === element.link ? "#00838f" : "#000"}`,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: `${path === element.link ? "#00838f" : "#000"}`,
                        }}
                      >
                        {element.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={element.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          ) : view === "partner" ? (
            <>
              <List>
                <Typography
                  variant={open ? "h6" : "p"}
                  sx={{ marginLeft: "8px" }}
                >
                  Dashboard
                </Typography>
                {SidebarDataPatnerProfile.map((element, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => navigate(element.link)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: `${path === element.link ? "#00838f" : "#000"}`,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: `${path === element.link ? "#00838f" : "#000"}`,
                        }}
                      >
                        {element.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={element.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                <Typography
                  variant={open ? "h6" : "p"}
                  sx={{ marginLeft: "8px" }}
                >
                  Pending Requests
                </Typography>
                {SidebarDataPatnerProfilePending.map((element, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => navigate(element.link)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: `${path === element.link ? "#00838f" : "#000"}`,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: `${path === element.link ? "#00838f" : "#000"}`,
                        }}
                      >
                        {element.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={element.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          ) : view === "user" ? (
            <>
              <List>
                <Typography
                  variant={open ? "h6" : "p"}
                  sx={{ marginLeft: "8px" }}
                >
                  Dashboard
                </Typography>
                {SidebarDataUserProfile.map((element, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => navigate(element.link)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        color: `${path === element.link ? "#00838f" : "#000"}`,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color: `${path === element.link ? "#00838f" : "#000"}`,
                        }}
                      >
                        {element.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={element.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                <Typography
                  variant={open ? "h6" : "p"}
                  sx={{ marginLeft: "8px" }}
                >
                  My Bookings
                </Typography>
                {SidebarDataUserBooking.map((element, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => navigate(element.link)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {element.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={element.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                <Typography
                  variant={open ? "h6" : "p"}
                  sx={{ marginLeft: "8px" }}
                >
                  Upcoming Bookings
                </Typography>
                {SidebarDataUserUpcomingBooking.map((element, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => navigate(element.link)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {element.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={element.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          ) : null}

          <Box className={styles.nav__logout} onClick={handleClickOpen}>
            <List>
              {SidebarDataLogout.map((element, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {element.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={element.title}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Dialog
        open={openDialog}
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
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" color="error" onClick={logout}>
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
