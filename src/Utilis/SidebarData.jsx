import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PendingIcon from "@mui/icons-material/Pending";
import AddIcon from "@mui/icons-material/Add";
import { ElectricBike, Hotel } from "@mui/icons-material";
import BusinessIcon from '@mui/icons-material/Business';

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
    key: 9,
    title: "Operating Cities",
    icon: <AddIcon />,
    link: "/operatingcities",
  },
  {
    key: 3,
    title: "Users",
    icon: <PersonIcon />,
    link: "/users",
  },
  {
    key: 4,
    title: "Properties",
    icon: <BusinessIcon />,
    exact: true,
    subRoutes: [
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
    ],
  },
  {
    key: 5,
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    exact: true,
    subRoutes: [
      {
        key: "a",
        title: "Bookings",
        icon: <BusinessCenterIcon />,
        link: "/booking",
      },
      {
        key: "b",
        title: "Upcoming Bookings",
        icon: <BusinessCenterIcon />,
        link: "/upcomingbooking",
      },
      {
        key: "c",
        title: "Previous Bookings",
        icon: <BusinessCenterIcon />,
        link: "/previousbooking",
      },
      {
        key: "d",
        title: "On going Bookings",
        icon: <BusinessCenterIcon />,
        link: "/ongoingbooking",
      },
      {
        key: "n",
        title: "Canceled Bookings",
        icon: <BusinessCenterIcon />,
        link: "/cancelbooking",
      },
    ],
  },
  {
    key: 6,
    title: "De-Listed Properties",
    icon: <BusinessIcon />,
    exact: true,
    subRoutes: [
      {
        key: 7,
        title: "De Listed Hotels",
        icon: <Hotel />,
        link: "/deListedHotels",
      },
      {
        key: 8,
        title: "De Listed Parkings",
        icon: <ElectricBike />,
        link: "/deListedParkings",
      },
      {
        key: 9,
        title: "De Listed Hotel and Parkings",
        icon: <Hotel />,
        link: "/deListedHotelAndParking",
      },
    ],
  },
  {
    key: 10,
    title: "Pending Approvals",
    icon: <PendingIcon />,
    exact: true,
    subRoutes: [
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
    ],
  },
];

export const SidebarDataAdminListedProperties = [
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
];

export const SidebarDataAdminBooking = [
  {
    key: "a",
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    link: "/booking",
  },
  {
    key: "b",
    title: "Upcoming Bookings",
    icon: <BusinessCenterIcon />,
    link: "/upcomingbooking",
  },
  {
    key: "c",
    title: "Previous Bookings",
    icon: <BusinessCenterIcon />,
    link: "/previousbooking",
  },
  {
    key: "d",
    title: "On going Bookings",
    icon: <BusinessCenterIcon />,
    link: "/ongoingbooking",
  },
  {
    key: "n",
    title: "Canceled Bookings",
    icon: <BusinessCenterIcon />,
    link: "/cancelbooking",
  },
];

export const SidebarDataAdminDeListedProperties = [
  {
    key: 7,
    title: "De Listed Hotels",
    icon: <Hotel />,
    link: "/deListedHotels",
  },
  {
    key: 8,
    title: "De Listed Parkings",
    icon: <ElectricBike />,
    link: "/deListedParkings",
  },
  {
    key: 9,
    title: "De Listed Hotel and Parkings",
    icon: <Hotel />,
    link: "/deListedHotelAndParking",
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
    key: 11,
    title: "De Listed Property",
    icon: <HomeIcon />,
    link: "/delistedProperties",
  },
  {
    key: 11,
    title: "Pending Property",
    icon: <PendingIcon />,
    link: "/PropertyRequests",
  },
  {
    key: 12,
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    exact: true,
    subRoutes: [
      {
        key: "12",
        title: "Bookings",
        icon: <BusinessCenterIcon />,
        link: "/booking",
      },
      {
        key: "a",
        title: "Upcoming Bookings",
        icon: <BusinessCenterIcon />,
        link: "/upcomingbooking",
      },
      {
        key: "b",
        title: "Previous Bookings",
        icon: <BusinessCenterIcon />,
        link: "/previousbooking",
      },
      {
        key: "c",
        title: "On going Bookings",
        icon: <BusinessCenterIcon />,
        link: "/ongoingbooking",
      },
      {
        key: "13",
        title: "Canceled Bookings",
        icon: <BusinessCenterIcon />,
        link: "/cancelbooking",
      },
    ],
  },
];

export const SidebarDataPartnerBookings = [
  {
    key: "12",
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    link: "/booking",
  },
  {
    key: "a",
    title: "Upcoming Bookings",
    icon: <BusinessCenterIcon />,
    link: "/upcomingbooking",
  },
  {
    key: "b",
    title: "Previous Bookings",
    icon: <BusinessCenterIcon />,
    link: "/previousbooking",
  },
  {
    key: "c",
    title: "On going Bookings",
    icon: <BusinessCenterIcon />,
    link: "/ongoingbooking",
  },
  {
    key: "13",
    title: "Canceled Bookings",
    icon: <BusinessCenterIcon />,
    link: "/cancelbooking",
  },
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
  {
    key: 15,
    title: "Bookings",
    icon: <BusinessCenterIcon />,
    subRoutes: [
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
        key: "a",
        title: "Upcoming Bookings",
        icon: <BusinessCenterIcon />,
        link: "/upcomingbooking",
      },
      {
        key: "b",
        title: "Previous Bookings",
        icon: <BusinessCenterIcon />,
        link: "/previousbooking",
      },
      {
        key: "c",
        title: "On going Bookings",
        icon: <BusinessCenterIcon />,
        link: "/ongoingbooking",
      },
      {
        key: "n",
        title: "Canceled Bookings",
        icon: <BusinessCenterIcon />,
        link: "/cancelbooking",
      },
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
    ],
  },
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
    key: "a",
    title: "Upcoming Bookings",
    icon: <BusinessCenterIcon />,
    link: "/upcomingbooking",
  },
  {
    key: "b",
    title: "Previous Bookings",
    icon: <BusinessCenterIcon />,
    link: "/previousbooking",
  },
  {
    key: "c",
    title: "On going Bookings",
    icon: <BusinessCenterIcon />,
    link: "/ongoingbooking",
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
