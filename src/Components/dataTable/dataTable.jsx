import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../Utilis/Fetch";
import { Box } from "@mui/material";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DataTable = ({ path, user }) => {
  const navigate = useNavigate();
  const { header } = useSelector((state) => state.setHeader);
  const { url } = useSelector((state) => state.setDataUrl);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(url);
  let filteredData = data;
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState({});
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState();

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
        `http://localhost:5000/hotels/deletehotel/${id}`
      );
    } else if (path === "users") {
      data = await axios.delete(`http://localhost:5000/user/delete/${id}`);
    } else if (
      path === "parkings" ||
      path === "parkingRequests" ||
      (path === "Property" && user.partner_type === "Parking") ||
      (path === "PropertyRequests" && user.partner_type === "Parking")
    ) {
      data = await axios.delete(
        `http://localhost:5000/parking/deleteparking/${id}`
      );
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests" ||
      (path === "Property" && user.partner_type === "HotelAndParking") ||
      (path === "PropertyRequests" && user.partner_type === "HotelAndParking")
    ) {
      data = await axios.delete(
        `http://localhost:5000/hotelandparking/deletehotelandparking/${id}`
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
        `http://localhost:5000/booking/deletebooking/${id}`
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
      data = await axios.get(`http://localhost:5000/hotels/gethotelbyid/${id}`);
      if (data) {
        navigate("/viewproperty", {
          state: { data: data.data, user: user, path: path },
        });
      }
    } else if (path === "users") {
      data = await axios.get(`http://localhost:5000/user/getuserbyid/${id}`);
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
        `http://localhost:5000/parking/getParkingById/${id}`
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
        `http://localhost:5000/hotelandparking/gethotelandparkingbyid/${id}`
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
      data = await axios.get(`http://localhost:5000/booking/getBooking/${id}`);
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
      data = await axios.put(`http://localhost:5000/hotels/approvehotel/${id}`);
    } else if (path === "parkingRequests") {
      data = await axios.put(
        `http://localhost:5000/parking/approveParking/${id}`
      );
    } else if (path === "hotelAndParkingRequests") {
      data = await axios.put(
        `http://localhost:5000/hotelandparking/approveHotelAndParking/${id}`
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
    setOpen(false);
  };

  const handleCancelBooking = async (id) => {
    let data;
    if (path === "upcominghotelbookings") {
      data = await axios.delete(
        `http://localhost:5000/booking/cancelHotelReservation/${id}`
      );
    } else if (path === "upcomingparkingbookings") {
      data = await axios.delete(
        `http://localhost:5000/booking/cancelParkingReservation/${id}`
      );
    } else if (path === "upcominghotelandparkingbookings") {
      data = await axios.delete(
        `http://localhost:5000/booking/cancelHotelAndParkingReservation/${id}`
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
  };

  const handleApproveWithRating = async (id, rating) => {
    let data;
    if (path === "hotelRequests") {
      data = await axios.put(
        `http://localhost:5000/hotels/approvehotelAndUpdateRating/${id}`,
        { rating: rating }
      );
    } else if (path === "parkingRequests") {
      data = await axios.put(
        `http://localhost:5000/parking/approveParkingAndUpdateRating/${id}`,
        { rating: rating }
      );
    } else if (path === "hotelAndParkingRequests") {
      data = await axios.put(
        `http://localhost:5000/hotelandparking/approveHotelAndParkingAndUpdateRating/${id}`,
        { hotel_rating: rating }
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
    setRatingOpen(false);
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

  const deleteColumn = [
    {
      field: "delete",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => {
              handleClickOpen();
              setDialogData({ id: params.row._id, action: "delete" });
            }}
          >
            Delete
          </button>
        );
      },
    },
  ];
  const viewColumn = [
    {
      field: "view",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-primary"
            onClick={() => handleView(params.row._id)}
          >
            View
          </button>
        );
      },
    },
  ];
  const approveColumn = [
    {
      field: "approve",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-primary"
            onClick={() => {
              handleClickOpen();
              setDialogData({
                id: params.row._id,
                action: "approve",
                data: params.row.rating | params.row.hotel_rating,
              });
            }}
          >
            Approve
          </button>
        );
      },
    },
  ];

  const cancelBookingColumn = [
    {
      field: "cancelBooking",
      headerName: "",
      width: 170,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => handleCancelBooking(params.row._id)}
          >
            Cancel Booking
          </button>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          height: 450,
          width: "100% !important",
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#a4a9fc",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#f2f0f0",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#a4a9fc",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "none !important",
          },
          "& .MuiCheckbox-root": {
            color: `#1e5245 !important`,
          },
        }}
      >
        <DataGrid
          rows={list}
          columns={
            path === "hotelRequests" ||
            path === "parkingRequests" ||
            path === "hotelAndParkingRequests"
              ? header.concat(viewColumn, deleteColumn, approveColumn)
              : path === "upcominghotelbookings" ||
                path === "upcomingparkingbookings" ||
                path === "upcominghotelandparkingbookings"
              ? header.concat(viewColumn, cancelBookingColumn)
              : header.concat(viewColumn, deleteColumn)
          }
          slots={{
            toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
          loading={loading}
        />
      </Box>
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
            onClick={() => handleApproveWithRating(dialogData.id, rating)}
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;
