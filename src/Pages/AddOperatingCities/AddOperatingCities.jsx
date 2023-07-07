import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Tooltip } from "@mui/material";
import AdminNav from "../../Components/AdminNavbar/AdminNav";
import SideBar from "../../Components/Sidebar/SideBar";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddOperatingCities = () => {
  const [list, setList] = useState([]);

  const [dataTableAddHotel, setDataTableAddHotel] = useState(false);
  const [dataTableAddParking, setDataTableAddParking] = useState(false);
  const [dataTableAddHotelAndParking, setDataTableAddHotelAndParking] =
    useState(false);

  const addOperatingCity = async (row) => {
    let hotel = "",
      parking = "",
      hotelAndParking = "";
    try {
      if (dataTableAddHotel) {
        hotel = await axios.put(
          `${api}/OperatingProperty/addOperatingHotelCity`,
          { type: "hotel", city: row.city }
        );
      }
      if (dataTableAddParking) {
        parking = await axios.put(
          `${api}/OperatingProperty/addOperatingHotelCity`,
          { type: "parking", city: row.city }
        );
      }
      if (dataTableAddHotelAndParking) {
        hotelAndParking = await axios.put(
          `${api}/OperatingProperty/addOperatingHotelCity`,
          { type: "hotelAndParking", city: row.city }
        );
      }
    } catch (error) {}
    window.location.reload();
  };

  const removeOperatingCity = async (row) => {
    let hotel = "";
    let parking = "";
    let hotelAndParking = "";
    try {
      if (dataTableAddHotel) {
        hotel = await axios.delete(
          `${api}/OperatingProperty/deleteOperatingCity`,
          {
            data: { city: row.city, type: "hotel" },
          }
        );
      }
      if (dataTableAddParking) {
        console.log(row.city);
        parking = await axios.delete(
          `${api}/OperatingProperty/deleteOperatingCity`,
          {
            data: { city: row.city, type: "parking" },
          }
        );
      }
      if (dataTableAddHotelAndParking) {
        console.log(row.city);
        hotelAndParking = await axios.delete(
          `${api}/OperatingProperty/deleteOperatingCity`,
          {
            data: { city: row.city, type: "hotelAndParking" },
          }
        );
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const header = [
    { name: "City Name", selector: (row) => row.city },
    {
      name: "Hotel",
      selector: (row) => {
        if (row.hotel) {
          return (
            <Tooltip title={"Available"}>
              <IconButton style={{ color: "green" }}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title={"Not Available"}>
              <IconButton style={{ color: "red" }}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          );
        }
      },
    },
    {
      name: "Parking",
      selector: (row) => {
        if (row.parking) {
          return (
            <Tooltip title={"Available"}>
              <IconButton style={{ color: "green" }}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title={"Not Available"}>
              <IconButton style={{ color: "red" }}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          );
        }
      },
    },
    {
      name: "Hotel And Parking",
      selector: (row) => {
        if (row.hotelAndParking) {
          return (
            <Tooltip title={"Available"}>
              <IconButton style={{ color: "green" }}>
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          );
        } else {
          return (
            <Tooltip title={"Not Available"}>
              <IconButton style={{ color: "red" }}>
                <CancelIcon />
              </IconButton>
            </Tooltip>
          );
        }
      },
    },
    {
      name: "Actions",
      width: "450px",
      cell: (row) => {
        return (
          <div className="container">
            <div className="row">
              <div className="form-check col-md-2 d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={`flexCheckDefault4${row._id}`}
                  onClick={() => {
                    setDataTableAddHotel(!dataTableAddHotel);
                  }}
                />
                <label
                  style={{ fontSize: "11px" }}
                  className="form-check-label mt-3"
                  htmlFor={`flexCheckDefault4${row._id}`}
                >
                  Hotel
                </label>
              </div>
              <div className="form-check col-md-3 d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={`flexCheckDefault5${row._id}`}
                  onClick={() => {
                    setDataTableAddParking(!dataTableAddParking);
                  }}
                />
                <label
                  style={{ fontSize: "11px" }}
                  className="form-check-label mt-3"
                  htmlFor={`flexCheckDefault5${row._id}`}
                >
                  Parking
                </label>
              </div>
              <div className="form-check col-md-4 d-flex align-items-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id={`flexCheckDefault6${row._id}`}
                  onClick={() => {
                    setDataTableAddHotelAndParking(
                      !dataTableAddHotelAndParking
                    );
                  }}
                />
                <label
                  style={{ fontSize: "11px" }}
                  className="form-check-label mt-3"
                  htmlFor={`flexCheckDefault6${row._id}`}
                >
                  Hotel And Parking
                </label>
              </div>
              <div className="col-md-1">
                <Tooltip title={"Add"}>
                  <IconButton
                    style={{ color: "green" }}
                    onClick={() => {
                      addOperatingCity(row);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="col-md-1">
                <Tooltip title={"Remove"}>
                  <IconButton
                    style={{ color: "red" }}
                    onClick={() => {
                      removeOperatingCity(row);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </div>
        );
      },
    },
  ];

  const [name, setName] = useState("");
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const [addHotelOperatingCity, setaddHotelOperatingCity] = useState(false);
  const [addParkingOperatingCity, setaddParkingOperatingCity] = useState(false);
  const [addHotelAndParkingOperatingCity, setaddHotelAndParkingOperatingCity] =
    useState(false);
  const handleClick = async () => {
    let hotel = [],
      parking = [],
      hotelAndParking = [];
    if (addHotelOperatingCity) {
      hotel = await axios.put(
        `${api}/OperatingProperty/addOperatingHotelCity`,
        { type: "hotel", city: name }
      );
    }
    if (addParkingOperatingCity) {
      parking = await axios.put(
        `${api}/OperatingProperty/addOperatingHotelCity`,
        { type: "parking", city: name }
      );
    }
    if (addHotelAndParkingOperatingCity) {
      hotelAndParking = await axios.put(
        `${api}/OperatingProperty/addOperatingHotelCity`,
        { type: "hotelAndParking", city: name }
      );
    }
    if (hotel || parking || hotelAndParking) {
      alert("Successfully added");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `${api}/OperatingProperty/getAllOperatingCities`
      );
      setList(result.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div>
        <AdminNav />
      </div>
      <div className="d-flex justify-content-between">
        <SideBar />
        <div className="mt-5 me-5">
          <div>
            <div className="container pb-3 mt-4">
              <div className="row justify-content-center flex align-items-end">
                <div className="col-md-11">
                  <h1 className="fs-1 fw-bold">Add Cities</h1>
                  <p>Grow up your business by adding new operating cities</p>
                </div>
                <div className="col-md-4 mt-3">
                  <input
                    type="text"
                    className="w-100 btn-outline-dark rounded-5"
                    placeholder="Enter city name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-3 mt-2">
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
                          setaddParkingOperatingCity(!addParkingOperatingCity);
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
            <div className="row">
              <div className="col-md-12">
                <DataTable
                  title={"Operating Cities"}
                  columns={header}
                  data={list}
                  pagination
                  fixedHeader
                  fixedHeaderScrollHeight="450px"
                  selectableRowsHighlight
                  highlightOnHover
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOperatingCities;
