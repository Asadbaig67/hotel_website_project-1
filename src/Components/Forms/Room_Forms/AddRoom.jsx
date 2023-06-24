import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Sidebar from "../../Sidebar/SideBar";

const AddRoomForm = () => {
  const { hotel } = useSelector((state) => state.setAddedHotel);
  console.log("This is Hotel", hotel);

  //Alerts Code
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const IsMobile = useMediaQuery("(max-width:450px)");

  const [formValues, setFormValues] = useState({
    room_no: "",
    type: "",
    price: "",
    desc: "",
  });

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  // Upload Images Code And Preview Code
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const { mode } = useSelector((state) => state.mode);

  let roomsArray = formValues.room_no.split(",");
  roomsArray = roomsArray.map((room) => {
    let num = parseInt(room.trim());
    return isNaN(num) ? null : num;
  });
  roomsArray = roomsArray.filter((room) => {
    return room !== null;
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `${api}/room/addroom`;
    const urlHotelAndParking =
      `${api}/room/addhotelparkingroom`;

    const data = {
      hotelId: hotel._id,
      room_no: roomsArray,
      type: formValues.type,
      price: formValues.price,
      description: formValues.desc,
    };

    try {
      let response;
      if (hotel.name) response = await axios.post(url, data);
      else response = await axios.post(urlHotelAndParking, data);
      if (response.status === 201) {
        setAlertOn(true);
        setAlertType("warning");
        setAlertMessage("Room Already Exist!!");
        setTimeout(() => {
          setOpen(false);
        }, 10000);
      }
      if (response.data || response.status === 200) {
        setAlertOn(true);
        setAlertType("success");
        setAlertMessage("Room Added Successfully!!");
        setTimeout(() => {
          setOpen(false);
        }, 7000);
      } else {
        setAlertOn(true);
        setAlertType("error");
        setAlertMessage("Something went wrong");
        setTimeout(() => {
          setOpen(false);
        }, 7000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="d-flex" style={{ marginTop: "50px" }}>
        <Sidebar />
        <div className="mt-5" style={{ width: "100vw" }}>
          {alertOn && (
            <Collapse in={open}>
              <Stack sx={{ width: "100%" }} spacing={1}>
                <Alert
                  sx={{
                    borderRadius: "9999px", // make the alert appear as a pill shape
                    transition: "transform 0.3s ease-in-out", // add a transition effect
                    transform: open ? "scale(1)" : "scale(0.7)", // scale the alert based on the open state
                    mt: 2,
                    mb: 2,
                    ml: 2,
                    mr: 2,
                  }}
                  severity={alertType}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                      sx={{ mt: 1.5 }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  <AlertTitle>Add Room</AlertTitle>
                  <strong>{alertMessage}!</strong>
                </Alert>
              </Stack>
            </Collapse>
          )}
          <div className={`container-fluid w-100 `}>
            <h1 className="text-center fw-bold">Add Room Form</h1>
            <form className="needs-validation mx-4">
              <div className="row mt-2">
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Room Type
                  </label>
                  <select
                    className="form-select"
                    name="type"
                    id="validationCustom01"
                    value={formValues.type}
                    required
                    onChange={handleInputChange}
                  >
                    <option value="">Select room type</option>
                    <option value="Single">Single</option>
                    <option value="Twin">Twin</option>
                    <option value="Family">Family</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Room Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    name="price"
                    value={formValues.price}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Room Number{" "}
                  </label>
                  <small>
                    Please give comma seperated list Ex.(44,55,101,78)
                  </small>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Room No"
                    name="room_no"
                    value={formValues.room_no}
                    required
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-md-12 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                    value={formValues.desc}
                    name="desc"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary btn-lg profile-button mb-4"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Add Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoomForm;
