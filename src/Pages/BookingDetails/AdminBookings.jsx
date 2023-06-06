import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import family1 from "../../images/family1.jpg";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Topbar from "../../Components/Topbar/Topbar";
import SidebarAdmin from "../../Components/AdminDashboardSidebar/AdminDashboardSidebar";

// export default ViewBookings;
const ViewBookings = () => {
  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  const { cardData } = useSelector((state) => state.setCardData);
  const Location = useLocation();
  const { data, path, user } = Location.state;

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  // This Page Data

  // Hotel data,parking data, hotelandparking data
  const [datafromId, setDatafromId] = useState({});

  const FetchDatafromId = async () => {
    let url = "";
    if (data) {
      console.log("dataaaa", data);
      if (data.Booking_type === "hotel") {
        // console.log(data.hotelId);
        url = `http://localhost:5000/hotels/gethotelbyid/${data.hotelId}`;
        const response = await axios.get(url);
        // console.log("res", response.data);

        setDatafromId(response.data);
      } else if (data.Booking_type === "hotelandparking") {
        url = `http://localhost:5000/hotelandparking/gethotelandparkingById/${data.HotelAndParkingId}`;
        const response = await axios.get(url);
        // console.log("res", response.data);
        setDatafromId(response.data);
      } else {
        url = `http://localhost:5000/parking/getParkingById/${data.parkingId}`;
        const response = await axios.get(url);
        // console.log("res", response.data);
        setDatafromId(response.data);
      }
    }
  };

  let cardPicture = "";
  if (
    (datafromId.photos && datafromId.photos.length !== 0) ||
    (datafromId.hotel_photos && datafromId.photos.length !== 0)
  ) {
    cardPicture = datafromId.photos[0];
  }
  // console.log(cardPicture);

  useEffect(() => {
    FetchDatafromId();
  }, []);

  const startDateObject = new Date(data.checkIn);
  const endDateObject = new Date(data.checkOut);

  let Nights = 0;
  const timeDiff = Math.abs(
    startDateObject.getTime() - endDateObject.getTime()
  );
  Nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  // console.log(Nights);

  const startDateString = startDateObject
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);
  const endDateString = endDateObject
    .toISOString()
    .replace("T", " ")
    .slice(0, 19);

  const startDate = startDateString.split(" ")[0];
  const startTime = startDateString.split(" ")[1];
  const endDate = endDateString.split(" ")[0];
  const endTime = endDateString.split(" ")[1];

  let totalSingle = 0;
  let totalTwin = 0;
  let totalFamily = 0;
  let singleRoomsArray = [];
  let twinRoomsArray = [];
  let familyRoomsArray = [];

  data.room.forEach((room) => {
    if (room.Room_type === "Single") {
      totalSingle++;
      singleRoomsArray.push(room.Room_no);
    } else if (room.Room_type === "Twin") {
      totalTwin++;
      twinRoomsArray.push(room.Room_no);
    } else {
      totalFamily++;
      familyRoomsArray.push(room.Room_no);
    }
  });

  let roomDetails = {
    totalSingle: totalSingle,
    singleRoomsArray: singleRoomsArray,
    totalTwin: totalTwin,
    twinRoomsArray: twinRoomsArray,
    totalFamily: totalFamily,
    familyRoomsArray: familyRoomsArray,
  };

  // console.log("oiugf", roomDetails);
  // console.log("Bhai Data To agyahua hai", datafromId);

  const [loading, setLoading] = useState(true);

  if (!datafromId) {
    setLoading(true);
  }

  useEffect(() => {
    if (datafromId) {
      setLoading(false);
    }
  }, [datafromId]);

  return (
    <>
      <Topbar />
      <div className="d-flex">
        <SidebarAdmin />
        {loading ? (
          <h1>Loading</h1>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="py-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="text-center">
                        <h1 className="mb-3 card-title fw-bold bg-info rounded-3 p-3 text-dark">
                          Your Booking Details
                        </h1>
                      </div>
                      <div>
                        <div className="d-flex justify-content-between ">
                          <div className="d-flex my-1">
                            <i className="fas fa-calendar-alt mt-1"></i>
                            <span className="mx-1 ">{startDate}</span>
                          </div>
                          <div className="d-flex my-1">
                            <i className="fas fa-calendar-alt mt-1"></i>
                            <span className="mx-1 ">{endDate}</span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between my-1">
                          <i className="fas fa-moon"></i>
                          <span>{Nights ? `${Nights} Nights` : ""} </span>
                        </div>
                        <div className="d-flex justify-content-between my-1">
                          <i className="fas fa-users"></i>
                          <span>
                            {data.persons
                              ? `${data.persons.adults} Adults`
                              : ""}
                            {data.persons
                              ? `,${data.persons.childrens} Child`
                              : ""}
                          </span>
                        </div>
                      </div>
                      <hr />
                      <div>
                        {(data.Booking_type === "hotel" ||
                          data.Booking_type === "hotelandparking") && (
                          <>
                            <small className="fw-bold text-dark">
                              Rooms Details:
                            </small>
                            <div className="text-muted small">
                              {roomDetails.totalSingle > 0 && (
                                <div>
                                  {roomDetails.totalSingle}x Single Room : Room
                                  Numbers:{" "}
                                  {roomDetails.singleRoomsArray.join(", ")}
                                </div>
                              )}
                              {roomDetails.totalTwin > 0 && (
                                <div>
                                  {roomDetails.totalTwin}x Twin Room : Room
                                  Numbers:{" "}
                                  {roomDetails.twinRoomsArray.join(", ")}
                                </div>
                              )}
                              {roomDetails.totalFamily > 0 ? (
                                <div>
                                  {roomDetails.totalFamily}x Family Room : Room
                                  Numbers:{" "}
                                  {roomDetails.familyRoomsArray.join(", ")}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </>
                        )}
                        {data.parking && (
                          <>
                            <small className="fw-bold text-dark">
                              Parking Details:
                            </small>
                            <div className="text-muted small d-flex flex-row justify-content-between">
                              {data.parking.Total_slots > 0 && (
                                <>
                                  <div className="d-flex">
                                    <h5>Total Slots</h5>
                                    <span>{data.parking.Total_slots}</span>
                                  </div>
                                  <div className="d-flex">
                                    <h5>Total Price</h5>
                                    <span>{data.parking.Parking_price}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="py-2 d-flex flex-column">
                  <div className="justify-content-center">
                    <div className="card shadow-0 border rounded-3">
                      <div className="card-body">
                        <div className="row text-center">
                          <h1 className="mb-3 fw-bold d-inline bg-info rounded-3 p-3 text-dark">
                            {data.Booking_type === "hotel"
                              ? "Hotel"
                              : data.Booking_type === "parking"
                              ? "Parking"
                              : data.Booking_type === "hotelandparking"
                              ? "Hotel And Parking"
                              : ""}
                            Details
                          </h1>
                        </div>
                        <div className="row">
                          <div className="col-md-3 col-xl-3 col-sm-12">
                            <div className="h-100 bg-image hover-zoom ripple rounded ripple-surface">
                              <img
                                src={cardPicture}
                                className=""
                                style={{
                                  objectFit: "cover",
                                  // imageRendering: "crisp-edges",
                                }}
                              />
                              <Link to="/">
                                <div className="hover-overlay">
                                  <div
                                    className="mask"
                                    style={{
                                      backgroundColor:
                                        "rgba(253, 253, 253, 0.15)",
                                    }}
                                  ></div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className="col-md-9 col-lg-9 col-xl-9">
                            <h5>
                              {data.Booking_type === "hotel"
                                ? datafromId.name
                                : data.Booking_type === "hotelandparking"
                                ? datafromId.hotel_name
                                : data.Booking_type === "parking"
                                ? datafromId.name
                                : null}
                            </h5>
                            <Box
                              className="justify-content-start"
                              sx={{
                                width: 200,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Rating
                                name="hover-feedback"
                                value={
                                  data.Booking_type === "hotel"
                                    ? datafromId.rating
                                    : data.Booking_type === "parking"
                                    ? 5
                                    : data.Booking_type === "hotelandparking"
                                    ? datafromId.hotel_rating
                                    : 5
                                }
                                precision={1}
                                getLabelText={getLabelText}
                                // onChange={(event, newValue) => {
                                //   setValue(newValue);
                                // }}
                                // onChangeActive={(event, newHover) => {
                                //   setHover(newHover);
                                // }}
                                emptyIcon={
                                  <StarIcon
                                    style={{ opacity: 0.55 }}
                                    fontSize="inherit"
                                  />
                                }
                              />
                              {
                                <Box
                                  className="ms-3"
                                  sx={{ mb: 1, fontSize: 17 }}
                                >
                                  {
                                    labels[
                                      data.Booking_type === "hotel"
                                        ? datafromId.rating
                                        : data.Booking_type === "parking"
                                        ? 5
                                        : data.Booking_type ===
                                          "hotelandparking"
                                        ? datafromId.hotel_rating
                                        : 5
                                    ]
                                  }
                                </Box>
                              }
                            </Box>
                            <div
                              className="mt-1 mb-0 text-muted"
                              style={{ fontSize: "12px" }}
                            >
                              <span>{cardData.attr1}</span>
                              <span className="text-primary"> • </span>
                              <span>{cardData.attr2}</span>
                              <span className="text-primary"> • </span>
                              <span>
                                {cardData.attr3}
                                <br />
                              </span>
                            </div>
                            <div
                              className="mb-1 text-muted small"
                              style={{ fontSize: "12px" }}
                            >
                              <span>{cardData.attr4}</span>
                              <span className="text-primary"> • </span>
                              <span>{cardData.attr5}</span>
                              <span className="text-primary"> • </span>
                              <span>
                                {cardData.attr6}
                                <br />
                              </span>
                            </div>
                            <p className="w-100">
                              {data.Booking_type === "hotel" &&
                                datafromId.description}
                              {data.Booking_type === "hotelandparking" &&
                                datafromId.hotel_description}
                              {data.Booking_type === "parking" &&
                                datafromId.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="">
                <div className="py-2">
                  <div className="justify-content-center">
                    {/* <div className="card shadow-0 border rounded-3">
                  <div className="card-body">
                    <div className="row text-center mb-4">
                      <h1 className="mb-0">Price Summary</h1>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h5>Room Booked</h5>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span>Room type: {roomType}</span>
                          <span className="fw-bold">${roomPrice}</span>
                        </div>
                      </div>
                    </div>
                    {parkingBooked && (
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <h5>Parking</h5>
                          <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                            <span>Parking price:</span>
                            <span className="fw-bold">${parkingPrice}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {additionalCharges && (
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <h5>Additional Charges</h5>
                          <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                            <span>{additionalChargesDescription}:</span>
                            <span className="fw-bold">
                              ${additionalChargesPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <h5>Tax Details</h5>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span>{taxDescription}:</span>
                          <span className="fw-bold">${taxPrice}</span>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <h5>Total Price</h5>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span>Total:</span>
                          <span className="fw-bold">${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                    <div className="card border rounded-3 shadow">
                      <div className="card-body">
                        <div className="text-center mb-4">
                          <span className="mb-0 fw-bold text-center fs-2 border-bottom border-dark text-dark">
                            Your Price Summary
                          </span>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <h5>Room Booked</h5>
                            {roomDetails.totalSingle > 0 ? (
                              <div className="d-flex justify-content-between align-items-center">
                                <span>Single Room</span>
                                <span className="fw-bold">
                                  {`${roomDetails.totalSingle}x Single Room${
                                    roomDetails.totalSingle > 1 ? "s" : ""
                                  }`}
                                </span>
                              </div>
                            ) : null}{" "}
                            {roomDetails.totalTwin > 0 ? (
                              <div className="d-flex justify-content-between align-items-center ">
                                <span>Twin Room</span>
                                <span className="fw-bold">
                                  {`${roomDetails.totalTwin}x Twin Room${
                                    roomDetails.totalTwin > 1 ? "s" : ""
                                  } `}
                                </span>
                              </div>
                            ) : null}{" "}
                            {roomDetails.totalFamily > 0 ? (
                              <div className="d-flex justify-content-between align-items-center ">
                                <span>Family Room</span>
                                <span className="fw-bold">
                                  {`${roomDetails.totalFamily}x Family Room${
                                    roomDetails.totalFamily > 1 ? "s" : ""
                                  }`}
                                </span>
                              </div>
                            ) : null}{" "}
                          </div>
                        </div>
                        <hr />
                        {data.parking && (
                          <>
                            <div className="row mt-3">
                              <div className="col-md-12">
                                <h5>Parking Details</h5>
                                <div className="d-flex justify-content-between align-items-center ">
                                  <span>Total Slots Booked</span>
                                  <span className="fw-bold">
                                    {`${data.parking.Total_slots} Slot${
                                      data.parking.Total_slots > 1 ? "s" : ""
                                    }`}
                                  </span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center ">
                                  <span>Parking price:</span>
                                  <span className="fw-bold">
                                    {`${data.parking.Parking_price} PKR`}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <hr />
                          </>
                        )}

                        {/* {additionalCharges && (
                      <div className="row mt-3">
                        <div className="col-md-12">
                          <h5>Additional Charges</h5>
                          <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                            <span>{additionalChargesDescription}:</span>
                            <span className="fw-bold">
                              ${additionalChargesPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    )} */}
                        {/* <div className="row mt-3">
                      <div className="col-md-12">
                        <h5>Tax Details</h5>
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
                          <span>{taxDescription}:</span>
                          <span className="fw-bold">${taxPrice}</span>
                        </div>
                      </div>
                    </div> */}
                        <div
                          className="row mt-4 p-4 rounded-1"
                          style={{ backgroundColor: "#ebf3ff" }}
                        >
                          <div className="col-md-12">
                            <span className="text-dark fw-bold fs-2 border-bottom border-dark fs-2">
                              Total Price{" "}
                            </span>
                            <div className="border-bottom pb-2">
                              <div className="d-flex justify-content-between align-items-center text-white p-2">
                                <div className="fw-bold fs-4 text-dark"></div>
                                <div>
                                  <span className="fw-bold text-dark fs-3">
                                    PKR {data.total_price}
                                  </span>
                                  <br />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default ViewBookings;
