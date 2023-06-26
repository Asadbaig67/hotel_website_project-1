import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./viewProperty.module.css";
import RestoreIcon from "@mui/icons-material/Restore";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { useMediaQuery } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Button from "@mui/material/Button";
import AdminNav from "../../Components/AdminNavbar/AdminNav";

import {
  parkingDetailHeader,
  roomHeader,
  bookingHotelAndParkingHeader,
  bookingHotelHeader,
  bookingParkingHeader,
} from "../../Utilis/DataTableSource";
import { useDispatch } from "react-redux";
import Sidebar from "../../Components/Sidebar/SideBar";
import CircularProgress from "@mui/material/CircularProgress";

const Viewproperty = () => {
  const dispatch = useDispatch();
  const IsMobile = useMediaQuery("(max-width:450px)");
  const IsTablet = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const location = useLocation();
  const { data, user, path } = location.state;
  const [header, setHeader] = useState([]);

  const [roomdata, setRoomdata] = useState({});
  const [newRooms, setNewRooms] = useState("");
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const handlenewRoomChange = (event) => {
    setNewRooms(event.target.value);
  };

  const [formValues, setFormValues] = useState({
    room_no: "",
    type: "",
    price: "",
    description: "",
  });

  // Confirm Modal Code
  const [emptyInput, setEmptyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [DelroomNo, setDelRoomNo] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleClickOpen = (roomid, roomNo) => {
    setRoomId(roomid);
    setDelRoomNo(roomNo);
  };

  const handleConditions = () => {
    setError(false);
    setMessage("");
  };
  const handleSuccess = () => {
    setSuccess(false);
    setMessage("");
    window.location.reload();
  };

  const handleConditionsUpdate = () => {
    setError(false);
    setMessage("");
  };

  // Upload Images Code And Preview Code
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (path === "hotels" || user.partner_type === "Hotel") {
      setHeader(bookingHotelHeader);
    } else if (path === "parkings" || user.partner_type === "Parking") {
      setHeader(bookingParkingHeader);
    } else if (
      path === "HotelsAndParkings" ||
      user.partner_type === "HotelAndParking"
    ) {
      setHeader(bookingHotelAndParkingHeader);
    }
  }, []);

  let roomsArray = newRooms.split(",");
  roomsArray = roomsArray.map((room) => {
    let num = parseInt(room.trim());
    return isNaN(num) ? null : num;
  });
  roomsArray = roomsArray.filter((room) => {
    return room !== null;
  });

  const handleUpdate = async (id) => {
    setLoading(true);
    setMessage("");
    const url = `${api}/room/updateroom/${id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: formValues.price,
        description: formValues.description,
        roomNo: roomsArray,
      }),
    };
    const response = await fetch(url, options);
    if (response.status === 200) {
      setMessage("Updated Successfully!!");
      setLoading(false);
      setSuccess(true);
    } else if (response.status === 422) {
      setMessage("Sorry some error occured!!");
      setSuccess(false);
      setLoading(false);
      setError(true);
    } else {
      setMessage("Something Went Wrong!!");
      setSuccess(false);
      setLoading(false);
      setError(true);
    }
  };

  const handleRoomDelete = async () => {
    setLoading(true);
    setMessage("");
    const url = `${api}/room/deleterooms/${roomId}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNo: DelroomNo,
      }),
    };
    const response = await fetch(url, options);
    if (response.status === 200) {
      setMessage("Hotel Added Successfully!!");
      setLoading(false);
      setSuccess(true);
    } else if (response.status === 422) {
      setMessage("Hotel Alreay Exists!!");
      setSuccess(false);
      setLoading(false);
      setError(true);
    } else {
      setMessage("Something Went Wrong!!");
      setSuccess(false);
      setLoading(false);
      setError(true);
    }
  };

  const handleDelete = async (id) => {
    let res;
    if (user.account_type === "admin") {
      if (path === "hotels" || path === "hotelRequests") {
        res = await axios.delete(
          `${api}/room/deleteroombyidfromhotel?hotelId=${data._id}&roomId=${id}`
        );
      } else if (
        path === "HotelsAndParkings" ||
        path === "hotelAndParkingRequests"
      ) {
        res = await axios.delete(
          `${api}/room/deleteroombyidfromhotelandparking?hotelAndParkingId=${data._id}&roomId=${id}`
        );
      }
    } else if (user.account_type === "partner") {
      if (user.partner_type === "Hotel") {
        res = await axios.delete(
          `${api}/room/deleteroombyidfromhotel?hotelId=${data._id}&roomId=${id}`
        );
      } else if (user.partner_type === "HotelAndParking") {
        res = await axios.delete(
          `${api}/room/deleteroombyidfromhotelandparking?hotelAndParkingId=${data._id}&roomId=${id}`
        );
      }
    }

    if (res) setRooms(rooms.filter((item) => item._id !== id));
  };

  const updateColumn = [
    {
      field: "Update",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        const handleUpdateClick = () => {
          setRoomdata(params.row);
        };

        return (
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-info"
            // onClick={() => setRoomdata(params.row) handleUpdate(params.row._id)}
            onClick={handleUpdateClick}
          >
            Update
          </button>
        );
      },
    },
  ];

  const deleteColumn = [
    {
      field: "delete",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    if (!data.rooms) return;
    const roomPromises = data.rooms.map(async (room) => {
      try {
        const response = await axios.get(`${api}/room/getroombyid/${room}`);
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return null; // Skip current iteration
        } else {
          // Handle other errors
          console.error(`Error fetching room ${room}:`, error);
          throw error; // or return null, depending on your needs
        }
      }
    });
    const resolvedRooms = await Promise.all(roomPromises);
    setRooms(resolvedRooms.filter(Boolean));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const [booking, setBooking] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      let bookings;
      if (path === "hotels" || user.partner_type === "Hotel") {
        bookings = await axios.get(
          `${api}/booking/getBookingByHotelId/${data._id}`
        );
      } else if (path === "parkings" || user.partner_type === "Parking") {
        bookings = await axios.get(
          `${api}/booking/getBookingByParkingId/${data._id}`
        );
      } else if (
        path === "HotelsAndParkings" ||
        user.partner_type === "HotelAndParking"
      ) {
        bookings = await axios.get(
          `${api}/booking/getBookingByHotelAndParkingId/${data._id}`
        );
      }
      if (bookings) setBooking(bookings.data);
    };
    fetchBooking();
  }, []);

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

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  useEffect(() => {
    if (roomdata) {
      setFormValues({
        room_no: roomdata.room_no,
        type: roomdata.type,
        price: roomdata.price,
        description: roomdata.description,
      });
    }
  }, [roomdata]);

  const addRoom = () => {
    dispatch({
      type: "SET_HOTEL",
      payload: data,
    });
    console.log(data);
    navigate("/roomform");
  };

  return (
    <>
      <div>
        <AdminNav />
      </div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Confirm Delete Room
              </h1>
            </div>
            <div class="modal-body">
              <span className="d-block">
                {message === ""
                  ? `Are you sure you want to delete Room No ${DelroomNo} ?`
                  : message}
              </span>
            </div>
            <div class="modal-footer">
              {!success && (
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={handleConditions}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              )}
              {!loading && !success && !error && (
                <Button variant="contained" onClick={handleRoomDelete}>
                  Confirm Delete
                </Button>
              )}
              {loading ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                ""
              )}
              {success && (
                <Button
                  variant="contained"
                  color="success"
                  data-bs-dismiss="modal"
                  onClick={function () {
                    window.location.reload();
                  }}
                >
                  Finish
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Update {roomdata.type} Room
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {error ? (
                <span className="text-danger mt-1 d-block ">{message}</span>
              ) : (
                ""
              )}
              {success ? `${roomdata.type} Room Updated Successfully!!` : ""}
              {!success && !error && (
                <>
                  <div className={`container  ${IsMobile ? "" : "w-100"} `}>
                    <form className="needs-validation mx-4">
                      <div className="row mt-2">
                        <div className="col-md-6">
                          <label htmlFor="validationCustom01">Room Type</label>
                          <select
                            className="form-select"
                            name="type"
                            id="validationCustom01"
                            value={formValues.type}
                            required
                            disabled
                            onChange={handleInputChange}
                          >
                            <option value="">Select room type</option>
                            <option value="Single">Single</option>
                            <option value="Twin">Twin</option>
                            <option value="Family">Family</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label>Room Price</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Price"
                            name="price"
                            value={formValues.price}
                            // value={roomdata.price}
                            required
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mt-2">
                          <label>Description</label>
                          <textarea
                            className="form-control"
                            placeholder="Description"
                            value={formValues.description}
                            name="description"
                            style={{ height: "100px" }}
                            required
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-12 mt-2">
                          <label>Available Rooms</label>
                          {formValues.room_no &&
                            formValues.room_no.map((room) => (
                              <div
                                className="d-flex flex-row justify-content-between"
                                key={room.number}
                              >
                                <div className="my-2 ">
                                  <h5>Room {room.number}</h5>
                                </div>
                                <div className="my-2">
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() =>
                                      handleClickOpen(roomdata._id, room.number)
                                    }
                                  >
                                    <DeleteIcon />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 mt-2">
                          <label>Add New Room</label>
                          <small>
                            Please give comma seperated list Ex.(44,55,101,78)
                          </small>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Room No"
                            name="room_no"
                            value={newRooms}
                            required
                            onChange={handlenewRoomChange}
                          />
                        </div>
                      </div>
                      {formValues.price === "" ? (
                        <span className="text-danger mt-1 d-block ">
                          -- Price Field is empty!!
                        </span>
                      ) : (
                        ""
                      )}
                      {formValues.description === "" ? (
                        <span className="text-danger mt-1 d-block ">
                          -- Description Field is empty!!
                        </span>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                </>
              )}
            </div>
            <div class="modal-footer">
              {!success && (
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={handleConditionsUpdate}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              )}
              {!loading && !success && !error && (
                <Button
                  variant="contained"
                  disabled={
                    formValues.price === "" || formValues.description === ""
                  }
                  onClick={() => handleUpdate(roomdata._id)}
                >
                  Save Changes
                </Button>
              )}
              {loading ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                ""
              )}
              {success && (
                <Button
                  variant="contained"
                  color="success"
                  data-bs-dismiss="modal"
                  onClick={handleSuccess}
                >
                  Finish
                </Button>
              )}
              {/* <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleConditionsUpdate}
              >
                Close
              </button> */}
              {/* <button
                type="button"
                class="btn btn-primary btn-lg profile-button mb-4"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop12"
                onClick={() => handleClickOpenUpdate(roomdata._id)}
              >
                Save Changes
              </button> */}
              {/* <button
                type="button"
                onClick={() => handleUpdate(roomdata._id)}
                class="btn btn-lg btn-primary"
              >
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <Sidebar />
        <div
          className={`container-fluid ${IsTablet ? "pe-4" : ""} ${
            styles.property_details
          }`}
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-between">
                  <h1 className={`${styles.property_name} mb-2`}>
                    {data.name || data.hotel_name}
                  </h1>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className={styles.property_ratings}>
                  <Box
                    className="justify-content-start mb-2"
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="hover-feedback"
                      readOnly
                      value={
                        data
                          ? data.rating
                            ? data.rating
                            : data.hotel_rating
                            ? data.hotel_rating
                            : 0
                          : null
                      }
                      precision={1}
                      getLabelText={getLabelText}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <Box className="ms-3" sx={{ mb: 1, fontSize: 17 }}>
                      {
                        labels[
                          data
                            ? data.rating
                              ? data.rating
                              : data.hotel_rating
                              ? data.hotel_rating
                              : 0
                            : null
                        ]
                      }
                    </Box>
                  </Box>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="d-flex flex-row">
                  <span>
                    <Link
                      to="/"
                      className="text-primary fs-8 fw-bold my-0 mx-md-0 mx-0"
                    >
                      {data.city || data.hotel_city}
                    </Link>
                  </span>
                  <span>
                    <div to="/" className="fs-8 fw-light my-0 mx-1">
                      {data.country || data.hotel_country}
                    </div>
                  </span>
                  <span>
                    <DirectionsWalkIcon
                      fontSize="small"
                      className="mb-2 small"
                    />
                    29 min (1.8km)
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <hr />
                <div className="mb-3">
                  <Tooltip
                    title="Accessible For People With Reduced Mobility"
                    arrow
                  >
                    <AccessibleIcon
                      fontSize="larger"
                      className="bg-secondary rounded-pill p-1 me-2 fs-1"
                    />
                  </Tooltip>
                  <Tooltip title="24h Service" arrow>
                    <RestoreIcon
                      fontSize="larger"
                      className="bg-secondary rounded-pill p-1 ms-1 fs-1"
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div className={`container-fluid ${styles.property_info}`}>
            <h3 className="fw-bold fs-5 text-dark my-2">
              Details: About the car park
            </h3>
            <div className="row">
              <div className="col-12">
                <div className={styles.property_description}>
                  <p>{data.description || data.hotel_description}</p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className={styles.property_features}>
                  <h3 className="my-1">Features:</h3>
                  <ul className={`mt-2 ${styles.features_list}`}>
                    {data.Facilities
                      ? data.Facilities.map((feature) => (
                          <li key={feature} className={styles.feature_item}>
                            {feature}
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Code */}
          <div
            className="modal fade"
            id="exampleModal1"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen-md-down">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div
                    id="carouselExample"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-inner">
                      {data.photos
                        ? data.photos.map((e, index) => (
                            <div
                              className={`carousel-item ${
                                index === 0 ? "active" : ""
                              }`}
                              key={index}
                            >
                              <img
                                src={e}
                                className="d-block w-100"
                                style={{ objectFit: "cover", height: "500px" }}
                                alt="property pic"
                              />
                            </div>
                          ))
                        : data.hotel_photos.map((e, index) => (
                            <div
                              className={`carousel-item ${
                                index === 0 ? "active" : ""
                              }`}
                              key={index}
                            >
                              <img
                                src={e}
                                className="d-block w-100"
                                style={{ objectFit: "cover", height: "500px" }}
                                alt="property pic"
                              />
                            </div>
                          ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="prev"
                    >
                      <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExample"
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-12 mb-2">
                <div className={`${styles.property_pictures}`}>
                  <h3 className="my-3">Pictures:</h3>
                  {data.photos
                    ? data.photos.map((picture) => (
                        <button
                          type="button"
                          className="btn btn-unstyled"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
                        >
                          <img
                            src={picture}
                            className={`${styles.preview_image} me-2`}
                            alt="upload"
                          />
                        </button>
                      ))
                    : data.hotel_photos.map((picture) => (
                        <button
                          type="button"
                          className="btn btn-unstyled"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
                        >
                          <img
                            src={picture}
                            className={`${styles.preview_image} me-2`}
                            alt="upload"
                          />
                        </button>
                      ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 mb-2">
                {(user.account_type === "admin" && path === "parkings") ||
                (user.account_type === "admin" && path === "parkingRequests") ||
                (user.partner_type === "Parking" && path === "Property") ||
                (user.partner_type === "Parking" &&
                  path === "PropertyRequests") ? (
                  <div className="my-3">
                    <h3 className="fw-bold fs-5 my-3 text-dark my-2">
                      All Parking Details
                    </h3>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={[data]}
                        columns={parkingDetailHeader}
                        getRowId={(row) => row._id}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5,
                            },
                          },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                      />
                    </Box>
                  </div>
                ) : (
                  <div className="my-3">
                    <div className="d-flex justify-content-between">
                      <h3 className="fw-bold fs-5 my-3 text-dark my-2">
                        All Rooms And Details
                      </h3>
                      {rooms.length < 3 ? (
                        <button
                          className="btn btn-secondary my-2 btn-md"
                          onClick={addRoom}
                        >
                          Add New Rooms
                        </button>
                      ) : null}
                    </div>
                    <Box sx={{ height: 400, width: "100%" }}>
                      <DataGrid
                        rows={rooms}
                        columns={roomHeader.concat(updateColumn, deleteColumn)}
                        getRowId={(row) => row._id}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: 5,
                            },
                          },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                      />
                    </Box>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="my-3">
                  <h3 className="fw-bold fs-5 my-3 text-dark my-2">
                    All Bookings Details
                  </h3>
                  <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                      rows={booking}
                      columns={header}
                      getRowId={(row) => row._id}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5,
                          },
                        },
                      }}
                      pageSizeOptions={[5]}
                      checkboxSelection
                      disableRowSelectionOnClick
                    />
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Viewproperty;
