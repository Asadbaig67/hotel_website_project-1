import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../Utilis/Fetch";
import axios from "axios";
import DataTable from "react-data-table-component";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useMediaQuery } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReactDataTable = ({ path, user }) => {
  const navigate = useNavigate();
  const { header } = useSelector((state) => state.setHeader);
  const { url } = useSelector((state) => state.setDataUrl);
  const { isOpen } = useSelector((state) => state.openSidebar);

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  
  const isDesktop = useMediaQuery("(max-width: 992px)");

  const { data, loading, error } = useFetch(url);
  let filteredData = data;
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setList(filteredData);
  }, [filteredData]);

  const handleDelete = async (id) => {
    let data;
    if (
      path === "hotels" ||
      path === "hotelRequests" ||
      (path === "Property" && user.partner_type === "Hotel") ||
      (path === "PropertyRequests" && user.partner_type === "Hotel")
    ) {
      data = await axios.delete(
        `${api}/hotels/deletehotel/${id}`
      );
    } else if (path === "users") {
      data = await axios.delete(`${api}/user/delete/${id}`);
    } else if (
      path === "parkings" ||
      path === "parkingRequests" ||
      (path === "Property" && user.partner_type === "Parking") ||
      (path === "PropertyRequests" && user.partner_type === "Parking")
    ) {
      data = await axios.delete(
        `${api}/parking/deleteparking/${id}`
      );
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests" ||
      (path === "Property" && user.partner_type === "HotelAndParking") ||
      (path === "PropertyRequests" && user.partner_type === "HotelAndParking")
    ) {
      data = await axios.delete(
        `${api}/hotelandparking/deletehotelandparking/${id}`
      );
    } else if (
      path === "bookings" ||
      path === "booking" ||
      path === "bookingRequests" ||
      path === "hotelbookings" ||
      path === "parkingbookings" ||
      path === "hotelandparkingbookings"
    ) {
      data = await axios.delete(
        `${api}/booking/deletebooking/${id}`
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
    setOpen(false);
  };

  const handleView = async (id) => {
    let data;
    if (
      path === "hotels" ||
      path === "hotelRequests" ||
      (path === "Property" && user.partner_type === "Hotel") ||
      (path === "PropertyRequests" && user.partner_type === "Hotel")
    ) {
      data = await axios.get(`${api}/hotels/gethotelbyid/${id}`);
      if (data) {
        navigate("/viewproperty", {
          state: { data: data.data, user: user, path: path },
        });
      }
    } else if (path === "users") {
      data = await axios.get(`${api}/user/getuserbyid/${id}`);
      if (data) {
        navigate("/viewproperty", {
          state: { data: data.data, user: user, path: path },
        });
      }
    } else if (
      path === "parkings" ||
      path === "parkingRequests" ||
      (path === "Property" && user.partner_type === "Parking") ||
      (path === "PropertyRequests" && user.partner_type === "Parking")
    ) {
      data = await axios.get(
        `${api}/parking/getParkingById/${id}`
      );
      if (data) {
        navigate("/viewproperty", {
          state: { data: data.data, user: user, path: path },
        });
      }
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests" ||
      (path === "Property" && user.partner_type === "HotelAndParking") ||
      (path === "PropertyRequests" && user.partner_type === "HotelAndParking")
    ) {
      data = await axios.get(
        `${api}/hotelandparking/gethotelandparkingbyid/${id}`
      );
      if (data) {
        navigate("/viewproperty", {
          state: { data: data.data, user: user, path: path },
        });
      }
    } else if (
      path === "bookings" ||
      path === "booking" ||
      path === "bookingRequests" ||
      path === "hotelbookings" ||
      path === "parkingbookings" ||
      path === "hotelandparkingbookings"
    ) {
      data = await axios.get(`${api}/booking/getBooking/${id}`);
      if (data) {
        navigate("/viewbookingdetails", {
          state: { data: data.data, user: user, path: path },
        });
      }
    }
  };

  const handleApprove = async (id) => {
    let data;
    if (path === "hotelRequests") {
      data = await axios.put(`${api}/hotels/approvehotel/${id}`);
    } else if (path === "parkingRequests") {
      data = await axios.put(
        `${api}/parking/approveParking/${id}`
      );
    } else if (path === "hotelAndParkingRequests") {
      data = await axios.put(
        `${api}/hotelandparking/approveHotelAndParking/${id}`
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
    setOpen(false);
  };

  const handleCancelBooking = async (id) => {
    let data;
    if (path === "upcominghotelbookings") {
      data = await axios.delete(
        `${api}/booking/cancelHotelReservation/${id}`
      );
    } else if (path === "upcomingparkingbookings") {
      data = await axios.delete(
        `${api}/booking/cancelParkingReservation/${id}`
      );
    } else if (path === "upcominghotelandparkingbookings") {
      data = await axios.delete(
        `${api}/booking/cancelHotelAndParkingReservation/${id}`
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
  };

  const handleApproveWithRating = async (id, rating) => {
    let data;
    if (path === "hotelRequests") {
      data = await axios.put(
        `${api}/hotels/approvehotelAndUpdateRating/${id}`,
        { rating: rating }
      );
    } else if (path === "parkingRequests") {
      data = await axios.put(
        `${api}/parking/approveParkingAndUpdateRating/${id}`,
        { rating: rating }
      );
    } else if (path === "hotelAndParkingRequests") {
      data = await axios.put(
        `${api}/hotelandparking/approveHotelAndParkingAndUpdateRating/${id}`,
        { hotel_rating: rating }
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
    setRatingOpen(false);
  };

  const handleUpdate = (id) => {
    if (
      user.partner_type === "Hotel" ||
      path === "hotels" ||
      path === "hotelRequests"
    )
      navigate("/updatehotel", { state: { id: id } });
    else if (
      user.partner_type === "Parking" ||
      path === "parkings" ||
      path === "parkingRequests"
    )
      navigate("/updateparking", { state: { id: id } });
    else if (
      user.partner_type === "HotelAndParking" ||
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests"
    )
      navigate("/updatehotelandparking", { state: { id: id } });
  };

  const Addnew = () => {
    if (
      path === "hotels" ||
      path === "hotelRequests" ||
      (path === "Property" && user.partner_type === "Hotel") ||
      (path === "PropertyRequests" && user.partner_type === "Hotel")
    ) {
      // window.location.href = "/hotelform";
      navigate("/hotelform");
    } else if (path === "users") {
      // window.location.href = "/adduser";
      navigate("/adduser");
    } else if (
      path === "hotelbookings" ||
      path === "upcominghotelbookings" ||
      path === "cancelbooking"
    ) {
      // window.location.href = "/addbooking";
      // navigate("/");
    } else if (
      path === "parkingbookings" ||
      path === "upcomingparkingbookings"
    ) {
      // window.location.href = "/addbooking";
      navigate("/parking");
    } else if (
      path === "hotelandparkingbookings" ||
      path === "upcominghotelandparkingbookings"
    ) {
      // window.location.href = "/addbooking";
      navigate("/HotelAndParking");
    } else if (
      path === "parkings" ||
      path === "parkingRequests" ||
      (path === "Property" && user.partner_type === "Parking") ||
      (path === "PropertyRequests" && user.partner_type === "Parking")
    ) {
      // window.location.href = "/parkingform";
      navigate("/parkingform");
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests" ||
      (path === "Property" && user.partner_type === "HotelAndParking") ||
      (path === "PropertyRequests" && user.partner_type === "HotelAndParking")
    ) {
      // window.location.href = "/hotelparkingform";
      navigate("/hotelparkingform");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenRating = () => {
    setRatingOpen(true);
  };

  const handleCloseRating = () => {
    setRatingOpen(false);
  };

  const updateColumn = {
    name: "Action",
    cell: (row) => (
      <button
        className="btn btn-info btn-sm"
        onClick={() => {
          handleUpdate(row);
        }}
      >
        Edit
      </button>
    ),
  };

  const deleteColumn = {
    name: "Action",
    cell: (row) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          handleClickOpen();
          setDialogData({ id: row._id, action: "delete" });
        }}
      >
        Delete
      </button>
    ),
  };

  const viewColumn = {
    name: "Action",
    cell: (row) => (
      <button
        className="btn btn-primary btn-sm"
        onClick={() => handleView(row._id)}
      >
        View
      </button>
    ),
  };

  const approveColumn = {
    name: "Action",
    cell: (row) => (
      <button
        className="btn btn-primary"
        onClick={() => {
          handleClickOpen();
          setDialogData({
            id: row._id,
            action: "approve",
            data: row.rating | row.hotel_rating,
          });
        }}
      >
        Approve
      </button>
    ),
  };

  const cancelBookingColumn = {
    name: "Action",
    cell: (row) => (
      <button
        className="btn btn-danger"
        onClick={() => handleCancelBooking(row._id)}
      >
        Cancel Booking
      </button>
    ),
  };

  const [widthdata, setWidthdata] = useState(window.innerWidth - 90);

  useEffect(() => {
    setWidthdata(window.innerWidth - 90);
  }, [window.innerWidth]);

  return (
    <>
      <div
        style={{ width: `${!isOpen || isDesktop ? widthdata : ""}` }}
        className={`${isDesktop ? "col-11" : "col-12"}`}
      >
        <DataTable
          title={
            user.account_type === "admin"
              ? path === "hotels"
                ? "Hotels"
                : path === "parkings"
                ? "Parkings"
                : path === "HotelsAndParkings"
                ? "Hotels And Parkings"
                : path === "booking"
                ? "Booking"
                : path === "cancelbooking"
                ? "Cancel Bookings"
                : path === "hotelRequests"
                ? "Hotel Requests"
                : path === "parkingRequests"
                ? "Parking Requests"
                : path === "hotelAndParkingRequests"
                ? "Hotel And Parking Requests"
                : null
              : user.account_type === "partner"
              ? user.partner_type === "Hotel"
                ? path === "Property"
                  ? "Hotels"
                  : path === "booking"
                  ? "Booking"
                  : path === "cancelbooking"
                  ? "Cancel Bookings"
                  : path === "PropertyRequests"
                  ? "Pending Properties"
                  : path === "bookingRequests"
                  ? "Upcoming Bookings"
                  : null
                : user.partner_type === "Parking"
                ? path === "Property"
                  ? "Parkings"
                  : path === "booking"
                  ? "Booking"
                  : path === "cancelbooking"
                  ? "Cancel Bookings"
                  : path === "PropertyRequests"
                  ? "Pending Properties"
                  : path === "bookingRequests"
                  ? "Upcoming Bookings"
                  : null
                : user.partner_type === "HotelAndParking"
                ? path === "Property"
                  ? "Hotels And Parkings"
                  : path === "booking"
                  ? "Booking"
                  : path === "cancelbooking"
                  ? "Cancel Bookings"
                  : path === "PropertyRequests"
                  ? "Pending Properties"
                  : path === "bookingRequests"
                  ? "Upcoming Bookings"
                  : null
                : null
              : user.account_type === "user"
              ? path === "hotelbookings"
                ? "Hotel Bookings"
                : path === "parkingbookings"
                ? "Parking Bookings"
                : path === "hotelandparkingbookings"
                ? "Hotel And Parking Bookings"
                : path === "upcominghotelbookings"
                ? "Upcoming Hotel Bookings"
                : path === "upcomingparkingbookings"
                ? "Upcoming Parking Bookings"
                : path === "upcominghotelandparkingbookings"
                ? "Upcoming Hotel And Parking Bookings"
                : path === "cancelbooking"
                ? "Canceled Bookings"
                : null
              : null
          }
          columns={
            path === "hotelRequests" ||
            path === "parkingRequests" ||
            path === "hotelAndParkingRequests"
              ? header.concat(
                  updateColumn,
                  viewColumn,
                  deleteColumn,
                  approveColumn
                )
              : path === "upcominghotelbookings" ||
                path === "upcomingparkingbookings" ||
                path === "upcominghotelandparkingbookings"
              ? header.concat(viewColumn, cancelBookingColumn)
              : path === "hotels" ||
                path === "parkings" ||
                path === "HotelsAndParkings" ||
                path === "Property" ||
                path === "PropertyRequests"
              ? header.concat(updateColumn, viewColumn, deleteColumn)
              : header.concat(viewColumn, deleteColumn)
          }
          data={list}
          actions={
            <button className="btn btn-primary fw-bold" onClick={Addnew}>
              Add new
            </button>
          }
          pagination
          fixedHeader
          fixedHeaderScrollHeight="450px"
          selectableRowsHighlight
          highlightOnHover
        />
        {/* Confirmation */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {dialogData.action === "delete" ? "Delete" : "Approve"}
          </DialogTitle>
          <hr className="m-0" />
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to{" "}
              {dialogData.action === "delete" ? "Delete" : "Approve"}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                dialogData.action === "delete"
                  ? handleDelete(dialogData.id)
                  : handleApprove(dialogData.id);
              }}
            >
              {dialogData.action === "delete"
                ? "Delete"
                : `Approve with rating ${dialogData.data}`}
            </Button>
            {dialogData.action === "approve" ? (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  handleOpenRating();
                  handleClose();
                }}
              >
                Update rating and approve
              </Button>
            ) : null}
          </DialogActions>
        </Dialog>
        {/* Rating */}
        <Dialog open={ratingOpen} onClose={handleClose}>
          <DialogTitle>Update Rating</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Rating"
              type="number"
              fullWidth
              variant="standard"
              inputProps={{
                max: 5, // Maximum value
                min: 1, // Minimum value
              }}
              onChange={(e) => setRating(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleCloseRating}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={rating < 1 || rating > 5 ? true : false}
              onClick={() => handleApproveWithRating(dialogData.id, rating)}
            >
              Approve
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ReactDataTable;
