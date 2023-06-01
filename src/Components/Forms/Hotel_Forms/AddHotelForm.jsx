import React, { useState } from "react";
import FormData from "form-data";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import style from "./addhotel.module.css";
import { useEffect } from "react";
import axios from "axios";
import Dropdown from "../../dropdown/Dropdown";

const AddHotelForm = () => {
  //Alerts Code
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [Owner, setOwner] = useState([]);
  const [FinalOwner, setFinalOwner] = useState({});

  const IsMobile = useMediaQuery("(max-width:450px)");
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);

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
      return { file: file, bolbURL: URL.createObjectURL(file) };
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
    const url = "http://localhost:5000/hotels/addhotel";

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        setAlertOn(true);
        setAlertType("success");
        setAlertMessage("Hotel Added Successfully");
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

  const GetOwners = async () => {
    const url = "http://localhost:5000/user/getuseridandname";
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

  console.log("Final Owner is=", FinalOwner);

  return (
    <>
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
              <AlertTitle>Add Hotel</AlertTitle>
              <strong>{alertMessage}!</strong>
            </Alert>
          </Stack>
        </Collapse>
      )}

      <div className={`container  ${IsMobile ? "" : "w-50"} `}>
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
                  {/* <option value="Single">Single</option>
                <option value="Twin">Twin</option>
                <option value="Family">Family</option> */}
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
                className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
                className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
                className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
                className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
                className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
                className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
                className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
              Upload Images
            </label>
            <small>Please select 3-7 images only </small>
            <div className="col-md-12 col-sm-4">
              <div className={style.image_selector}>
                {selectedImages &&
                  selectedImages.map((imageObj, index) => {
                    return (
                      <div
                        key={imageObj.bolbURL}
                        className={`${style.image_preview} mx-1 my-1`}
                      >
                        <img
                          className={style.preview_image}
                          src={imageObj.bolbURL}
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
              className="btn btn-primary btn-lg profile-button mb-4"
              type="submit"
              disabled={selectedImages.length < 3 || selectedImages.length > 7}
              onClick={handleSubmit}
            >
              Add Hotel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddHotelForm;
