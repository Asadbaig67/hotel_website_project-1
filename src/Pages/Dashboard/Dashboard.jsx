import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography, useMediaQuery } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardDataTable from "../../Components/dashboardDataTable/dashboardDataTable";
import { dashboardOperatingCityHeader } from "../../Utilis/DataTableSource";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import person from "../../images/user.png";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChartData from "../../Components/Chart/Chart";
import SingleChartData from "../../Components/Chart/SingleDataChart";
import ChartIndividualData from "../../Components/Chart/ChartIndividual";
import DashboardLoader from "../../Components/Loader/DashboardLoader";
import Sidebar from "../../Components/Sidebar/SideBar";
import AdminNav from "../../Components/AdminNavbar/AdminNav";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch({ type: "SETHEADER", payload: dashboardOperatingCityHeader });

  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { mode } = useSelector((state) => state.mode);
  const { view } = useSelector((state) => state.view);
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const [addHotelOperatingCity, setaddHotelOperatingCity] = useState(false);
  const [addParkingOperatingCity, setaddParkingOperatingCity] = useState(false);
  const [addHotelAndParkingOperatingCity, setaddHotelAndParkingOperatingCity] =
    useState(false);
  const [name, setName] = useState("");

  const handleClick = async () => {
    let hotel = [],
      parking = [],
      hotelAndParking = [];
    if (addHotelOperatingCity) {
      hotel = await axios.put(
        `${api}/OperatingProperty/addOperatingHotelCity`,
        { type: "Hotel", city: name }
      );
    }
    if (addParkingOperatingCity) {
      parking = await axios.put(
        `${api}/OperatingProperty/addOperatingHotelCity`,
        { type: "Parking", city: name }
      );
    }
    if (addHotelAndParkingOperatingCity) {
      hotelAndParking = await axios.put(
        `${api}/OperatingProperty/addOperatingHotelCity`,
        { type: "HotelAndParking", city: name }
      );
    }
    if (hotel || parking || hotelAndParking) {
      alert("Successfully added");
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([]);
  const { count } = useSelector((state) => state.db_Collection_Count);
  const [listingChartData, setListingChartData] = useState({});
  const [bookingChartData, setBookingChartData] = useState({});
  const [partnerCombinedData, setPartnerCombinedData] = useState({});
  const [userCombinedData, setUserCombinedData] = useState({});
  const [partnerIndividualData, setPartnerIndividualData] = useState({});

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fetchData = async () => {
    let admin = [];
    try {
      if (view === "admin") {
        const hotelNum = await axios.get(`${api}/hotels/getallhotels`);

        const parkingNum = await axios.get(`${api}/parking/getallparkings`);

        const hotelAndParkingNum = await axios.get(
          `${api}/hotelandparking/getallhotelandparkings`
        );

        const bookingsNum = await axios.get(
          `${api}/booking/getAllPreviousBookings`
        );
        const pendingHotelNum = await axios.get(
          `${api}/hotels/getPendinghotels`
        );

        const pendingParkingNum = await axios.get(
          `${api}/parking/getpendingparkings`
        );

        const pendingHotelAndParkingNum = await axios.get(
          `${api}/hotelandparking/getPendinghotelandparkings`
        );

        const upcomingBookingsNum = await axios.get(
          `${api}/booking/getAllUpcommingBookings`
        );

        dispatch({
          type: "DB_COLLECTION_COUNT",
          payload: {
            hotelNum: hotelNum.data.length,
            parkingNum: parkingNum.data.length,
            hotelAndParkingNum: hotelAndParkingNum.data.length,
            bookingsNum: bookingsNum.data.length,
            pendingHotelNum: pendingHotelNum.data.length,
            pendingParkingNum: pendingParkingNum.data.length,
            pendingHotelAndParkingNum: pendingHotelAndParkingNum.data.length,
            upcomingBookingsNum: upcomingBookingsNum.data.length,
          },
        });
        admin = [
          {
            key: 1,
            title: "Approved Hotels",
            description: hotelNum.data.length,
            link: "/hotels",
            name: "Hotels",
          },
          {
            key: 2,
            title: "Approved Parkings",
            description: parkingNum.data.length,
            link: "/parkings",
            name: "Parkings",
          },
          {
            key: 3,
            title: "Approved Hotels and Parkings",
            description: hotelAndParkingNum.data.length,
            link: "/HotelsAndParkings",
            name: "Hotels and Parkings",
          },
          {
            key: 4,
            title: "Completed Bokings",
            description: bookingsNum.data.length,
            link: "/booking",
            name: "Bookings",
          },
          {
            key: 5,
            title: "Pending Hotels",
            description: pendingHotelNum.data.length,
            link: "/hotelRequests",
            name: "Hotels",
          },
          {
            key: 6,
            title: "Pending Parkings",
            description: pendingParkingNum.data.length,
            link: "/parkingRequests",
            name: "Parkings",
          },
          {
            key: 7,
            title: "Pending Hotels and Parkings",
            description: pendingHotelAndParkingNum.data.length,
            link: "/hotelAndParkingRequests",
            name: "Hotels and Parkings",
          },
          {
            key: 8,
            title: "Upcoming Bokings",
            description: upcomingBookingsNum.data.length,
            link: "/booking",
            name: "Bookings",
          },
        ];
      } else if (view === "partner") {
        if (user.partner_type === "Hotel") {
          const hotelNum = await axios.get(
            `${api}/hotels/getApprovedhotelbyonwerid/${user._id}`
          );

          const bookingsNum = await axios.get(
            `${api}/booking/getPreviousBookingsByHotelOwnerId/${user._id}`
          );
          const pendingHotelNum = await axios.get(
            `${api}/hotels/getUnapprovedhotelbyonwerid/${user._id}`
          );

          const upcomingbBookingsNum = await axios.get(
            `${api}/booking/getUpcommingBookingsByHotelOwnerId/${user._id}`
          );

          dispatch({
            type: "DB_COLLECTION_COUNT",
            payload: {
              hotelNum: hotelNum.data.length,
              bookingsNum: bookingsNum.data.length,
              pendingHotelNum: pendingHotelNum.data.length,
              upcomingbBookingsNum: upcomingbBookingsNum.data.length,
            },
          });
          admin = [
            {
              key: 1,
              title: "Approved Hotels",
              description: hotelNum.data.length,
              link: "/Property",
              name: "Hotels",
            },
            {
              key: 2,
              title: "Completed Bokings",
              description: bookingsNum.data.length,
              link: "/booking",
              name: "Bookings",
            },
            {
              key: 3,
              title: "Pending Hotels",
              description: pendingHotelNum.data.length,
              link: "/PropertyRequests",
              name: "Hotels",
            },
            {
              key: 4,
              title: "Upcoming Bokings",
              description: upcomingbBookingsNum.data.length,
              link: "/bookingRequests",
              name: "Bookings",
            },
          ];
        } else if (user.partner_type === "Parking") {
          const parkingNum = await axios.get(
            `${api}/parking/getApprovedParkingByOwnerId/${user._id}`
          );

          const bookingsNum = await axios.get(
            `${api}/booking/getPreviousBookingsByParkingOwnerId/${user._id}`
          );

          const pendingParkingNum = await axios.get(
            `${api}/parking/getUnapprovedParkingByOwnerId/${user._id}`
          );

          const upcomingbBookingsNum = await axios.get(
            `${api}/booking/getUpcommingBookingsByParkingOwnerId/${user._id}`
          );

          dispatch({
            type: "DB_COLLECTION_COUNT",
            payload: {
              parkingNum: parkingNum.data.length,
              bookingsNum: bookingsNum.data.length,
              pendingParkingNum: pendingParkingNum.data.length,
              upcomingbBookingsNum: upcomingbBookingsNum.data.length,
            },
          });
          admin = [
            {
              key: 1,
              title: "Approved Parkings",
              description: parkingNum.data.length,
              link: "/Property",
              name: "Parkings",
            },
            {
              key: 2,
              title: "Completed Bokings",
              description: bookingsNum.data.length,
              link: "/booking",
              name: "Bookings",
            },
            {
              key: 3,
              title: "Pending Parkings",
              description: pendingParkingNum.data.length,
              link: "/PropertyRequests",
              name: "Parkings",
            },
            {
              key: 4,
              title: "Upcoming Bokings",
              description: upcomingbBookingsNum.data.length,
              link: "/bookingRequests",
              name: "Bookings",
            },
          ];
        } else if (user.partner_type === "HotelAndParking") {
          const hotelAndParkingNum = await axios.get(
            `${api}/hotelandparking/getApprovedhotelandparkingbyownerid/${user._id}`
          );

          const bookingsNum = await axios.get(
            `${api}/booking/getPreviousBookingsByHotelAndParkingOwnerId/${user._id}`
          );

          const pendingHotelAndParkingNum = await axios.get(
            `${api}/hotelandparking/getUnapprovedhotelandparkingbyownerid/${user._id}`
          );

          const upcomingbBookingsNum = await axios.get(
            `${api}/booking/getUpcomingBookingHotelandParkingByUserId/${user._id}`
          );

          dispatch({
            type: "DB_COLLECTION_COUNT",
            payload: {
              hotelAndParkingNum: hotelAndParkingNum.data.length,
              bookingsNum: bookingsNum.data.length,
              pendingHotelAndParkingNum: pendingHotelAndParkingNum.data.length,
              upcomingbBookingsNum: upcomingbBookingsNum.data.length,
            },
          });
          admin = [
            {
              key: 1,
              title: "Approved Hotels and Parkings",
              description: hotelAndParkingNum.data.length,
              link: "/Property",
              name: "Hotels and Parkings",
            },
            {
              key: 2,
              title: "Completed Bokings",
              description: bookingsNum.data.length,
              link: "/booking",
              name: "Bookings",
            },
            {
              key: 3,
              title: "Pending Hotels and Parkings",
              description: pendingHotelAndParkingNum.data.length,
              link: "/PropertyRequests",
              name: "Hotels and Parkings",
            },
            {
              key: 4,
              title: "Upcoming Bokings",
              description: upcomingbBookingsNum.data.length,
              link: "/bookingRequests",
              name: "Bookings",
            },
          ];
        }
      } else if (view === "user") {
        const prevHotelBookingNum = await axios.get(
          `${api}/booking/getPreviousBookingHotelByUserId/${user._id}`
        );
        const prevParkingBookingNum = await axios.get(
          `${api}/booking/getPreviousBookingParkingByUserId/${user._id}`
        );
        const prevHotelAndParkingBookingNum = await axios.get(
          `${api}/booking/getPreviousBookingHotelandParkingByUserId/${user._id}`
        );

        const prevTotalBookingNum = await axios.get(
          `${api}/booking/getAllPreviousBookingsByUserId/${user._id}`
        );
        const upcomingHotelBookingNum = await axios.get(
          `${api}/booking/getUpcomingBookingHotelByUserId/${user._id}`
        );
        const upcomingParkingBookingNum = await axios.get(
          `${api}/booking/getUpcomingBookingParkingByUserId/${user._id}`
        );
        const upcomingHotelAndParkingBookingNum = await axios.get(
          `${api}/booking/getUpcomingBookingHotelandParkingByUserId/${user._id}`
        );

        const upcomingTotalBookingNum = await axios.get(
          `${api}/booking/getAllUpcommingBookingsByUserId/${user._id}`
        );

        dispatch({
          type: "DB_COLLECTION_COUNT",
          payload: {},
        });

        admin = [
          {
            key: 1,
            title: "Hotel Bookings",
            description: prevHotelBookingNum.data.length,
            link: "/hotelbookings",
            name: "Hotel Bookings",
          },
          {
            key: 2,
            title: "Parking Bookings",
            description: prevParkingBookingNum.data.length,
            link: "/parkingbookings",
            name: "Parkings Bookings",
          },
          {
            key: 3,
            title: "Hotel and Parking Bookings",
            description: prevHotelAndParkingBookingNum.data.length,
            link: "/hotelandparkingbookings",
            name: "Hotels and Parkings Bookings",
          },
          {
            key: 4,
            title: "Completed Bookings",
            description: prevTotalBookingNum.data.length,
            link: "/hotelbookings",
            name: "Completed Bookings",
          },
          {
            key: 5,
            title: "Upcoming Hotel Bookings",
            description: upcomingHotelBookingNum.data.length,
            link: "/upcominghotelbookings",
            name: "Hotels Bookings",
          },
          {
            key: 6,
            title: "Parking Bookings",
            description: upcomingParkingBookingNum.data.length,
            link: "/upcomingparkingbookings",
            name: "Parkings Bookings",
          },
          {
            key: 7,
            title: "Hotel and Parking Bookings",
            description: upcomingHotelAndParkingBookingNum.data.length,
            link: "/upcominghotelandparkingbookings",
            name: "Hotels and Parkings Bookings",
          },
          {
            key: 8,
            title: "Upcoming Bookings",
            description: upcomingTotalBookingNum.data.length,
            link: "/upcominghotelbookings",
            name: "Upcoming Bookings",
          },
        ];
      }

      dispatch({
        type: "SET_DASHBOARD_CARD",
        payload: { adminCard: admin },
      });

      setCardData(admin);
      console.log("cardData==>", cardData);
    } catch (error) {
      console.error(error);
    }
  };

  const chartListingData = async () => {
    try {
      if (view === "admin") {
        const [hotel, parking, hotelAndParking] = await Promise.all([
          axios.get(`${api}/hotels/chart/hotelData`),
          axios.get(`${api}/parking/chart/parkingData`),
          axios.get(`${api}/hotelandparking/chart/hotelandparkingData`),
        ]);

        const [hotelBooking, parkingBooking, hotelAndParkingBooking] =
          await Promise.all([
            axios.get(`${api}/booking/chart/Allhotelbookings`),
            axios.get(`${api}/booking/chart/Allparkingbookings`),
            axios.get(`${api}/booking/chart/Allhotelandparkingbookings`),
          ]);

        const data = {
          hotel: { name: "Hotel", data: hotel.data },
          parking: { name: "Parking", data: parking.data },
          hotelAndParking: {
            name: "Hotel and Parking",
            data: hotelAndParking.data,
          },
        };

        setListingChartData(data);
        setBookingChartData({
          hotel: { name: "Hotel Bookings", data: hotelBooking.data },
          parking: { name: "Parking Bookings", data: parkingBooking.data },
          hotelAndParking: {
            name: "Hotel and Parking Bookings",
            data: hotelAndParkingBooking.data,
          },
        });
      } else if (view === "partner") {
        if (user.partner_type === "Hotel") {
          const hotelCombinedBookings = await axios.get(
            `${api}/booking/chart/combinedpartnerhotel/${user._id}`
          );

          const hotelIndividualBookings = await axios.get(
            `${api}/booking/chart/hotelbookings/${user._id}`
          );

          setPartnerIndividualData(hotelIndividualBookings.data);
          setPartnerCombinedData({
            name: "Hotel Bookings",
            data: hotelCombinedBookings.data,
          });
        } else if (user.partner_type === "Parking") {
          const parkingCombinedBookings = await axios.get(
            `${api}/booking/chart/combinedpartnerparking/${user._id}`
          );

          const parkingIndividualBookings = await axios.get(
            `${api}/booking/chart/parkingbookings/${user._id}`
          );

          setPartnerIndividualData(parkingIndividualBookings.data);
          setPartnerCombinedData({
            name: "Parking Bookings",
            data: parkingCombinedBookings.data,
          });
        } else if (user.partner_type === "HotelAndParking") {
          const hotelAndParkingCombinedBookings = await axios.get(
            `${api}/booking/chart/combinedpartnerhotelparking/${user._id}`
          );

          const hotelAndParkingIndividualBookings = await axios.get(
            `${api}/booking/chart/hotelandparkingbookings/${user._id}`
          );

          setPartnerIndividualData(hotelAndParkingIndividualBookings.data);
          setPartnerCombinedData({
            name: "Hotel and Parking Bookings",
            data: hotelAndParkingCombinedBookings.data,
          });
        }
      } else if (view === "user") {
        const [
          userAllBooking,
          userHotelBooking,
          userParkingBooking,
          userHotelAndParkingBooking,
        ] = await Promise.all([
          axios.get(`${api}/booking/chart/userallbookings/${user._id}`),
          axios.get(`${api}/booking/chart/userhotelbookings/${user._id}`),
          axios.get(`${api}/booking/chart/userparkingbookings/${user._id}`),
          axios.get(
            `${api}/booking/chart/userhotelandparkingbookings/${user._id}`
          ),
        ]);
        setUserCombinedData({
          name: "All Bookings",
          data: userAllBooking.data,
        });
        setListingChartData({
          hotel: { name: "Hotel Bookings", data: userHotelBooking.data },
          parking: { name: "Parking Bookings", data: userParkingBooking.data },
          hotelAndParking: {
            name: "Hotel and Parking Bookings",
            data: userHotelAndParkingBooking.data,
          },
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error==>==>", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const Data = async () => {
      setIsLoading(true);
      await chartListingData();
    };

    Data();
  }, []);

  useEffect(() => {
    fetchData(); // Execute fetchData function once on rendering

    const intervalId = setInterval(fetchData, 5 * 60 * 1000); // Execute fetchData every 5 minutes (5 * 60 * 1000 milliseconds)

    return () => {
      clearInterval(intervalId); // Clear the interval when the component is unmounted
    };
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // New Card

  const card = (argument) => {
    return argument.map((element, i) => {
      return (
        <div className="col-md-3 col-sm-6 mb-4" key={element.key}>
          <Link
            className={`${style.card1} rounded-3 pb-3 d-block h-100`}
            to={element.link}
          >
            <h3 className="h-50">{element.title}</h3>
            <p
              className={`bolder text-center mb-5 ${style.card1_description} ${
                i === 0
                  ? style.red
                  : i === 1
                  ? style.blue
                  : i === 2
                  ? style.green
                  : i === 3
                  ? style.yellow
                  : i === 4
                  ? style.red
                  : i === 5
                  ? style.blue
                  : i === 6
                  ? style.green
                  : i === 7
                  ? style.yellow
                  : ""
              }`}
            >
              {element.description}
              <div className="fs-5 mt-3 text-secondary">{element.name}</div>
            </p>
            <Link className={style.go_corner} to={element.link}>
              <div className={style.go_arrow}>→</div>
            </Link>
          </Link>
        </div>
      );
    });
  };

  const adminChartList = (data) => {
    return (
      <div className="mt-5 mb-3 mx-4">
        <div
          className="row justify-content-center p-4 rounded-3"
          style={{ backgroundColor: "#dfebf6" }}
        >
          <Typography variant="h6">
            {view === "admin" ? "Property Listing Summary" : "Bookings Summary"}
          </Typography>
          <div className="col-md-6">
            <ChartData
              data1={{
                name: data.hotel.name,
                data: data.hotel.data,
              }}
              data2={{
                name: data.parking.name,
                data: data.parking.data,
              }}
              data3={{
                name: data.hotelAndParking.name,
                data: data.hotelAndParking.data,
              }}
              type="line"
              title="Hotel vs. Parking vs. Hotel and Parking"
              color={["#008FFB", "#00E396", "#FEB019"]}
            />
          </div>
          <div className="col-md-6">
            <Typography>Overview</Typography>
            <div className="row justify-content-center">
              <div
                className="col-md-5 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#008FFB" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {data.hotel.data.reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {data.hotel.name}
                </Typography>
              </div>
              <div
                className="col-md-5 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#00E396" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {data.parking.data.reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {data.parking.name}
                </Typography>
              </div>
              <div
                className="col-md-10 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#FEB019" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {data.hotelAndParking.data.reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {data.hotelAndParking.name}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const partnerindividualChartList = (data) => {
    console.log(data);
    return (
      <div className="mt-5 mb-3 mx-4">
        <div
          className="row justify-content-center p-4 rounded-3"
          style={{ backgroundColor: "#dfebf6" }}
        >
          <Typography variant="h6">Property Wise Booking Summary</Typography>
          <div className="col-md-6">
            <ChartIndividualData
              data={data}
              type="line"
              title={user.partner_type.toUpperCase() + " Booking Summary"}
              color={["#008FFB", "#00E396", "#FEB019"]}
            />
          </div>
          <div className="col-md-6">
            <Typography>Overview</Typography>
            <div className="row justify-content-center">
              <div
                className="col-md-5 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#008FFB" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", color: "#dfebf6" }}
                  align="center"
                >
                  Maximum Bookings
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {Math.max(
                    ...data.map((element) => {
                      return element.data.reduce((acc, curr) => {
                        return acc + curr;
                      }, 0);
                    })
                  )}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {
                    data.reduce(
                      (maxObj, currentObj) => {
                        const currentSum = currentObj.data.reduce(
                          (acc, curr) => acc + curr,
                          0
                        );
                        if (currentSum > maxObj.sum) {
                          return { sum: currentSum, object: currentObj };
                        } else {
                          return maxObj;
                        }
                      },
                      { sum: -Infinity, object: null }
                    ).object.name
                  }
                </Typography>
              </div>
              <div
                className="col-md-5 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#00E396" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", color: "#dfebf6" }}
                  align="center"
                >
                  Minimum Bookings
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {Math.min(
                    ...data.map((element) => {
                      return element.data.reduce((acc, curr) => {
                        return acc + curr;
                      }, 0);
                    })
                  )}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {
                    data.reduce(
                      (maxObj, currentObj) => {
                        const currentSum = currentObj.data.reduce(
                          (acc, curr) => acc + curr,
                          0
                        );
                        if (currentSum < maxObj.sum) {
                          return { sum: currentSum, object: currentObj };
                        } else {
                          return maxObj;
                        }
                      },
                      { sum: Infinity, object: null }
                    ).object.name
                  }
                </Typography>
              </div>
              <div
                className="col-md-10 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#FEB019" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {data
                    .map((element) => {
                      return element.data.reduce((acc, curr) => {
                        return acc + curr;
                      }, 0);
                    })
                    .reduce((acc, curr) => {
                      return acc + curr;
                    })}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {user.partner_type === "Hotel"
                    ? "Total Hotel Bookings"
                    : user.partner_type === "Parking"
                    ? "Total Parking Bookings"
                    : "Total Hotel and Parking Bookings"}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const partnerChartData = (data) => {
    return (
      <div className="mt-5 mb-3 mx-4">
        <div
          className="row justify-content-center p-4 rounded-3"
          style={{ backgroundColor: "#dfebf6" }}
        >
          <Typography variant="h6">Total Bookings Summary</Typography>
          <div className="col-md-6">
            <SingleChartData
              data1={{
                name: data.name,
                data: data.data,
              }}
              type="line"
              title={`All ${
                user.partner_type ? user.partner_type : ""
              } Bookings`}
              // color={["#008FFB", "#00E396", "#FEB019"]}
            />
          </div>
          <div className="col-md-6">
            <Typography>Overview</Typography>
            <div className="row justify-content-center">
              <div
                className="col-md-5 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#008FFB" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", color: "#dfebf6" }}
                  align="center"
                >
                  Maximum Bookings
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {Math.max(...data.data)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {months[data.data.indexOf(Math.max(...data.data))]}
                </Typography>
              </div>
              <div
                className="col-md-5 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#00E396" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", color: "#dfebf6" }}
                  align="center"
                >
                  Minimum Bookings
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {Math.min(...data.data)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {
                    months[
                      data.data
                        .slice(0, new Date().getMonth() + 1)
                        .indexOf(Math.min(...data.data))
                    ]
                  }
                </Typography>
              </div>
              <div
                className="col-md-10 m-1 py-4 rounded-4"
                style={{ backgroundColor: "#FEB019" }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                  align="center"
                >
                  {data.data.reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{ fontWeight: "800", color: "#dfebf6" }}
                >
                  {data.name}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <DashboardLoader />;
  }

  return (
    <>
      <div>
        <AdminNav />
      </div>
      <div className="d-flex">
        <Sidebar />
        <div
          className="container-fluid mb-5"
          style={{
            // marginRight: "10px",
            marginTop: "50px",
            marginLeft: "25px",
          }}
        >
          <div className={`row`}>
            {user.account_type === "user" ? (
              <div className="col-lg-2 col-md-2 col-sm-4 col-6 ms-auto">
                <button className="btn btn-info w-100" onClick={handleOpen}>
                  List your property
                </button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={() => navigate("/hotelform")}>
                    <div className="d-flex">
                      <HotelIcon />
                      <Typography>Hotel Partner</Typography>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/parkingform")}>
                    <div className="d-flex">
                      <LocalParkingIcon />
                      <Typography>Parking Partner</Typography>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/hotelparkingform")}>
                    <div className="d-flex">
                      <HotelIcon />
                      <Typography>Hotel and Parking Partner</Typography>
                    </div>
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
            <div className="col-12 justify-content-center">
              <h1
                className={`text-center fs-1 ${style.heading} fw-bold`}
                // style={{ color: "rgb(0, 7, 61)" }}
              >
                Summary
              </h1>
            </div>

            <div className="row mt-4">{card(cardData)}</div>
          </div>

          {/* Charts */}
          {view === "admin" ? (
            <>
              <div className="row">
                <div className="col-12">{adminChartList(listingChartData)}</div>
                <div className="col-12">{adminChartList(bookingChartData)}</div>
              </div>
            </>
          ) : view === "partner" ? (
            <>
              <div className="row">
                <div className="col-12">
                  {partnerindividualChartList(partnerIndividualData)}
                </div>
                <div className="col-12">
                  {partnerChartData(partnerCombinedData)}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-12">{adminChartList(listingChartData)}</div>
                <div className="col-12">
                  {partnerChartData(userCombinedData)}
                </div>
              </div>
            </>
          )}

          {/* Add operating cities */}
          {view === "admin" && (
            <div>
              <div>
                <div className="container pb-3 mt-4">
                  <div className="row justify-content-center flex align-items-end">
                    <div className="col-md-10">
                      <h1 className="fs-1 fw-bold">Add Cities</h1>
                      <p>
                        Grow up your business by adding new operating cities
                      </p>
                    </div>
                    <div className="col-md-3 mt-3">
                      <input
                        type="text"
                        className="w-100 btn-outline-dark rounded-5"
                        placeholder="Enter city name"
                        onChange={(e) => {
                          setName(e.target.value);
                          console.log(name);
                        }}
                      />
                    </div>
                    <div className="col-md-2 mt-2">
                      <button
                        disabled={
                          !addHotelOperatingCity &&
                          !addParkingOperatingCity &&
                          !addHotelAndParkingOperatingCity
                        }
                        className="btn btn-dark rounded-5 w-100"
                        onClick={handleClick}
                      >
                        Add Operating City
                      </button>
                    </div>
                    <div className="row mt-2 justify-content-center">
                      <div className="col-md-1">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault1"
                            onClick={() => {
                              setaddHotelOperatingCity(!addHotelOperatingCity);
                            }}
                          />
                          <label
                            className="form-check-label fs-6"
                            htmlFor="flexCheckDefault1"
                          >
                            Hotel
                          </label>
                        </div>
                      </div>
                      <div className="col-md-1">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault2"
                            onClick={() => {
                              setaddParkingOperatingCity(
                                !addParkingOperatingCity
                              );
                            }}
                          />
                          <label
                            className="form-check-label fs-6"
                            htmlFor="flexCheckDefault2"
                          >
                            Parking
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault3"
                            onClick={() => {
                              setaddHotelAndParkingOperatingCity(
                                !addHotelAndParkingOperatingCity
                              );
                            }}
                          />
                          <label
                            className="form-check-label fs-6"
                            htmlFor="flexCheckDefault3"
                          >
                            Hotel And Parking
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <h1 className="fw-semibold my-2">
                      Operating Hotels cities
                    </h1>
                    <DashboardDataTable
                      path={path}
                      user={user}
                      type={"hotel"}
                      url={`${api}/OperatingProperty/getHotelOperatingCityObj`}
                    />
                  </div>
                  <div className="col-md-6">
                    <h1 className="fw-semibold my-2">
                      Operating Parking cities
                    </h1>
                    <DashboardDataTable
                      path={path}
                      user={user}
                      type={"parking"}
                      url={`${api}/OperatingProperty/getParkingOperatingCityObj`}
                    />
                  </div>
                  <div className="col-md-6 mt-3">
                    <h1 className="fw-semibold my-2">
                      Operating Hotel and Parking cities
                    </h1>
                    <DashboardDataTable
                      path={path}
                      user={user}
                      type={"hotelAndParking"}
                      url={`${api}/OperatingProperty/getHotelAndParkingOperatingCityObj`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
