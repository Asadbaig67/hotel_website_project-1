import React, { useState, useEffect } from "react";
import FormData from "form-data";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import style from "../Hotel_Forms/addhotel.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation, useNavigate } from "react-router-dom";
import { set } from "date-fns";
import Sidebar from "../../Sidebar/SideBar";
import AdminNav from "../../AdminNavbar/AdminNav";

const UpdateHotelAndParking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  //Confirm Modal Code
  const [open, setOpen] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Imgerror, setImgError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteImage, setDeleteImage] = useState({});
  const [delImgSuccess, setDelImgSuccess] = useState(false);
  const [imgMessage, setImgMessage] = useState("");
  const [delfail, setDelFail] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (
      formValues.hotel_name === "" ||
      formValues.hotel_title === "" ||
      formValues.parking_name === "" ||
      formValues.hotel_rating === "" ||
      formValues.parking_title === "" ||
      formValues.parking_total_slots === "" ||
      formValues.parking_booked_slots === "" ||
      formValues.hotel_description === "" ||
      formValues.parking_description === "" ||
      formValues.parking_price === "" ||
      value === null ||
      formValues.hotel_country === "" ||
      formValues.hotel_address === ""
    ) {
      console.log("Empty Input", formValues);
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
    setImgError(false);
    for (let index = 0; index < hotelimages.length; index++) {
      const image = hotelimages[index];
      if (image.error === true) {
        setImgError(true);
        return;
      }
    }
    for (let index = 0; index < parkingimages.length; index++) {
      const image = parkingimages[index];
      if (image.error === true) {
        setImgError(true);
        return;
      }
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
      hotel_name: "",
      hotel_title: "",
      parking_name: "",
      hotel_rating: 0,
      parking_title: "",
      parking_total_slots: 0,
      parking_booked_slots: 0,
      hotel_description: "",
      parking_description: "",
      parking_price: 0,
      hotel_city: "",
      hotel_country: "",
      hotel_address: "",
    }));
    setHotelimages([]);
    setParkingimages([]);
    if (user.account_type === "admin") {
      navigate("/Dashboard");
    } else if (user.account_type === "partner") {
      navigate("/Property");
    }
  };

  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

  const location = useLocation();
  const { id } = location.state;
  const defaultFormValues = id;

  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const DeleteHotelImages = async () => {
    setLoading(true);
    setImgMessage("");

    let url = `${api}/hotelandparking/deletehotelimage/${defaultFormValues._id}`;
    const data = { link: deleteImage.image }; // Request body data as an object
    const options = {
      method: "DELETE", // Replace with the desired HTTP method (e.g., POST, PUT, DELETE)
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    };

    const response = await fetch(url, options);
    if (response.status === 200) {
      setLoading(false);
      setDelImgSuccess(true);
      setImgMessage(
        "Image Deleted Successfully!! You have to login again to see the changes"
      );
    } else {
      setLoading(false);
      setDelFail(true);
      setImgMessage("Something Went Wrong!!");
    }
    const Responsedata = await response.json();
    console.log(Responsedata);
  };

  const DeleteParkingImages = async () => {
    setLoading(true);
    setImgMessage("");

    let url = `${api}/hotelandparking/deleteparkingimage/${defaultFormValues._id}`;
    const data = { link: deleteImage.image }; // Request body data as an object
    const options = {
      method: "DELETE", // Replace with the desired HTTP method (e.g., POST, PUT, DELETE)
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    };

    const response = await fetch(url, options);
    if (response.status === 200) {
      setLoading(false);
      setDelImgSuccess(true);
      setImgMessage(
        "Image Deleted Successfully!! You have to login again to see the changes"
      );
    } else {
      setLoading(false);
      setDelFail(true);
      setImgMessage("Something Went Wrong!!");
    }
    const Responsedata = await response.json();
    console.log(Responsedata);
  };

  const { mode } = useSelector((state) => state.mode);

  console.log(formValues);

  const [hotelimages, setHotelimages] = useState([]); // To Store Hotel Images Files
  const [parkingimages, setParkingimages] = useState([]); // To Store parking Images Files

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

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const [features, setFeatures] = useState([...formValues.Facilities]);
  const [newFeature, setNewFeature] = useState("");

  const handleAddFeature = (event) => {
    event.preventDefault();
    if (newFeature && !features.includes(newFeature)) {
      setFeatures([...features, newFeature]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFeatures(features.filter((feature) => feature !== featureToRemove));
  };
  // Add Features Code

  const handleSubmit = async (event) => {
    setLoading(true);
    setMessage("");
    event.preventDefault();
    const formData = new FormData();
    // formData.append("ownerId", loggedinUser.user._id);
    formData.append("hotel_name", formValues.hotel_name);
    formData.append("hotel_title", formValues.hotel_title);
    formData.append("parking_name", formValues.parking_name);
    formData.append("hotel_rating", formValues.hotel_rating);
    formData.append("parking_title", formValues.parking_title);
    formData.append("total_slots", formValues.parking_total_slots);
    formData.append("booked_slots", formValues.parking_booked_slots);
    formData.append("parking_description", formValues.parking_description);
    formData.append("hotel_description", formValues.hotel_description);
    formData.append("price", formValues.parking_price);
    formData.append("city", value);
    formData.append("country", formValues.hotel_country);
    formData.append("address", formValues.hotel_address);
    for (let i = 0; i < features.length; i++) {
      formData.append("facilities", features[i]);
    }

    // Append each photo in the photos array to the FormData object
    for (let i = 0; i < hotelimages.length; i++) {
      formData.append("hotelPhotos", hotelimages[i].file);
    }
    for (let i = 0; i < parkingimages.length; i++) {
      formData.append("parkingPhotos", parkingimages[i].file);
    }
    const url = `${api}/hotelandparking/updatehotelandparkingdata/${formValues._id}`;

    const options = {
      method: "PATCH",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        setMessage("Hotel And Parking Updated Successfully!!");
        setLoading(false);
        setSuccess(true);
      } else if (response.status === 422) {
        setMessage("Internal Server Error!!");
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
    } catch (error) {
      console.error(error);
    }
  };

  const { hotelAndParkingOperatingCity } = useSelector(
    (state) => state.hotelAndParkingOperatingCities
  );

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
        id="staticBackdrop1"
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
                Confirm Delete Image
              </h1>
            </div>
            <div class="modal-body">
              <span className="d-block">
                {imgMessage === ""
                  ? "Are you sure you want to delete this photo?"
                  : imgMessage}
              </span>
            </div>
            <div class="modal-footer">
              {!delImgSuccess && (
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setDeleteImage("");
                    setDelFail(false);
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}
              {!loading && !delImgSuccess && !delfail && (
                <Button
                  variant="contained"
                  onClick={() => {
                    if (deleteImage.origin === "hotel") {
                      DeleteHotelImages();
                    } else {
                      DeleteParkingImages();
                    }
                  }}
                >
                  Confirm Delete
                </Button>
              )}
              {loading ? (
                <>
                  <CircularProgress />
                </>
              ) : (
                ""
              )}
              {delImgSuccess && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    data-bs-dismiss="modal"
                    onClick={() => window.location.reload()}
                  >
                    Finish
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
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
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Confirm Update Hotel And Parking
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
              {emptyInput ? (
                <span className="text-danger d-block">
                  Please fill all the fields!!
                </span>
              ) : (
                ""
              )}
              {!emptyInput && !Imgerror && (
                <>
                  <span className="d-block">
                    {message === ""
                      ? "Are you sure you want to update this hotel?"
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
                  disabled={emptyInput || Imgerror}
                  onClick={handleSubmit}
                >
                  Confirm Update
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
        <div style={{ width: "100vw", marginTop: "70px" }}>
          <div className={`container-fluid w-100 `}>
            <h1 className="text-center fw-bold">Update Hotel And Parking</h1>
            <form className="needs-validation mx-4">
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
                    placeholder="Parking Name"
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
                    name="parking_total_slots"
                    id="validationCustom01"
                    value={formValues.parking_total_slots}
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
                    name="parking_booked_slots"
                    value={formValues.parking_booked_slots}
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
                    Hotel Rating
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
                    value={formValues.hotel_address}
                    name="hotel_address"
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
                    placeholder="parking_price"
                    value={formValues.parking_price}
                    name="parking_price"
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
                    value={formValues.hotel_country}
                    name="hotel_country"
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
                  Available Hotel Images
                </label>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {formValues.hotel_photos &&
                      formValues.hotel_photos.map((image, index) => {
                        return (
                          <div
                            key={image}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={style.preview_image}
                              src={image}
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
                                type="button"
                                // class="btn btn-primary btn-lg profile-button mb-4"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop1"
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => {
                                    setDeleteImage({ image, origin: "hotel" });
                                    setOpen(true);
                                  }}
                                  // onClick={() => DeleteHotelImages(image)}
                                  fontSize="small"
                                />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
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
                  Available Parking Images
                </label>
                <small>Please select 3-7 images only </small>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {formValues.parking_photos &&
                      formValues.parking_photos.map((image, index) => {
                        return (
                          <div
                            key={image}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={style.preview_image}
                              src={image}
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
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop1"
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => {
                                    setDeleteImage({
                                      image,
                                      origin: "parking",
                                    });
                                    setOpen(true);
                                  }}
                                  fontSize="small"
                                />
                              </IconButton>
                            </div>
                          </div>
                        );
                      })}
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
                  Update Hotel And Parking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateHotelAndParking;
