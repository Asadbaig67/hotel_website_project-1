import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "../Hotel_Forms/addhotel.module.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Sidebar/SideBar";
import AdminNav from "../../AdminNavbar/AdminNav";

const UpdateParking = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  // confirm modal code
  const [Imgerror, setImgError] = useState(false);

  // Confirm Modal
  const [emptyInput, setEmptyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  // Confirm Modal Delete Images
  const [open, setOpen] = useState(false);
  const [deleteImage, setDeleteImage] = useState("");
  const [delImgSuccess, setDelImgSuccess] = useState(false);
  const [imgMessage, setImgMessage] = useState("");
  const [delfail, setDelFail] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (
      formValues.name === "" ||
      formValues.title === "" ||
      formValues.total_slots === "" ||
      formValues.booked_slots === "" ||
      formValues.description === "" ||
      formValues.price === "" ||
      formValues.city === "" ||
      formValues.rating === "" ||
      formValues.country === "" ||
      formValues.address === ""
    ) {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
    setImgError(false);
    for (let i = 0; i < parkingImages.length; i++) {
      if (parkingImages[i].error === true) {
        setImgError(true);
        return;
      }
    }
  };

  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const { user } = loggedinUser;

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
      name: "",
      title: "",
      total_slots: 0,
      booked_slots: 0,
      description: "",
      photos: [],
      rating: 0,
      city: "",
      price: 0,
      country: "",
      address: "",
    }));
    setParkingImages([]);
    if (user.account_type === "admin") {
      navigate("/Dashboard");
    } else if (user.account_type === "partner") {
      navigate("/Property");
    }
  };
  const location = useLocation();
  const id = location.state.id;

  const defaultFormValues = id;
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const [formValues, setFormValues] = useState(defaultFormValues);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFormValues({
      ...formValues,
      [event.target.name]: value,
    });
  };

  // const [files, setFiles] = useState([]);
  const [parkingImages, setParkingImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);
    let blobImagesArray = selectedFilesArray.map((file) => {
      if (file.size <= 1024 * 1024) {
        return { file: file, blobURL: URL.createObjectURL(file) };
      } else {
        return { file: file, blobURL: URL.createObjectURL(file), error: true };
      }
    });
    const dummyImages = [...parkingImages];
    for (let i = 0; i < blobImagesArray.length; i++) {
      dummyImages.push(blobImagesArray[i]);
    }
    setParkingImages(dummyImages);
  };

  // Delete Available Images from backend
  const DeleteImages = async () => {
    setLoading(true);
    setImgMessage("");

    let url = `${api}/parking/deleteparkingimage/${defaultFormValues._id}`;
    const data = { link: deleteImage }; // Request body data as an object
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
  };

  // Function to remove an image from the array of images
  function deleteHandler(image) {
    setParkingImages((prevImages) =>
      prevImages.filter((Imageblob) => Imageblob !== image)
    );

    URL.revokeObjectURL(image);
  }

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
    formData.append("total_slots", formValues.total_slots);
    formData.append("booked_slots", formValues.booked_slots);
    formData.append("description", formValues.description);
    formData.append("price", formValues.price);
    formData.append("city", formValues.city);
    formData.append("rating", formValues.rating);
    formData.append("country", formValues.country);
    formData.append("address", formValues.address);
    for (let i = 0; i < features.length; i++) {
      formData.append("facilities", features[i]);
    }

    // Append each photo in the photos array to the FormData object
    for (let i = 0; i < parkingImages.length; i++) {
      formData.append("photos", parkingImages[i].file);
    }
    const url = `${api}/parking/updateparkingdata/${formValues._id}`;

    const options = {
      method: "PATCH",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        setMessage("Parking Updated Successfully!!");
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

  const { parkingOperatingCity } = useSelector(
    (state) => state.parkingOperatingCities
  );

  useEffect(() => {
    const getParkingCities = async () => {
      const response = await axios.get(
        `${api}/OperatingProperty/getParkingOperatingCity`
      );
      dispatch({ type: "SET_PARKING_CITY", payload: response.data });
    };
    getParkingCities();
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
                <Button variant="contained" onClick={DeleteImages}>
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
                Confirm Update Parking
              </h1>
            </div>
            <div class="modal-body">
              <div className="row ">
                {Imgerror && (
                  <span className="text-danger d-block">
                    Following images size is greater than 1MB.
                  </span>
                )}
                {parkingImages &&
                  parkingImages
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
                      ? "Are you sure you want to update this parking?"
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
                success && (
                  <Button
                    variant="contained"
                    color="success"
                    data-bs-dismiss="modal"
                    onClick={handleSuccess}
                  >
                    Finish
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex">
        <Sidebar />
        <div style={{ width: "100vw", marginTop: "70px" }}>
          <div className={`container-fluid w-100 `}>
            <h1 className="text-center fw-bold">Update Parking Form</h1>
            <form className="needs-validation mx-4">
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
                    Parking Title
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
                    className={`labels text-${
                      mode === "light" ? "dark" : "light"
                    }`}
                  >
                    Rating
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Booked Slots"
                    name="rating"
                    value={formValues.rating}
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
                    Price
                  </label>
                  <input
                    type="Number"
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
                    options={parkingOperatingCity}
                    renderInput={(params) => (
                      <TextField {...params} label="Cities" />
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
                  Available Images
                </label>
                <div className="col-md-12 col-sm-4">
                  <div className={`${style.image_selector}`}>
                    {formValues.photos &&
                      formValues.photos.map((image, index) => {
                        return (
                          <div
                            key={image}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={`${style.preview_image}`}
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
                                className={`${style.delete_button}`}
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop1"
                              >
                                <DeleteIcon
                                  className="text-light me-1"
                                  onClick={() => {
                                    setDeleteImage(image);
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
                  Upload Images
                </label>
                <small className="text-muted">
                  {" "}
                  Please select 3-7 images only{" "}
                </small>
                <div className="col-md-12 col-sm-4">
                  <div className={`${style.image_selector}`}>
                    {parkingImages &&
                      parkingImages.map((imageObj, index) => {
                        return (
                          <div
                            key={imageObj.blobURL}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={`${style.preview_image}`}
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
                                className={`${style.delete_button}`}
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
                      className={`${style.add_button}`}
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
              <div className="mt-3">
                <div className="form-group">
                  <label htmlFor="feature">Parking Feature</label>
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
                  Update Parking
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateParking;
