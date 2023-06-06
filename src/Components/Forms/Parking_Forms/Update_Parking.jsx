import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "../Hotel_Forms/addhotel.module.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import SidebarAdmin from "../../AdminDashboardSidebar/AdminDashboardSidebar";
import Topbar from "../../Topbar/Topbar";
import AdminSidebar from "../../adminSidebar/AdminSidebar";

const UpdateParking = () => {
  //Alerts Code
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const IsMobile = useMediaQuery("(max-width:450px)");

  const defaultFormValues = {
    Facilities: [
      "Covered Parking",
      "Valet Parking",
      "Self-Parking",
      "Handicap Parking",
      "Electric Vehicle Charging Stations",
      "24-hour Surveillance Cameras",
      "Bicycle Parking",
      "Free Parking",
      "Paid Parking",
      "Parking Garage",
    ],
    _id: "64490a8d6aea5caf2f8c5c49",
    name: "Shopping Mall Parking",
    title: "Convenient Parking Near the Mall",
    total_slots: 50,
    booked_slots: 1,
    description:
      "This parking space is located just steps away from the biggest shopping mall in town and is perfect for shoppers who want to park their car safely and conveniently.",
    price: 50,
    photos: [
      "http://localhost:5000/uploads/ParkingImages/parking13.jpg",
      "http://localhost:5000/uploads/ParkingImages/parking14.jpg",
      "http://localhost:5000/uploads/ParkingImages/parking16.jpg",
    ],
    city: "New York",
    rating: 4,
    country: "USA",
    address: "456 Airport Rd",
  };

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
      return { file: file, blobUrl: URL.createObjectURL(file) };
    });
    const dummyImages = [...parkingImages];
    for (let i = 0; i < blobImagesArray.length; i++) {
      dummyImages.push(blobImagesArray[i]);
    }
    setParkingImages(dummyImages);
  };

  // Delete Available Images from backend
  const DeleteImages = async (image) => {
    alert(
      `Are you Sure You Want to Delete This Image? It will be permanently deleted from the Server!`
    );

    let url = `http://localhost:5000/parking/deleteparkingimage/${defaultFormValues._id}`;
    const data = { link: image.blobUrl }; // Request body data as an object
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

  // Function to remove an image from the array of images
  function deleteHandler(image) {
    setParkingImages((prevImages) =>
      prevImages.filter((Imageblob) => Imageblob !== image)
    );

    URL.revokeObjectURL(image);
  }

  // Add Features Code
  const defaultParkingFacilities = [
    "Covered Parking",
    "Valet Parking",
    "Self-Parking",
    "Handicap Parking",
    "Electric Vehicle Charging Stations",
    "24-hour Surveillance Cameras",
    "Bicycle Parking",
    "Free Parking",
    "Paid Parking",
    "Parking Garage",
  ];
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
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);

  const handleSubmit = async (event) => {
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
    const url = `http://localhost:5000/parking/updateparkingdata/${formValues._id}`;

    const options = {
      method: "PATCH",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        setAlertOn(true);
        setAlertType("success");
        setAlertMessage("Parking Added Successfully");
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
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Form Values", formValues);
  console.log("Original State Array", parkingImages);

  return (
    <>
      <div className="d-flex">
        <AdminSidebar />
        <div className="mt-5">
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
                  <AlertTitle>Parking</AlertTitle>
                  <strong>{alertMessage}!</strong>
                </Alert>
              </Stack>
            </Collapse>
          )}
          <div className={`container  ${IsMobile ? "" : "w-50"} `}>
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
                  <input
                    type="text"
                    className="form-control"
                    placeholder="state"
                    value={formValues.city}
                    name="city"
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
                  Available Images
                </label>
                <small className="text-muted">
                  {" "}
                  Please select 3-7 images only{" "}
                </small>
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
                            key={imageObj.blobUrl}
                            className={`${style.image_preview} mx-1 my-1`}
                          >
                            <img
                              className={`${style.preview_image}`}
                              src={imageObj.blobUrl}
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
                  className="btn btn-primary btn-lg profile-button mb-4"
                  type="submit"
                  // disabled={files.length > 7 || files.length < 3}
                  onClick={handleSubmit}
                >
                  Add Parking
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
