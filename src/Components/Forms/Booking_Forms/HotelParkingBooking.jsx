import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Sidebar from "../../Sidebar/SideBar";
import AdminNav from "../../AdminNavbar/AdminNav";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const HotelBooking = () => {
  // STATES AND VARIABLES

  //Alerts Code
  const [emptyInput, setEmptyInput] = useState(false);
  const [emptyParkingInput, setEmptyParkingInput] = useState(false);
  const [finalloading, setFinalLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  // Accordion Code
  const [expanded, setExpanded] = useState("panel0");
  let date = new Date();
  const [valueIn, setValueIn] = useState(
    dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  );
  const [valueOut, setValueOut] = useState(
    dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 2}`)
  );
  const nights = dayjs(valueOut).diff(dayjs(valueIn), "day");
  const [roomData, setRoomData] = useState([]);
  const [openTab, setOpenTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState({
    Single: [],
    Twin: [],
    Family: [],
  });
  const [roomsVar, setRoomsVar] = useState([]); // ["Single", "Twin", "Family"]

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    adults: 0,
    childrens: 0,
    vehicles: 0,
  });

  const [vehicleInfo, setVehicleInfo] = useState([]);
  const [vehicleName, setVehicleName] = useState([]);
  const [vehicleNumber, setVehicleNumber] = useState([]);
  // FUNCTIONS AND METHODS

  // Alert Code Functions
  const handleClickOpen = () => {
    if (
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.phone === "" ||
      formValues.adults === "" ||
      formValues.childrens === "" ||
      formValues.vehicles === ""
    ) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
    console.log("Length =", vehicleInfo.length);
    if (vehicleInfo.length === 0) {
      setEmptyParkingInput(true);
      return;
    }
    console.log(
      "Logic ",
      formValues.vehicles * 2 !== Object.keys(vehicleInfo).length
    );
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

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
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

  const handleVehicleName = (event) => {
    const { name, value } = event.target;
    setVehicleName((prevValues) => ({
      ...prevValues,
      [name + "Name"]: value,
    }));
  };

  const handleVehicleNumber = (event) => {
    const { name, value } = event.target;
    setVehicleNumber((prevValues) => ({
      ...prevValues,
      [name + "Number"]: value,
    }));
  };

  const handleAddRoom = (number, type, price, id, checked) => {
    if (checked) {
      setRooms((prevValues) => ({
        ...prevValues,
        [type]: [...prevValues[type], number],
      }));
    } else {
      setRooms((prevValues) => ({
        ...prevValues,
        [type]: prevValues[type].filter((room) => room !== number),
      }));
    }

    if (checked) {
      setRoomsVar((prevValues) => [
        ...prevValues,
        {
          Room_type: type,
          RoomId: id,
          Room_no: number,
          Room_price: price,
        },
      ]);
    } else {
      setRoomsVar((prevValues) =>
        prevValues.filter(
          (room) =>
            room.Room_no !== number ||
            room.Room_type !== type ||
            room.RoomId !== id
        )
      );
    }
  };

  // LOOP THROUGH ROOMS VAR AND CALCULATE TOTAL PRICE

  let total_price = roomsVar.reduce((accumulator, currentRoom) => {
    if (currentRoom.Room_type === "Single") {
      return accumulator + currentRoom.Room_price * nights;
    }
    if (currentRoom.Room_type === "Twin") {
      return accumulator + currentRoom.Room_price * nights;
    }
    if (currentRoom.Room_type === "Family") {
      return accumulator + currentRoom.Room_price * nights;
    }
  }, 0);

  const hotelAndParkingId = "64863f0115ed9bead43021ae";
  const handleRoomsRequest = async (event) => {
    setLoading(true);
    setOpenTab(false);
    event.preventDefault();
    const url = `${api}/hotelandparking/getHotelAndParkingRooms?checkIn=${valueIn}&checkOut=${valueOut}&id=${hotelAndParkingId}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const { rooms } = await response.json();
      setRoomData(rooms);
      console.log(rooms);
      setOpenTab(true);
      setLoading(false);
    } catch (error) {
      setOpenTab(false);
      setLoading(false);
      console.log(error);
    }
  };

  const handleBooking = async (event) => {
    setFinalLoading(true);
    setMessage("");
    event.preventDefault();
    const url = `${api}/adminbookings/hotelandparkingbooking`;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotelAndParkingId,
        checkIn: valueIn.format("YYYY-MM-DD"),
        checkOut: valueOut.format("YYYY-MM-DD"),
        rooms: roomsVar,
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        adults: formValues.adults,
        childrens: formValues.childrens,
        parking_info: {
          parking_name: "Parking one",
          vehicles_info: vehicleInfo,
          booked_slots: formValues.vehicles,
          price: 100,
        },
        total_price,
        bookedBy: user.account_type,
      }),
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        setMessage("Booking Successfully!!");
        setFinalLoading(false);
        setSuccess(true);
      } else {
        setMessage("Something Went Wrong, Booking Unsuccessfull!");
        setSuccess(false);
        setFinalLoading(false);
        setError(true);
      }
      await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(vehicleInfo);

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
              {roomsVar.length === 0 && (
                <span className="text-danger d-block">
                  Please select atleast one room!!
                </span>
              )}
              {!(roomsVar.length === 0) &&
                !emptyInput &&
                !emptyParkingInput && (
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
              {!finalloading && !success && !error && (
                <Button
                  variant="contained"
                  disabled={
                    roomsVar.length === 0 || emptyInput || emptyParkingInput
                  }
                  onClick={handleBooking}
                >
                  Confirm Booking
                </Button>
              )}
              {finalloading ? (
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
            marginLeft: "25px",
          }}
        >
          <h1 className="text-center fw-bold fs-1 my-4">
            Hotel And Parking Booking Form
          </h1>
          <form className="needs-validation card p-3 shadow mx-4">
            <div className="row my-1">
              <h2 className="my-2">Check Room Availablility :</h2>
              <div className="col-md-4 mb-2 col-sm-12">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Check-In Date"
                      value={valueIn}
                      onChange={(newValue) => setValueIn(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-md-4 mb-3 col-sm-12 ">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      className="w-100"
                      label="Check-Out Date"
                      value={valueOut}
                      onChange={(newValue) => setValueOut(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="col-md-4 my-auto col-sm-12">
                <button
                  className="btn btn-lg btn-secondary w-100"
                  onClick={handleRoomsRequest}
                  type="button"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={20} sx={{ p: 0 }} />
                  ) : (
                    "Check Availablility"
                  )}
                </button>
              </div>
            </div>

            <div className="row my-1">
              {openTab && (
                <>
                  <h2 className="my-2">Rooms Details :</h2>
                  <span className="text-primary">
                    Please Select The Rooms From These Avaiable Rooms
                  </span>
                  <div className="col-md-12 col-sm-12">
                    <div>
                      {roomData.map((room, index) => (
                        <Accordion
                          expanded={expanded === `panel${index}`}
                          onChange={handleChange(`panel${index}`)}
                        >
                          <AccordionSummary
                            aria-controls="panel1d-content"
                            id="panel1d-header"
                          >
                            <Typography>{room.type}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <strong>
                              Available {room.type} Rooms :{" "}
                              {room.rooms_list.length} | Each Room Price :{" "}
                              {room.price}
                            </strong>
                            <Typography>
                              <div className="">
                                {room.rooms_list.map(
                                  (roomNumber, roomIndex) => (
                                    <FormControlLabel
                                      required
                                      key={roomIndex}
                                      value={roomNumber}
                                      name={room.type}
                                      onChange={(e) =>
                                        handleAddRoom(
                                          roomNumber,
                                          room.type,
                                          room.price,
                                          room.id,
                                          e.target.checked
                                        )
                                      }
                                      // onChange={(e) =>
                                      //   setRoomsVar((prevValues) => ({
                                      //     ...prevValues,
                                      //     roomsVar: [
                                      //       ...prevValues.roomsVar,
                                      //       {
                                      //         Room_type: e.target.name,
                                      //         RoomId: room.id,
                                      //         Room_no: e.target.value,
                                      //         Room_price: room.price,
                                      //       },
                                      //     ],
                                      //   }))
                                      // }
                                      control={<Checkbox />}
                                      label={`Room ${roomNumber}`}
                                    />
                                  )
                                )}
                              </div>
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </div>
                  </div>
                </>
              )}
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
              <h2 className="mb-3">Persons Information :</h2>
              <div className="col-md-4 mb-3">
                <TextField
                  id="outlined-number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Adults"
                  type="number"
                  name="adults"
                  onChange={handleInputChange}
                  value={formValues.adults}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="col-md-4 mb-3">
                <TextField
                  id="outlined-number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Childrens"
                  name="childrens"
                  onChange={handleInputChange}
                  value={formValues.childrens}
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </div>
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
                            // name={`Vehicle-${index + 1}`}
                            type="text"
                            onChange={handleAddVehicle}
                            // onChange={handleVehicleName}
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <TextField
                            id="outlined-basic"
                            label={`Vehicle ${index + 1} Number`}
                            name={`Vehicle-${index + 1}-No`}
                            // name={`Vehicle-${index + 1}`}
                            type="text"
                            onChange={handleAddVehicle}
                            // onChange={handleVehicleNumber}
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
            <div className="row my-1">
              {(rooms.Single.length > 0 ||
                rooms.Twin.length > 0 ||
                rooms.Family.length > 0) && (
                <>
                  <h2 className="mb-3">Selected Rooms Information :</h2>
                  <h6>There are the details of you selection</h6>
                </>
              )}

              <div className="col-md-12">
                {rooms.Single.length > 0 && (
                  <>
                    <h3>Selected Single Rooms</h3>
                    <div>
                      <div>
                        {rooms.Single.map((room_no, index) => (
                          <span>
                            Room Number {room_no}
                            {index === rooms.Single.length - 1 ? "" : " , "}
                          </span>
                        ))}
                      </div>
                    </div>
                    <hr className="mt-3" />
                  </>
                )}
              </div>
              <div className="col-md-12">
                {rooms.Twin.length > 0 && (
                  <>
                    <h3>Selected Twin Rooms</h3>
                    <div>
                      {rooms.Twin.map((room_no, index) => (
                        <span>
                          Room Number {room_no}
                          {index === rooms.Twin.length - 1 ? "" : " , "}
                        </span>
                      ))}
                    </div>
                    <hr className="mt-3" />
                  </>
                )}
              </div>
              <div className="col-md-12">
                {rooms.Family.length > 0 && (
                  <>
                    <h3>Selected Family Rooms</h3>
                    <div>
                      {rooms.Family.map((room_no, index) => (
                        <span>
                          Room Number {room_no}
                          {index === rooms.Family.length - 1 ? "" : " , "}
                        </span>
                      ))}
                    </div>
                    <hr className="mt-3" />
                  </>
                )}
              </div>
            </div>
            <div
              className="row my-1 rounded-3 py-2"
              style={{ backgroundColor: "#ebf3ff" }}
            >
              <h1 className="mb-3 text-dark">Payment Information :</h1>

              <div className="">
                <span>Price for {nights} nights</span>
                <h1>
                  Total Price :<span>{total_price}/-</span>
                </h1>
              </div>
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
          </form>
        </div>
      </div>
    </>
  );
};

export default HotelBooking;
