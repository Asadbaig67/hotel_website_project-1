import React, { useState, useEffect } from "react";
import FormData from "form-data";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import style from "./addhotel.module.css";
// import AdminSidebar from "../../adminSidebar/AdminSidebar";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar/SideBar";

const UpdateHotel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  // Confirm Modal Code
  const [emptyInput, setEmptyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [Imgerror, setImgError] = useState(false);

  const handleClickOpen = () => {
    if (
      formValues.name === "" ||
      formValues.title === "" ||
      formValues.rating === "" ||
      formValues.description === "" ||
      formValues.city === "" ||
      formValues.country === "" ||
      formValues.address === ""
    ) {
      console.log("Empty Input", formValues);
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
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

  const handleConditions = () => {
    setError(false);
    setMessage("");
  };
  const handleSuccess = () => {
    setSuccess(false);
    setMessage("");
    setFormValues((prevValues) => ({
      ...prevValues,
      name: "",
      title: "",
      rating: "",
      description: "",
      city: "",
      country: "",
      address: "",
    }));
    setSelectedImages([]);
    if (user.account_type === "admin") {
      navigate("/Dashboard");
    } else if (user.account_type === "partner") {
      navigate("/Property");
    }
  };

  const IsMobile = useMediaQuery("(max-width:450px)");

  const { hotelOperatingCity } = useSelector(
    (state) => state.hotelOperatingCities
  );
  const location = useLocation();
  const id = location.state.id;

  const defaultFormValues = id;
  console.log(defaultFormValues);
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
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

  const DeleteImages = async (image) => {
    alert(
      `Are you Sure You Want to Delete This Image? It will be permanently deleted from the Server!`
    );

    let url = `http://localhost:5000/hotels/deletehotelImage/${defaultFormValues._id}`;
    const data = { link: image }; // Request body data as an object
    const options = {
      method: "DELETE", // Replace with the desired HTTP method (e.g., POST, PUT, DELETE)
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(data), // Convert the data object to a JSON string
    };

    const response = await fetch(url, options);
    const Responsedata = await response.json();
    console.log(Responsedata);
  };

  // Add Features Code
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

  const { mode } = useSelector((state) => state.mode);

  const handleSubmit = async (event) => {
    setMessage("");
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("title", formValues.title);
    formData.append("rating", formValues.rating);
    formData.append("description", formValues.description);
    formData.append("city", formValues.city);
    formData.append("country", formValues.country);
    formData.append("address", formValues.address);
    // formData.append("ownerId", loggedinUser.user._id);
    for (let i = 0; i < features.length; i++) {
      formData.append("facilities", features[i]);
    }

    // Append each photo in the photos array to the FormData object
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("photos", selectedImages[i].file);
    }
    const url = `http://localhost:5000/hotels/updatehoteldata/${formValues._id}`;

    const options = {
      method: "PATCH",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 201) {
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const GetHotelCities = async () => {
      const response = await axios.get(
        "http://localhost:5000/OperatingProperty/getHotelOperatingCity"
      );
      dispatch({ type: "SET_HOTEL_CITY", payload: response.data });
      // console.log(response.data);
    };
    GetHotelCities();
  }, []);

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
                Confirm Update Hotel
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
      <div className="d-flex" style={{ marginTop: "50px" }}>
        <Sidebar />
        <div className="mt-5" style={{ width: "100vw" }}>
          <div className={`container-fluid w-100 `}>
            <h1 className="text-center fw-bold">Add Hotel Form</h1>
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
                {/* <div
                  className={`container ${
                    selectedImages.length < 10 ? "d-none" : ""
                  } text-center my-3`}
                >
                  {formValues.photos.length > 0 &&
                    (formValues.photos.length > 10 ? (
                      <p className="text-danger">
                        You can't upload more than 10 images! <br />
                        <span>
                          please delete <b> {formValues.photos.length - 10} </b>{" "}
                          of them
                        </span>
                      </p>
                    ) : (
                      <div className="">
                        <button
                          className={`btn btn-primary btn-md`}
                          onClick={() => {
                            console.log(formValues.photos);
                          }}
                        >
                          UPLOAD {formValues.photos.length} IMAGE
                          {formValues.photos.length === 1 ? "" : "S"}
                        </button>
                      </div>
                    ))}
                </div> */}
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
                    value={formValues.description}
                    name="description"
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
                      console.log(formValues);
                    }}
                    clearOnEscape
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        city: newInputValue,
                      }));
                      console.log(formValues);
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
                  Availabe Images
                </label>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {formValues.photos &&
                      formValues.photos.map((image, index) => {
                        return (
                          <div
                            key={index}
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
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => DeleteImages(image)}
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
                  Upload Images
                </label>
                <small>You can select 3-7 images only </small>
                <div className="col-md-12 col-sm-4">
                  <div className={style.image_selector}>
                    {selectedImages &&
                      selectedImages.map((imageObj, index) => {
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
                {/* <button
                  className="btn btn-primary btn-lg profile-button mb-4"
                  type="submit"
                  // disabled={files.length < 3 || files.length > 7}
                  onClick={handleSubmit}
                >
                  Add Hotel
                </button> */}
                <button
                  type="button"
                  class="btn btn-primary btn-lg profile-button mb-4"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={handleClickOpen}
                >
                  Update Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateHotel;
