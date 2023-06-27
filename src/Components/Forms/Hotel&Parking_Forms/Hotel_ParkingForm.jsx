import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect } from "react";
import style from "../Hotel_Forms/addhotel.module.css";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Sidebar from "../../Sidebar/SideBar";
import AdminNav from "../../AdminNavbar/AdminNav";

const AddHotelParkingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  //Confirm Modal Code
  const [open, setOpen] = React.useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Imgerror, setImgError] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { hotelAndParkingOperatingCity } = useSelector(
    (state) => state.hotelAndParkingOperatingCities
  );

  const handleClickOpen = () => {
    setOpen(true);
    if (
      formValues.hotel_name === "" ||
      formValues.hotel_title === "" ||
      formValues.parking_name === "" ||
      formValues.hotel_rating === "" ||
      formValues.parking_title === "" ||
      formValues.total_slots === "" ||
      formValues.booked_slots === "" ||
      formValues.hotel_description === "" ||
      formValues.parking_description === "" ||
      formValues.price === "" ||
      formValues.city === "" ||
      formValues.country === "" ||
      formValues.address === ""
    ) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
    hotelimages.forEach((imageObj) => {
      if (imageObj.error === true) {
        setImgError(true);
        return;
      }
      setImgError(false);
    });
    parkingimages.forEach((imageObj) => {
      if (imageObj.error === true) {
        setImgError(true);
        return;
      }
      setImgError(false);
    });
  };

  const handleConditions = () => {
    setOpen(false);
    setError(false);
    setMessage("");
  };
  const handleSuccess = () => {
    setOpen(false);
    setSuccess(false);
    setMessage("");
    setFormValues((prevValues) => ({
      ...prevValues,
      hotel_name: "",
      hotel_title: "",
      parking_name: "",
      hotel_rating: 0,
      parking_title: "",
      total_slots: 0,
      booked_slots: 0,
      hotel_description: "",
      parking_description: "",
      price: 0,
      city: "",
      country: "",
      address: "",
    }));
    setHotelimages([]);
    setParkingimages([]);
    navigate("/dashboard");
  };

  const [Owner, setOwner] = useState([]);
  const [FinalOwner, setFinalOwner] = useState({});

  const IsMobile = useMediaQuery("(max-width:450px)");

  const [formValues, setFormValues] = useState({
    hotel_name: "",
    hotel_title: "",
    parking_name: "",
    hotel_rating: 0,
    parking_title: "",
    total_slots: 0,
    hotel_photos: [],
    booked_slots: 0,
    hotel_description: "",
    parking_description: "",
    parking_photos: [],
    price: 0,
    city: "",
    country: "",
    address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleOwner = (selectedOwner) => {
    setFinalOwner(selectedOwner);
  };

  const [hotelimages, setHotelimages] = useState([]);
  const [parkingimages, setParkingimages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    let ArrayObj = selectedFilesArray.map((file) => {
      if (file.size <= 1024 * 1024) {
        return { file: file, blobURL: URL.createObjectURL(file) };
      } else {
        return { file: file, blobURL: URL.createObjectURL(file), error: true };
      }
    });
    let dummyArray = [...hotelimages];
    ArrayObj.forEach((newImageObj) => {
      dummyArray.push(newImageObj);
    });
    setHotelimages(dummyArray);
  };
  const onParkingSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    let ArrayObj = selectedFilesArray.map((file) => {
      if (file.size <= 1024 * 1024) {
        return { file: file, blobURL: URL.createObjectURL(file) };
      } else {
        return { file: file, blobURL: URL.createObjectURL(file), error: true };
      }
    });
    let dummyArray = [...parkingimages];
    ArrayObj.forEach((newImagrObj) => {
      dummyArray.push(newImagrObj);
    });
    setParkingimages(dummyArray);
  };

  function deleteHandler(imageObj) {
    setHotelimages((prevImages) => {
      return prevImages.filter((image) => image !== imageObj);
    });
  }
  function deleteParkingHandler(imageObj) {
    setParkingimages((prevImages) => {
      return prevImages.filter((image) => image !== imageObj);
    });
  }

  // Add Features Code
  const defaultFeatures = [
    "Luxurious Rooms and Suites",
    "Multiple Restaurants and Cafes",
    "24-hour Room Service",
    "Fitness Center",
    "Spa and Wellness Center",
    "Outdoor Swimming Pool",
    "Business Center",
    "Conference and Event Spaces",
    "Concierge Services",
    "Valet Parking",
    "Self-Parking",
    "Laundry and Dry Cleaning Services",
    "Complimentary Wi-Fi",
    "24-hour Front Desk and Security",
  ];
  const [features, setFeatures] = useState([...defaultFeatures]);
  const [newFeature, setNewFeature] = useState("");

  const handleAddFeature = (event) => {
    event.preventDefault();
    if (newFeature && !features.includes(newFeature)) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const handleRemoveFeature = (featureToRemove) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove));
  };
  // Add Features Code

  const { mode } = useSelector((state) => state.mode);
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);

  const handleSubmit = async (event) => {
    setMessage("");
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "ownerId",
      loggedinUser.user.account_type === "admin"
        ? FinalOwner.id
        : loggedinUser.user._id
    );
    formData.append("hotel_name", formValues.hotel_name);
    formData.append("hotel_title", formValues.hotel_title);
    formData.append("parking_name", formValues.parking_name);
    formData.append("hotel_rating", formValues.hotel_rating);
    formData.append("parking_title", formValues.parking_title);
    formData.append("total_slots", formValues.total_slots);
    formData.append("booked_slots", formValues.booked_slots);
    formData.append("parking_description", formValues.parking_description);
    formData.append("hotel_description", formValues.hotel_description);
    formData.append("price", formValues.price);
    formData.append("city", formValues.city);
    formData.append("country", formValues.country);
    formData.append("address", formValues.address);
    for (let i = 0; i < features.length; i++) {
      formData.append("facilities", features[i]);
    }

    // Append each photo in the photos array to the FormData object
    for (let i = 0; i < hotelimages.length; i++) {
      formData.append("hotel_photos", hotelimages[i].file);
    }
    for (let i = 0; i < parkingimages.length; i++) {
      formData.append("parking_photos", parkingimages[i].file);
    }
    const url = `${api}/hotelandparking/addhotelandparking`;

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const owner = await axios.get(
        `${api}/user/getuserbyid/${
          loggedinUser.user.account_type === "admin"
            ? FinalOwner.id
            : loggedinUser.user._id
        }`
      );
      if (
        owner.data.user.account_type === "user" ||
        (owner.data.user.account_type === "partner" &&
          owner.data.user.partner_type === "HotelAndParking")
      ) {
        const response = await fetch(url, options);
        if (response.status === 200) {
          setMessage("Hotel And Parking Added Successfully!!");
          setLoading(false);
          setSuccess(true);
        } else if (response.status === 422) {
          setMessage("Hotel And Parking Alreay Exists!!");
          setSuccess(false);
          setLoading(false);
          setError(true);
        } else {
          setMessage("Something Went Wrong!!");
          setSuccess(false);
          setLoading(false);
          setError(true);
        }
        const data = await response.json();
        const hotel = data.hotel;
        dispatch({
          type: "SET_HOTEL",
          payload: hotel,
        });
      } else {
        setMessage("Invalid Owner!!");
        setSuccess(false);
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const GetOwners = async () => {
    const url = `${api}/user/getuseridandname`;
    const params = {
      form_type: "hotelandparking",
    };

    try {
      const response = await axios.get(url, { params });
      let data = response.data;
      setOwner(Object.values(data).flat());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedinUser.user.account_type === "admin") {
      GetOwners();
    }
  }, []);

  useEffect(() => {
    const GetHotelAndParkingCities = async () => {
      const response = await axios.get(
        `${api}/OperatingProperty/getHotelAndParkingOperatingCity`
      );
      dispatch({ type: "SET_HOTEL_AND_PARKING_CITY", payload: response.data });
    };
    GetHotelAndParkingCities();
  }, []);

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
                Confirm Add Hotel And Parking
              </h1>
            </div>
            <div class="modal-body">
              <div className="row ">
                {Imgerror && (
                  <span className="text-danger d-block">
                    Following images size is greater than 1MB.
                  </span>
                )}
                {hotelimages &&
                  hotelimages
                    .filter((img) => img.error === true)
                    .map((imageObj, index) => (
                      <div key={imageObj.blobURL} className="col-md-4 col-sm-4">
                        <div className={`${style.image_preview} mx-1 my-1`}>
                          <img
                            className={style.preview_image}
                            src={imageObj.blobURL}
                            alt="upload"
                          />
                          <div
                            className={`${style.image_overlay} d-flex flex-row justify-content-between`}
                          >
                            <p
                              className={`${style.image_number} text-light ms-1`}
                            >
                              {index + 1}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                {parkingimages &&
                  parkingimages
                    .filter((img) => img.error === true)
                    .map((imageObj, index) => (
                      <div key={imageObj.blobURL} className="col-md-4 col-sm-4">
                        <div className={`${style.image_preview} mx-1 my-1`}>
                          <img
                            className={style.preview_image}
                            src={imageObj.blobURL}
                            alt="upload"
                          />
                          <div
                            className={`${style.image_overlay} d-flex flex-row justify-content-between`}
                          >
                            <p
                              className={`${style.image_number} text-light ms-1`}
                            >
                              {index + 1}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
              {hotelimages.length < 3 ||
              hotelimages.length > 7 ||
              parkingimages.length < 3 ||
              parkingimages.length > 7 ? (
                <span className="text-danger d-block">
                  Please select 3-7 images only!!
                </span>
              ) : (
                ""
              )}
              {emptyInput ? (
                <span className="text-danger d-block">
                  Please fill all the fields!!
                </span>
              ) : (
                ""
              )}
              {!(
                hotelimages.length < 3 ||
                hotelimages.length > 7 ||
                parkingimages.length < 3 ||
                parkingimages.length > 7
              ) &&
                !emptyInput &&
                !Imgerror && (
                  <>
                    <span className="d-block">
                      {message === ""
                        ? "Are you sure you want to add this hotel?"
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
                  disabled={
                    hotelimages.length < 3 ||
                    hotelimages.length > 7 ||
                    parkingimages.length < 3 ||
                    parkingimages.length > 7 ||
                    emptyInput ||
                    Imgerror
                  }
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
                <>
                  <Link to="/roomform">
                    <Button
                      variant="contained"
                      color="secondary"
                      data-bs-dismiss="modal"
                      onClick={handleSuccess}
                    >
                      Add Rooms
                    </Button>
                  </Link>
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
        {!open && <Sidebar />}
        <div style={{ width: "100vw", marginTop: "70px" }}>
          <div className={`container-fluid w-100 `}>
            <h1 className="text-center fw-bold">Add Hotel And Parking Form</h1>
            <form className="needs-validation mx-4">
              {loggedinUser.user.account_type === "admin" ? (
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01">OwnerID</label>
                    <select
                      className="form-select"
                      name="type"
                      id="validationCustom012"
                      value={FinalOwner.id}
                      required
                    >
                      <option value="1">Owner Id</option>
                      <option value={FinalOwner.id}>{FinalOwner.id}</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01">Owner Name</label>
                    <select
                      className="form-select"
                      name="type"
                      id="validationCustom01"
                      required
                      onChange={(event) =>
                        handleOwner({
                          id: event.target.value,
                          name: event.target.options[event.target.selectedIndex]
                            .text,
                        })
                      }
                    >
                      <option key="1" value="1">
                        Select The Owner
                      </option>
                      {Owner.map((owner) => {
                        return (
                          <>
                            <option key={owner._id} value={owner._id}>
                              {owner.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="row mt-2">
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Hotel Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Hotel Name"
                    name="hotel_name"
                    id="validationCustom01"
                    value={formValues.hotel_name}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Hotel Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Hotel Title"
                    name="hotel_title"
                    value={formValues.hotel_title}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Parking Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Parking Name"
                    name="parking_name"
                    id="validationCustom01"
                    value={formValues.parking_name}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Parking Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Parking Title"
                    name="parking_title"
                    value={formValues.parking_title}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-4">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Total Slots
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Total Slots"
                    name="total_slots"
                    id="validationCustom01"
                    value={formValues.total_slots}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Booked Slots
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Booked Slots"
                    name="booked_slots"
                    value={formValues.booked_slots}
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <label
                    htmlFor="validationCustom01"
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Hotel Rating (out of 5)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Rating"
                    name="hotel_rating"
                    id="validationCustom01"
                    value={formValues.hotel_rating}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Area"
                    value={formValues.address}
                    name="address"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Parking Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={formValues.price}
                    name="price"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value={formValues.country}
                    name="country"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-md-6">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    City
                  </label>
                  <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        city: newValue,
                      }));
                    }}
                    clearOnEscape
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        city: newInputValue,
                      }));
                    }}
                    id="controllable-states-demo"
                    options={hotelAndParkingOperatingCity}
                    renderInput={(params) => (
                      <TextField {...params} label="Controllable" />
                    )}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Hotel Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="description"
                    value={formValues.hotel_description}
                    name="hotel_description"
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
                    Parking Description
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="description"
                    value={formValues.parking_description}
                    name="parking_description"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor=""
                  className={`labels mt-2 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                >
                  Upload Hotel Images
                </label>
                <small>Please select 3-7 images only </small>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {hotelimages &&
                      hotelimages.map((imageObj, index) => {
                        return (
                          <div
                            key={index}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={style.preview_image}
                              src={imageObj.blobURL}
                              alt="upload"
                            />
                            <div
                              className={`${style.image_overlay} d-flex flex-row justify-content-between`}
                            >
                              <p
                                className={`${style.image_number} text-light ms-1`}
                              >
                                {index + 1}
                              </p>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                className={style.delete_button}
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => deleteHandler(imageObj)}
                                  fontSize="small"
                                />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                    <IconButton
                      color="secondary"
                      aria-label="upload picture"
                      component="label"
                      className={style.add_button}
                    >
                      <input
                        hidden
                        onChange={onSelectFile}
                        accept="image/png , image/jpeg"
                        type="file"
                        multiple
                      />
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor=""
                  className={`labels mt-2 text-${
                    mode === "light" ? "dark" : "light"
                  }`}
                >
                  Upload Parking Images
                </label>
                <small>Please select 3-7 images only </small>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {parkingimages &&
                      parkingimages.map((imageObj, index) => {
                        return (
                          <div
                            key={index}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={style.preview_image}
                              src={imageObj.blobURL}
                              alt="upload"
                            />
                            <div
                              className={`${style.image_overlay} d-flex flex-row justify-content-between`}
                            >
                              <p
                                className={`${style.image_number} text-light ms-1`}
                              >
                                {index + 1}
                              </p>
                              <IconButton
                                aria-label="delete"
                                size="small"
                                className={style.delete_button}
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => deleteParkingHandler(imageObj)}
                                  fontSize="small"
                                />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
                    <IconButton
                      color="secondary"
                      aria-label="upload picture"
                      component="label"
                      className={style.add_button}
                    >
                      <input
                        hidden
                        onChange={onParkingSelectFile}
                        accept="image/png , image/jpeg"
                        type="file"
                        multiple
                      />
                      <AddPhotoAlternateIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="form-group">
                  <label htmlFor="feature">Hotel And Parking Feature</label>
                  <input
                    type="text"
                    className="form-control"
                    id="feature"
                    name="feature"
                    placeholder="Enter a feature"
                    value={newFeature}
                    onChange={(event) => setNewFeature(event.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-sm my-2 btn-primary"
                  onClick={handleAddFeature}
                >
                  Add Feature
                </button>
                <div className="mt-2">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      style={{ fontSize: "14px" }}
                      className="badge badge-pill rounded-pill badge-info p-2 mx-1 mr-1 mb-1"
                    >
                      {feature}{" "}
                      <ClearIcon
                        fontSize="small"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveFeature(feature)}
                      />
                    </span>
                  ))}
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
                  Add Hotel And Parking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHotelParkingForm;
