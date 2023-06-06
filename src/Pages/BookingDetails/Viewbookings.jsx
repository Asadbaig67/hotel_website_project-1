import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import family1 from "../../images/family1.jpg";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const { options } = useSelector((state) => state.searchOption);
  console.log(options);
  const { booked_property } = useSelector((state) => state.getBookedDetails);
  console.log("Booked Rooms Array =", booked_property.Rooms);
  const { dates } = useSelector((state) => state.searchDate);
  const datesParking = useSelector((state) => state.searchParkingDate.dates);
  const { c } = useSelector((state) => state.searchVehicle);
  console.log(booked_property);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  // const roomType = "Deluxe Room";
  const roomPrice = 150;
  // const parkingBooked = true;
  const parkingPrice = 20;
  const additionalCharges = true;
  const additionalChargesDescription = "Room Service";
  const additionalChargesPrice = 20;
  const taxDescription = "Tax (10%)";
  const taxPrice = 200;
  // const totalPrice = roomPrice + parkingPrice + additionalChargesPrice + taxPrice;
  // const Startdate = new Date(dates[0]);
  // const Enddate = new Date(dates[1]);

  let src;
  if (booked_property.photos && booked_property.photos[0]) {
    src = booked_property.photos[0];
  } else if (booked_property.hotel_photos && booked_property.hotel_photos[0]) {
    src = booked_property.hotel_photos[0];
  } else {
    src = null;
  }
  const singleRoomsArray = [];
  const twinRoomsArray = [];
  const familyRoomsArray = [];
  const Rooms = booked_property.Rooms;
  console.log("Rooms =", Rooms);
  let room, room_no;

  if (options.singleRoom > 0) {
    for (let i = 0; i < Rooms.length; i++) {
      room = Rooms[i].room;
      room_no = Rooms[i].room_no;
      if (room.type === "Single") {
        for (let j = 0; j < room_no.length; j++) {
          if (j < options.singleRoom) {
            let roomObj = {
              ...room_no[j],
              RoomId: room._id,
              Room_price: room.price,
            };
            singleRoomsArray.push(roomObj);
          } else {
            break;
          }
        }
      }
    }
  }
  if (options.twinRoom > 0) {
    for (let i = 0; i < Rooms.length; i++) {
      room = Rooms[i].room;
      room_no = Rooms[i].room_no;
      if (room.type === "Twin") {
        for (let j = 0; j < room_no.length; j++) {
          if (j < options.twinRoom) {
            let roomObj = {
              ...room_no[j],
              RoomId: room._id,
              Room_price: room.price,
            };
            twinRoomsArray.push(roomObj);
          } else {
            break;
          }
        }
      }
    }
  }
  if (options.familyRoom > 0) {
    for (let i = 0; i < Rooms.length; i++) {
      room = Rooms[i].room;
      room_no = Rooms[i].room_no;
      if (room.type === "Family") {
        for (let j = 0; j < room_no.length; j++) {
          if (j < options.familyRoom) {
            let roomObj = {
              ...room_no[j],
              RoomId: room._id,
              Room_price: room.price,
            };
            familyRoomsArray.push(roomObj);
          } else {
            break;
          }
        }
      }
    }
  }
  // console.log("Single Room =", options.singleRoom);
  // console.log("Single Rooms Array =", singleRoomsArray);
  // console.log("Twin Room =", options.twinRoom);
  // console.log("Twin Rooms Array =", twinRoomsArray);
  // console.log("Family Room =", options.familyRoom);
  // console.log("Family Rooms Array =", familyRoomsArray);

  // User Id Data
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const userId = loggedinUser.user._id;
  // Hotel Id Data
  const hotelId = booked_property._id;
  // Dates Data
  // const checkIn = new Date(dates[0]).toISOString();
  // const checkOut = new Date(dates[1]).toISOString();
  const checkIn = dates[0];
  const checkOut = dates[1];
  // Room Details
  let roomArray = [];
  let tempObj = {};

  // Let Parking data
  let parking = {};

  if (options.singleRoom > 0) {
    singleRoomsArray.map((room) => {
      tempObj = {
        Room_type: "Single",
        RoomId: room.RoomId,
        Room_no: room.number,
        Room_price: room.Room_price,
      };
      roomArray.push(tempObj);
    });
  }
  if (options.twinRoom > 0) {
    twinRoomsArray.map((room) => {
      tempObj = {
        Room_type: "Twin",
        RoomId: room.RoomId,
        Room_no: room.number,
        Room_price: room.Room_price,
      };
      roomArray.push(tempObj);
    });
  }
  if (options.familyRoom > 0) {
    familyRoomsArray.map((room) => {
      tempObj = {
        Room_type: "Family",
        RoomId: room.RoomId,
        Room_no: room.number,
        Room_price: room.Room_price,
      };
      roomArray.push(tempObj);
    });
  }

  // console.log("User Id =", userId);
  // console.log("Hotel Id =", hotelId);
  // console.log("Check In =", checkIn);
  // console.log("Check Out =", checkOut);
  // console.log("Room Array =", roomArray);
  // console.log("Room Array befor stringinfied=", roomArray);
  roomArray = JSON.stringify(roomArray);
  // console.log("Room Array stringinfied=", roomArray);

  if (booked_property.parking_name) {
    parking = {
      Total_slots: c,
      Parking_price: booked_property.parking_price,
    };
    parking = JSON.stringify(parking);
  }

  let CorrectCheckIn = "";
  let CorrectCheckOut = "";

  if (dates && dates.length === 2) {
    let startingDate = dates[0];
    const [startday, startmonth, startyear] = startingDate
      .split("-")
      .map(Number);
    CorrectCheckIn = startyear + "-" + startmonth + "-" + startday;
    startingDate = new Date(startyear, startmonth - 1, startday); // Note: month is 0-indexed in JavaScript
    let endingDate = dates[1];
    const [endday, endmonth, endyear] = endingDate.split("-").map(Number);
    CorrectCheckOut = endyear + "-" + endmonth + "-" + endday;
    endingDate = new Date(endyear, endmonth - 1, endday); // Note: month is 0-indexed in JavaScript
  }

  const HandleBooking = async () => {
    // Api Request
    if (!booked_property.parking_name) {
      const hotelURL = `http://localhost:5000/booking/addBooking?userId=${userId}&hotelId=${hotelId}&room=${roomArray}&checkIn=${CorrectCheckIn}&checkOut=${CorrectCheckOut}&adults=${options.adult}&children=${options.children}`;
      const requestOptions = {
        method: "POST",
      };
      try {
        const response = await fetch(hotelURL, requestOptions);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          alert("Booking Successful");
        } else {
          alert("Booking Failed");
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    } else {
      const hotelandparkingURL = `http://localhost:5000/booking/addHotelAndParkingBooking?userId=${userId}&HotelAndParkingId=${hotelId}&room=${roomArray}&checkIn=${checkIn}&checkOut=${checkOut}&parking=${parking}`;
      const requestOptions = {
        method: "POST",
      };
      try {
        const response = await fetch(hotelandparkingURL, requestOptions);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          alert("Booking Successful");
        } else {
          alert("Booking Failed");
        }
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />
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
                        <span className="mx-1 ">{dates[0]}</span>
                      </div>
                      <div className="d-flex my-1">
                        <i className="fas fa-calendar-alt mt-1"></i>
                        <span className="mx-1 ">{dates[1]}</span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <i className="fas fa-moon"></i>
                      <span>{booked_property.Nights} Nights</span>
                    </div>
                    <div className="d-flex justify-content-between my-1">
                      <i className="fas fa-users"></i>
                      <span>
                        {options.adult} Adults, {options.children} Child
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <small className="fw-bold text-dark">You selected :</small>

                    <div className="text-muted small">
                      {options.singleRoom > 0
                        ? `${options.singleRoom}x Single Room`
                        : null}{" "}
                      {options.twinRoom > 0
                        ? `- ${options.twinRoom}x Twin Room`
                        : null}{" "}
                      {options.familyRoom > 0
                        ? `- ${options.familyRoom}x Family Room`
                        : null}{" "}
                    </div>
                    <Link to="/listhotel" className="small">
                      Change Your Selection
                    </Link>
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
                        Hotel Details
                      </h1>
                    </div>
                    <div className="row">
                      <div className="col-md-3 col-xl-3 col-sm-12">
                        <div className="h-100 bg-image hover-zoom ripple rounded ripple-surface">
                          <img
                            src={src}
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
                                  backgroundColor: "rgba(253, 253, 253, 0.15)",
                                }}
                              ></div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-9 col-lg-9 col-xl-9">
                        <h5>
                          {booked_property
                            ? booked_property.hotel_name
                              ? booked_property.hotel_name
                              : booked_property.name
                              ? booked_property.name
                              : "Desalis Hotel"
                            : "Hotel Pod Roza"}
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
                              booked_property
                                ? booked_property.rating
                                  ? booked_property.rating
                                  : booked_property.rating
                                  ? booked_property.rating
                                  : 4
                                : 4
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
                            <Box className="ms-3" sx={{ mb: 1, fontSize: 17 }}>
                              {
                                labels[
                                  booked_property
                                    ? booked_property.rating
                                      ? booked_property.rating
                                      : booked_property.hotel_rating
                                      ? booked_property.hotel_rating
                                      : 4
                                    : 4
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
                          {booked_property.description}
                          {booked_property
                            ? booked_property.description
                              ? booked_property.description.slice(0, 320) +
                                `...`
                              : booked_property.hotel_description
                              ? booked_property.hotel_description.slice(
                                  0,
                                  320
                                ) + `...`
                              : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint veritatis quod aut dolor quae nihil inventore harum expedita nobis nisi."
                            : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint veritatis quod aut dolor quae nihil inventore harum expedita nobis nisi."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border rounded-3 shadow">
              <div className="card-body">
                <div className="row mb-4">
                  <div className="col-12 text-center">
                    <h1 className="bg-warning rounded-3 py-3 text-dark">
                      Room To Be Booked
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row mb-3">
                      {options.singleRoom > 0 && (
                        <>
                          <div className="col-md-4">
                            <h5>Single Rooms:</h5>
                          </div>
                          <div className="col-md-8 justify-content-end">
                            <span className="fw-bold">
                              {singleRoomsArray.map(
                                (room, index) =>
                                  `Room No: ${room.number}${
                                    index === singleRoomsArray.length - 1
                                      ? ""
                                      : ", "
                                  }`
                              )}
                            </span>
                          </div>
                        </>
                      )}
                      {/* <div className="col-md-4">
                        <h5>Single Rooms:</h5>
                      </div>
                      <div className="col-md-8 justify-content-end">
                        <span className="fw-bold">
                          {singleRooms.map(
                            (roomNo, index) =>
                              `Room No: ${roomNo}${
                                index === singleRooms.length - 1 ? "" : ", "
                              }`
                          )}
                        </span>
                      </div> */}
                    </div>
                    <div className="row mb-3">
                      {options.twinRoom > 0 ? (
                        <>
                          <div className="col-md-4">
                            <h5>Twin Rooms:</h5>
                          </div>
                          <div className="col-md-8 justify-content-end">
                            <span className="fw-bold">
                              {twinRoomsArray.map(
                                (room, index) =>
                                  `Room No: ${room.number}${
                                    index === twinRoomsArray.length - 1
                                      ? ""
                                      : ", "
                                  }`
                              )}
                            </span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {/* <div className="col-md-4">
                        <h5>Twin Rooms:</h5>
                      </div>
                      <div className="col-md-8">
                        <span className="fw-bold">
                          {twinRooms.map(
                            (roomNo, index) =>
                              `Room No: ${roomNo}${
                                index === twinRooms.length - 1 ? "" : ", "
                              }`
                          )}
                        </span>
                      </div> */}
                    </div>
                    <div className="row mb-3">
                      {options.familyRoom > 0 ? (
                        <>
                          <div className="col-md-4">
                            <h5>Family Rooms:</h5>
                          </div>
                          <div className="col-md-8 justify-content-end">
                            <span className="fw-bold">
                              {familyRoomsArray.map(
                                (room, index) =>
                                  `Room No: ${room.number}${
                                    index === familyRoomsArray.length - 1
                                      ? ""
                                      : ", "
                                  }`
                              )}
                            </span>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {/* <div className="col-md-4">
                        <h5>Family Rooms:</h5>
                      </div>
                      <div className="col-md-8">
                        <span className="fw-bold">
                          {familyRooms.map(
                            (roomNo, index) =>
                              `Room No: ${roomNo}${
                                index === familyRooms.length - 1 ? "" : ", "
                              }`
                          )}
                        </span>
                      </div> */}
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
                    <div className="row text-center mb-4">
                      <h1 className="mb-0 fw-bold d-inline bg-warning rounded-3 p-3 text-dark">
                        Your Price Summary
                      </h1>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h5>Room Booked</h5>
                        {options.singleRoom > 0 ? (
                          <div className="d-flex justify-content-between align-items-center">
                            <span>Single Room</span>
                            <span className="fw-bold">
                              {`${options.singleRoom}x  ${booked_property.SingleRoomPrice}`}
                            </span>
                          </div>
                        ) : null}{" "}
                        {options.twinRoom > 0 ? (
                          <div className="d-flex justify-content-between align-items-center ">
                            <span>Twin Room</span>
                            <span className="fw-bold">
                              {`${options.twinRoom}x  ${booked_property.TwinRoomPrice}`}
                            </span>
                          </div>
                        ) : null}{" "}
                        {options.familyRoom > 0 ? (
                          <div className="d-flex justify-content-between align-items-center ">
                            <span>Family Room</span>
                            <span className="fw-bold">
                              {`${options.familyRoom}x  ${booked_property.FamilyRoomPrice}`}
                            </span>
                          </div>
                        ) : null}{" "}
                      </div>
                    </div>
                    <hr />
                    {booked_property.parking_name && (
                      <>
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <h5>{booked_property.parking_name}</h5>
                            <div className="d-flex justify-content-between align-items-center ">
                              <span>Parking price:</span>
                              <span className="fw-bold">
                                {`${c}x ${booked_property.parking_price}`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </>
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
                    <div
                      className="row mt-4 p-4 rounded-1"
                      style={{ backgroundColor: "#ebf3ff" }}
                    >
                      <div className="col-md-12">
                        <h5 className="text-dark fw-bold fs-2">Total Price</h5>
                        <div className="border-bottom pb-2">
                          <div className="d-flex justify-content-between align-items-center text-white p-2">
                            <div className="fw-bold fs-4 text-dark">
                              Price :
                            </div>
                            <div>
                              <span className="fw-bold text-dark fs-3">
                                PKR $
                                {booked_property.parking_price
                                  ? booked_property.Total_Price +
                                    220 +
                                    booked_property.parking_price * c
                                  : booked_property.Total_Price + 220}
                                {booked_property.StandardPrice && (
                                  <small>
                                    Total Price = $
                                    {booked_property.StandardPrice + 220}
                                  </small>
                                )}
                              </span>
                              <br />
                              <small className="text-dark">
                                +PKR ${taxPrice + additionalChargesPrice} taxes
                                and charges
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="text-end">
                          <button
                            className="btn mt-3 btn-primary btn-lg fw-bold text-light fs-5 "
                            onClick={HandleBooking}
                          >
                            Book For PKR
                            {booked_property.parking_price
                              ? booked_property.Total_Price +
                                220 +
                                booked_property.parking_price * c
                              : booked_property.Total_Price + 220}
                            {booked_property.StandardPrice && (
                              <small>
                                Total Price = $
                                {booked_property.StandardPrice + 220}
                              </small>
                            )}
                          </button>
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
      <Footer />
    </>
  );
};

export default ViewBookings;
