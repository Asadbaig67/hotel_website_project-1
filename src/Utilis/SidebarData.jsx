import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { ElectricBike, Hotel } from "@mui/icons-material";

//For admin
export const SidebarDataAdminProfile = [
  {
    key: 1,
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    key: 2,
    title: "Profile",
    icon: <AccountCircleIcon />,
    link: "/profile",
  },
  {
    key: 3,
    title: "Users",
    icon: <PersonIcon />,
    link: "/users",
  },
  {
    key: 4,
    title: "Hotels",
    icon: <Hotel />,
    link: "/hotels",
  },
  {
    key: 5,
    title: "Parkings",
    icon: <ElectricBike />,
    link: "/parkings",
  },
  {
    key: 6,
    title: "Hotels and Parkings",
    icon: <Hotel />,
    link: "/HotelsAndParkings",
  },

  {
    key: 11,
    title: "Pending Requests",
    icon: <PendingIcon  />,
    link: "/hotelRequests",
  },
  {
    key: "a",
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    link: "/booking",
  },
];

//For Patner
export const SidebarDataPatnerProfile = [
  {
    key: 7,
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    key: 8,
    title: "Profile",
    icon: <AccountCircleIcon />,
    link: "/profile",
  },
  {
    key: 10,
    title: "Hotel",
    icon: <HomeIcon />,
    link: "/hotel",
  },
  {
    key: "12",
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    link: "/booking",
  },
  // {
  //   key: 10,
  //   title: "Uploads",
  //   icon: <DriveFolderUploadIcon />,
  //   link: "/oq",
  // },
];

//For User
export const SidebarDataUserProfile = [
  {
    key: 13,
    title: "Dashboard",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  { key: 14, title: "Profile", icon: <AccountCircleIcon />, link: "/profile" },
  {
    key: 15,
    title: "My Bookings",
    icon: <BusinessCenterIcon />,
    link: "/booking",
  },
];

//For All
export const SidebarDataLogout = [
  {
    key: 18,
    title: "Logout",
    icon: <LogoutIcon />,
  },
];
