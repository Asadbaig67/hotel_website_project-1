import React, { useState } from "react";
import FormData from "form-data";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import style from "./addhotel.module.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Sidebar from "../../Sidebar/SideBar";
import AdminNav from "../../AdminNavbar/AdminNav";

const AddHotelForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  //Alerts Code
  const [open, setOpen] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [Imgerror, setImgError] = useState(false);
  const [message, setMessage] = useState("");
  const [Owner, setOwner] = useState([]);
  const [FinalOwner, setFinalOwner] = useState({});

  const IsMobile = useMediaQuery("(max-width:450px)");
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);

  const { hotelOperatingCity } = useSelector(
    (state) => state.hotelOperatingCities
  );

  const handleClickOpen = () => {
    setOpen(true);
    if (
      formValues.name === "" ||
      formValues.title === "" ||
      formValues.rating === "" ||
      formValues.desc === "" ||
      formValues.city === "" ||
      formValues.country === "" ||
      formValues.address === ""
    ) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }

    setImgError(false);
    for (let index = 0; index < selectedImages.length; index++) {
      const image = selectedImages[index];
      if (image.error === true) {
        setImgError(true);
        return;
      }
    }
  };

  const handleConditions = () => {
    setOpen(false);
    setError(false);
    setMessage("");
  };

  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    rating: "",
    desc: "",
    photos: [],
    city: "",
    country: "",
    address: "",
  });

  const handleSuccess = () => {
    setOpen(false);
    setSuccess(false);
    setMessage("");
    setFormValues((prevValues) => ({
      ...prevValues,
      name: "",
      title: "",
      rating: "",
      desc: "",
      city: "",
      country: "",
      address: "",
    }));
    setSelectedImages([]);
    navigate("/dashboard");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [selectedImages, setSelectedImages] = useState([]);
  const [largerImage, setLargerImage] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    let selectedFilesArray = Array.from(selectedFiles);

    let imagesArrayObj = selectedFilesArray.map((file) => {
      if (file.size <= 1024 * 1024) {
        return { file: file, blobURL: URL.createObjectURL(file) };
      } else {
        return { file: file, blobURL: URL.createObjectURL(file), error: true };
      }
    });
    let dummyArray = [...selectedImages];
    imagesArrayObj.forEach((newImage) => {
      dummyArray.push(newImage);
    });
    setSelectedImages(dummyArray);
  };
  function deleteHandler(imageObj) {
    setSelectedImages((prevImages) => {
      return prevImages.filter((image) => image !== imageObj);
    });
  }

  const handleOwner = (selectedOwner) => {
    setFinalOwner(selectedOwner);
  };

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
    "Airport Shuttle",
    "Car Rental Service",
    "Complimentary Breakfast",
    "On-site Convenience Store",
    "Currency Exchange",
    "Elevator",
    "Gift Shop",
    "In-room Safe",
    "Luggage Storage",
    "Meeting Rooms",
    "Newspaper Delivery",
    "Pet-Friendly Rooms",
    "Restaurant and Bar",
    "Room Service",
    "Safe Deposit Boxes",
    "Swimming Pool",
    "Tour Desk",
    "Wedding Services",
  ];

  // Add Features Code
  const [features, setFeatures] = useState([...defaultFeatures]);
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

  const { mode } = useSelector((state) => state.mode);

  const handleSubmit = async (event) => {
    setMessage("");
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("title", formValues.title);
    formData.append("rating", formValues.rating);
    formData.append("description", formValues.desc);
    formData.append("city", formValues.city);
    formData.append("country", formValues.country);
    formData.append("address", formValues.address);
    formData.append(
      "ownerId",
      loggedinUser.user.account_type === "admin"
        ? FinalOwner.id
        : loggedinUser.user._id
    );
    for (let i = 0; i < features.length; i++) {
      formData.append("facilities", features[i]);
    }

    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("photos", selectedImages[i].file);
    }
    const url = `${api}/hotels/addhotel`;

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
          owner.data.user.partner_type === "Hotel")
      ) {
        const response = await fetch(url, options);
        if (response.status === 200) {
          setMessage("Hotel Added Successfully!!");
          setLoading(false);
          setSuccess(true);
        } else if (response.status === 422) {
          setMessage("Hotel Alreay Exists!!");
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
      form_type: "hotel",
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
    const GetHotelCities = async () => {
      const response = await axios.get(
        `${api}/OperatingProperty/getHotelOperatingCity`
      );
      dispatch({ type: "SET_HOTEL_CITY", payload: response.data });
    };

    GetHotelCities();
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
                Confirm Add Hotel
              </h1>
            </div>
            <div class="modal-body">
              <div className="row ">
                {Imgerror && (
                  <span className="text-danger d-block">
                    Following images size is greater than 1MB.
                  </span>
                )}
                {selectedImages &&
                  selectedImages
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
                            {/* <IconButton
                              aria-label="delete"
                              size="small"
                              className={style.delete_button}
                            >
                              <DeleteIcon
                                className="text-light me-1"
                                fontSize="small"
                                onClick={() => deleteHandler(imageObj)}
                              />
                            </IconButton> */}
                          </div>
                        </div>
                      </div>
                    ))}
              </div>

              {selectedImages.length < 3 || selectedImages.length > 7 ? (
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
              {!(selectedImages.length < 3 || selectedImages.length > 7) &&
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
                    selectedImages.length < 3 ||
                    selectedImages.length > 7 ||
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
        <div  style={{ width: "100vw", marginTop: "70px" }}>
          <div className={`container-fluid w-100 `}>
            <h1 className="text-center fw-bold">Add Hotel Form</h1>
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
                      // disabled
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
                    placeholder="Name"
                    name="name"
                    id="validationCustom01"
                    value={formValues.name}
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
                    placeholder="title"
                    name="title"
                    value={formValues.title}
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
                    Hotel Rating
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="rating"
                    name="rating"
                    value={formValues.rating}
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
                    placeholder="description"
                    value={formValues.desc}
                    name="desc"
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
                    options={hotelOperatingCity}
                    renderInput={(params) => (
                      <TextField {...params} label="Controllable" />
                    )}
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
                  Upload Images
                </label>
                <small>Please select 3-7 images only </small>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {selectedImages &&
                      selectedImages.map((imageObj, index) => {
                        return (
                          <div
                            key={imageObj.blobURL}
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
                                  fontSize="small"
                                  onClick={() => deleteHandler(imageObj)}
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
              {/* Add Features Section */}
              <div className="mt-3">
                <div className="form-group">
                  <label htmlFor="feature">Hotel Feature</label>
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
                  Add Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHotelForm;
