import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from "@mui/icons-material/Pending";
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
    key: "a",
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    link: "/booking",
  },
  {
    key: "n",
    title: "Canceled Bookings",
    icon: <BusinessCenterIcon />,
    link: "/cancelbooking",
  },
];

export const SidebarDataAdminProfilePending = [
  {
    key: 11,
    title: "Hotels",
    icon: <PendingIcon />,
    link: "/hotelRequests",
  },
  {
    key: 12,
    title: "Parkings",
    icon: <PendingIcon />,
    link: "/parkingRequests",
  },
  {
    key: 13,
    title: "Hotel and Parkings",
    icon: <PendingIcon />,
    link: "/hotelAndParkingRequests",
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
    title: "My Property",
    icon: <HomeIcon />,
    link: "/Property",
  },
  {
    key: "12",
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    link: "/booking",
  },
  {
    key: "13",
    title: "Canceled Bookings",
    icon: <BusinessCenterIcon />,
    link: "/cancelbooking",
  },

  // {
  //   key: 10,
  //   title: "Uploads",
  //   icon: <DriveFolderUploadIcon />,
  //   link: "/oq",
  // },
];

export const SidebarDataPatnerProfilePending = [
  {
    key: 11,
    title: "Pending Property",
    icon: <PendingIcon />,
    link: "/PropertyRequests",
  },
  {
    key: 12,
    title: "Pending Bookings",
    icon: <PendingIcon />,
    link: "/bookingRequests",
  },
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
];

export const SidebarDataUserBooking = [
  {
    key: 15,
    title: "Hotels",
    icon: <BusinessCenterIcon />,
    link: "/hotelbookings",
  },
  {
    key: 16,
    title: "Parkings",
    icon: <BusinessCenterIcon />,
    link: "/parkingbookings",
  },
  {
    key: 17,
    title: "Hotels and Parkings",
    icon: <BusinessCenterIcon />,
    link: "/hotelandparkingbookings",
  },
  {
    key: "n",
    title: "Canceled Bookings",
    icon: <BusinessCenterIcon />,
    link: "/cancelbooking",
  },
];

export const SidebarDataUserUpcomingBooking = [
  {
    key: 15,
    title: "Hotels",
    icon: <BusinessCenterIcon />,
    link: "/upcominghotelbookings",
  },
  {
    key: 16,
    title: "Parkings",
    icon: <BusinessCenterIcon />,
    link: "/upcomingparkingbookings",
  },
  {
    key: 17,
    title: "Hotels and Parkings",
    icon: <BusinessCenterIcon />,
    link: "/upcominghotelandparkingbookings",
  },
];
//For All
export const SidebarDataLogout = [
  {
    key: 18,
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/signin",
  },
];
