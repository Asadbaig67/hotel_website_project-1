import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
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
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const IsMobile = useMediaQuery("(max-width:450px)");

  // Accordion Code
  const [expanded, setExpanded] = useState("panel0");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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

  const [rooms, setRooms] = useState({
    single: [],
    twin: [],
    double: [],
  });

  const [formValues, setFormValues] = useState({
    name: "",
    type: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  const hotel_id = "6496d36b14c3e46e40e510f6";

  const handleRoomsRequest = async (event) => {
    setOpenTab(false);
    event.preventDefault();

    const url = `${api}/hotels/gethotelrooms?checkIn=${valueIn}&checkOut=${valueOut}&id=${hotel_id}`;
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const { rooms } = await response.json();
      setRoomData(rooms);
      console.log(rooms);
      setOpenTab(true);
    } catch (error) {
      setOpenTab(false);
      console.log(error);
    }
  };

  console.log(rooms);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#fff" }}>
      <h1 className="text-center fw-bold fs-1 my-4">Hotel Booking Form</h1>
      <form className="needs-validation card p-3 shadow mx-4">
        <div className="row my-1">
          <h2 className="my-2">Check Room Availablility :</h2>
          <div className="col-md-4 col-sm-12">
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
          <div className="col-md-4 col-sm-12 ">
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
            >
              Check Availability
            </button>
          </div>
        </div>
        <div className="row my-1">
          {openTab && (
            <>
              <h2 className="my-2">Rooms Details :</h2>
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
                          Available {room.type} Rooms : {room.rooms_list.length}{" "}
                          | Each Room Price : {room.price}
                        </strong>
                        <Typography>
                          <div className="">
                            {room.rooms_list.map((roomNumber, roomIndex) => (
                              <FormControlLabel
                                required
                                key={roomIndex}
                                value={roomNumber}
                                onChange={(e) =>
                                  setRooms((prevValues) => ({
                                    ...prevValues,
                                    [room.type]: [
                                      ...prevValues[room.type],
                                      e.target.value,
                                    ],
                                  }))
                                }
                                control={<Checkbox />}
                                label={`Room ${roomNumber}`}
                              />
                            ))}
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
          <div className="col-md-4">
            <TextField
              id="outlined-basic"
              label="Name"
              type="text"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="col-md-4">
            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="col-md-4">
            <TextField
              id="outlined-basic"
              label="Phone Number"
              type="number"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div className="row my-1">
          <h2 className="mb-3">Persons Information :</h2>
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Adults"
              type="number"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="col-md-6">
            <TextField
              id="outlined-basic"
              label="Childrens"
              type="number"
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <div className="row my-1">
          <h2 className="mb-3">Selected Rooms Information :</h2>
        </div>
        <div className="row my-1">
          <h2 className="mb-3">Payment Information :</h2>

          <div className="bg-secondary">
            <span>Price for {nights} nights</span>
            <h1>
              Total Price :<span>100000/-</span>
            </h1>
          </div>
        </div>
        <div className="mt-5 text-center">
          <button
            className="btn btn-primary btn-md profile-button mb-4"
            type="submit"
          >
            Book Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelBooking;
