import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNav from "../../AdminNavbar/AdminNav";
import Sidebar from "../../Sidebar/SideBar";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

const AddRoomForm = () => {
  const Navigate = useNavigate();
  const { hotel } = useSelector((state) => state.setAddedHotel);

  // Confirm Modal Code
  const [emptyInput, setEmptyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

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

  // Modal Functions
  const handleClickOpen = () => {
    if (
      formValues.room_no === "" ||
      formValues.type === "" ||
      formValues.price === "" ||
      formValues.desc === ""
    ) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
  };

  const handleConditions = () => {
    setError(false);
    setMessage("");
  };
  const handleSuccess = () => {
    setSuccess(false);
    setMessage("");
    setFormValues((prevValues) => ({
      ...prevValues,
      room_no: "",
      type: "",
      price: "",
      desc: "",
    }));
    Navigate("/dashboard");
  };

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
    setLoading(true);
    setMessage("");
    event.preventDefault();
    const url = `${api}/room/addroom`;
    const urlHotelAndParking = `${api}/room/addhotelparkingroom`;

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
      if (response.status === 200) {
        setMessage("Rooms Added Successfully!!");
        setLoading(false);
        setSuccess(true);
      } else if (response.status === 422) {
        setMessage("Room Alreay Exists!!");
        setSuccess(false);
        setLoading(false);
        setError(true);
      } else {
        setMessage("Something Went Wrong!!");
        setSuccess(false);
        setLoading(false);
        setError(true);
      }
      console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
                Confirm Add Room to {hotel.name}
              </h1>
            </div>
            <div class="modal-body">
              {emptyInput ? (
                <span className="text-danger d-block">
                  Please fill all the fields!!
                </span>
              ) : (
                ""
              )}
              {!emptyInput && (
                <>
                  <span className="d-block">
                    {message === ""
                      ? "Are you sure you want to add Rooms"
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
                  disabled={emptyInput}
                  onClick={handleSubmit}
                >
                  Confirm Add
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
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <AdminNav />
      </div>
      <div className="d-flex">
        <Sidebar />
        <div className="" style={{ width: "100vw", marginTop: "70px" }}>
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
                {/* <button
                  className="btn btn-primary btn-lg profile-button mb-4"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Add Room
                </button> */}
                <button
                  type="button"
                  class="btn btn-primary btn-lg profile-button mb-4"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={handleClickOpen}
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
