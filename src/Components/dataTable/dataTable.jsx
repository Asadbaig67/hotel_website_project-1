import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { useFetch } from "../../Utilis/Fetch";
import { Box } from "@mui/material";
import axios from "axios";

const DataTable = ({ path, user }) => {
  const { header } = useSelector((state) => state.setHeader);
  const { url } = useSelector((state) => state.setDataUrl);
  const dispatch = useDispatch();
  const { data, loading, error } = useFetch(url);
  let filteredData = data;
  const [list, setList] = useState([]);

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
    } else if (path === "users") {
      data = await axios.get(`http://localhost:5000/user/getuserbyid/${id}`);
    } else if (
      path === "parkings" ||
      path === "parkingRequests" ||
      (path === "Property" && user.partner_type === "Parking") ||
      (path === "PropertyRequests" && user.partner_type === "Parking")
    ) {
      console.log(id);
      data = await axios.get(
        `http://localhost:5000/parking/getParkingById/${id}`
      );
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests" ||
      (path === "Property" && user.partner_type === "HotelAndParking") ||
      (path === "PropertyRequests" && user.partner_type === "HotelAndParking")
    ) {
      data = await axios.get(
        `http://localhost:5000/hotelandparking/gethotelandparkingbyid/${id}`
      );
    } else if (
      path === "bookings" ||
      path === "booking" ||
      path === "bookingRequests" ||
      path === "hotelbookings" ||
      path === "parkingbookings" ||
      path === "hotelandparkingbookings"
    ) {
      data = await axios.get(`http://localhost:5000/booking/getBooking/${id}`);
    }
    console.log(data);
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
            onClick={() => handleDelete(params.row._id)}
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
            onClick={() => handleApprove(params.row._id)}
          >
            Approve
          </button>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={list}
        columns={
          path === "hotelRequests" ||
          path === "parkingRequests" ||
          path === "hotelAndParkingRequests"
            ? header.concat(viewColumn, deleteColumn, approveColumn)
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
  );
};

export default DataTable;
