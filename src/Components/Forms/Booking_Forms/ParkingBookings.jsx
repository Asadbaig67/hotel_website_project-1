import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import CircularProgress from "@mui/material/CircularProgress";
import Sidebar from "../../Sidebar/SideBar";
import AdminNav from "../../AdminNavbar/AdminNav";
import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useSelector } from "react-redux";

const ParkingBooking = () => {
  // STATES AND VARIABLES

  //Alerts Code
  const [emptyInput, setEmptyInput] = useState(false);
  const [emptyParkingInput, setEmptyParkingInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  // Accordion Code
  let date = new Date();
  const [valueIn, setValueIn] = useState(
    dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  );
  const [valueOut, setValueOut] = useState(
    dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 2}`)
  );
  const nights = dayjs(valueOut).diff(dayjs(valueIn), "day");

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    vehicles: 0,
  });

  const [vehicleInfo, setVehicleInfo] = useState([]);
  // FUNCTIONS AND METHODS

  // Alert Code Functions
  const handleClickOpen = () => {
    if (
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.phone === "" ||
      formValues.vehicles === ""
    ) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
    if (vehicleInfo.length === 0) {
      setEmptyParkingInput(true);
      return;
    }
    if (formValues.vehicles * 2 !== Object.keys(vehicleInfo).length) {
      setEmptyParkingInput(true);
      return;
    }
    if (!formValues.vehicles * 2 !== Object.keys(vehicleInfo).length) {
      const entries = Object.entries(vehicleInfo);
      const empty = entries.some(([key, value]) => {
        return value === "";
      });
      setEmptyParkingInput(empty);
      return;
    }
  };

  const handleConditions = () => {
    setError(false);
    setMessage("");
  };

  const handleSuccess = () => {
    window.location.reload();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAddVehicle = (event) => {
    const { name, value } = event.target;
    setVehicleInfo((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  let singleParkingPrice = 1000;
  const total_price = formValues.vehicles * singleParkingPrice;

  const parkingId = "6489849705a34468514ae1fc";

  const handleBooking = async (event) => {
    setLoading(true);
    setMessage("");
    event.preventDefault();  
    const url = `${api}/adminbookings/parkingbooking`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parkingId,
        checkIn: valueIn.format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        checkOut: valueOut.format("YYYY-MM-DDTHH:mm:ssZ[Z]"),
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        parking_info: {
          parking_name: "Parking one",
          vehicles_info: vehicleInfo,
          booked_slots: formValues.vehicles,
          price: 200,
        },
        total_price,
        bookedBy: user.account_type,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        setMessage("Booking Successfully!!");
        setLoading(false);
        setSuccess(true);
      } else {
        setMessage("Something Went Wrong, Booking Unsuccessfull!");
        setSuccess(false);
        setLoading(false);
        setError(true);
      }
      await response.json();
    } catch (error) {
      console.log(error);
    }
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
        <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Confirm Booking
              </h1>
            </div>
            <div class="modal-body">
              {emptyInput || emptyParkingInput ? (
                <span className="text-danger d-block">
                  Please fill all the fields!!
                </span>
              ) : (
                ""
              )}
              {!emptyInput && !emptyParkingInput && (
                <>
                  <span className="d-block">
                    {message === ""
                      ? "Are you sure to make this booking?"
                      : message}
                  </span>
                </>
              )}
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
                <Button
                  variant="contained"
                  disabled={emptyInput || emptyParkingInput}
                  onClick={handleBooking}
                >
                  Confirm Booking
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
                <>
                  <Button
                    variant="contained"
                    color="success"
                    data-bs-dismiss="modal"
                    onClick={handleSuccess}
                  >
                    Finish
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <Sidebar />
        <div
          className="container-fluid "
          style={{
            backgroundColor: "#fff",
            marginTop: "60px",
            marginLeft: "6px",
          }}
        >
          <h1 className="text-center fw-bold fs-1 my-4">
            Parking Booking Form
          </h1>
          <form className="needs-validation card p-3 shadow mx-4">
            <div className="row my-1">
              <h2 className="my-2">Enter CheckIn | CheckOut Dates :</h2>
              <div className="col-md-4 mb-2 col-sm-12">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      label="Check-In Date"
                      className="w-100"
                      value={valueIn}
                      onChange={(newValue) => setValueIn(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-md-4 mb-3 col-sm-12 ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                      className="w-100"
                      label="Check-Out Date"
                      value={valueOut}
                      onChange={(newValue) => setValueOut(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-md-4 bg-light text-center rounded-3 my-auto col-sm-12">
                <span className="fs-4">
                  Availabe Slots :{" "}
                  <span className="text-warning fs-2"> 100</span>
                </span>
              </div>
            </div>

            <div className="row my-1">
              <h2 className="mb-3">Customer Information :</h2>
              <div className="col-md-4 mb-3">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  name="name"
                  type="text"
                  onChange={handleInputChange}
                  value={formValues.name}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-3">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  name="email"
                  onChange={handleInputChange}
                  value={formValues.email}
                  type="email"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-3">
                <TextField
                  id="outlined-basic"
                  label="Phone Number"
                  name="phone"
                  onChange={handleInputChange}
                  value={formValues.phone}
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="row my-1">
              <h2 className="mb-3">Total Vehicles:</h2>
              <div className="col-md-4 mb-3">
                <TextField
                  id="outlined-number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="No of Vehicles"
                  name="vehicles"
                  onChange={handleInputChange}
                  value={formValues.vehicles}
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>

            <div className="row my-1">
              {formValues.vehicles > 0 && (
                <>
                  <h2 className="mb-3">Enter Vehicles Information :</h2>
                  {[...Array(parseInt(formValues.vehicles))].map(
                    (element, index) => (
                      <>
                        <div className="col-md-6 mb-3">
                          <TextField
                            id="outlined-basic"
                            label={`Vehicle ${index + 1} Name`}
                            name={`Vehicle-${index + 1}-Name`}
                            type="text"
                            onChange={handleAddVehicle}
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <TextField
                            id="outlined-basic"
                            label={`Vehicle ${index + 1} Number`}
                            name={`Vehicle-${index + 1}-No`}
                            type="text"
                            onChange={handleAddVehicle}
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                      </>
                    )
                  )}
                </>
              )}
            </div>

            <hr className="mt-3" />
            <div className="row my-1"></div>
            <div
              className="row my-1 rounded-3 py-2"
              style={{ backgroundColor: "#ebf3ff" }}
            >
              <h1 className="mb-3 text-dark">Payment Information :</h1>

              <div className="">
                <span>Price for {nights} days</span>
                <h1>
                  Total Price :<span>{total_price}/-</span>
                </h1>
              </div>
              <div className="mt-5 text-center">
                <button
                  type="button"
                  class="btn btn-primary btn-lg profile-button mb-4"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={handleClickOpen}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ParkingBooking;
