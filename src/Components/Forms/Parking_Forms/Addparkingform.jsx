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
import axios from "axios";
import { useEffect } from "react";
import SidebarAdmin from "../../AdminDashboardSidebar/AdminDashboardSidebar";
import Topbar from "../../Topbar/Topbar";
import AdminSidebar from "../../adminSidebar/AdminSidebar";

const AddParkingForm = () => {
  //Alerts Code
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");
  const IsMobile = useMediaQuery("(max-width:450px)");
  const [Owner, setOwner] = useState([]);
  const [FinalOwner, setFinalOwner] = useState({});

  const [formValues, setFormValues] = useState({
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
  });

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFormValues({
      ...formValues,
      [event.target.name]: value,
    });
  };

  const handleOwner = (selectedOwner) => {
    setFinalOwner(selectedOwner);
  };

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

  // Function to remove an image from the array of images
  function deleteHandler(image) {
    setParkingImages((prevImages) => {
      return prevImages.filter((Imageblob) => Imageblob !== image);
    });
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
  const [features, setFeatures] = useState([...defaultParkingFacilities]);
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
    formData.append(
      "ownerId",
      loggedinUser.user.account_type === "admin"
        ? FinalOwner.id
        : loggedinUser.user._id
    );
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
    const url = "http://localhost:5000/parking/addparking";

    const options = {
      method: "POST",
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

  const GetOwners = async () => {
    const url = "http://localhost:5000/user/getuseridandname";
    const params = {
      form_type: "parking",
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

  console.log(formValues.rating);

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
            <h1 className="text-center fw-bold">Add Parking Form</h1>
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
                    Parking Rating
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Parking Rating"
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
                  Upload Parking Images
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
                            key={index}
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
                  disabled={
                    parkingImages.length > 7 || parkingImages.length < 3
                  }
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

export default AddParkingForm;
