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
import AdminSidebar from "../../adminSidebar/AdminSidebar";

const UpdateHotel = () => {
  //Alerts Code
  const [alertOn, setAlertOn] = useState(false);
  const [open, setOpen] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const IsMobile = useMediaQuery("(max-width:450px)");
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);

  const defaultFormValues = {
    _id: "64308b2d8926b91b79d17f69",
    Facilities: [],
    name: "Luxury One Hotel",
    title: "Hotel",
    rating: 5,
    description:
      "Escape to The Mountain View Lodge, where you can enjoy breathtaking views of the surrounding mountains. Our rustic lodge offers cozy accommodations and a warm, inviting atmosphere. Whether you are here to ski, hike, or simply relax, The Mountain View Lodge is the perfect destination",
    photos: [
      "http://localhost:5000/uploads/HotelImages/hotelparking-bg.jpg",
      "http://localhost:5000/uploads/HotelImages/hotelPic4.jpg",
    ],
    city: "Lahore",
    country: "Pakistan",
    address: "Gulberg",
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  // const [formValues, setFormValues] = useState({
  //   name: "",
  //   title: "",
  //   rating: "",
  //   desc: "",
  //   photos: [],
  //   city: "",
  //   country: "",
  //   address: "",
  // });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // const [files, setFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // const handleFileInputChange = (event) => {
  //   setFiles([...event.target.files]);
  // };

  const onSelectFile = (event) => {
    // New Code
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
    // New Code

    // Get the selected files from the input element
    // const newImages = [...files];
    // for (let i = 0; i < event.target.files.length; i++) {
    //   newImages.push(event.target.files[i]);
    // }
    // setFiles(newImages);

    // For new images add
    // let tempArray = [...selectedImages];
    // for (let i = 0; i < imagesArray.length; i++) {
    //   tempArray.push(imagesArray[i]);
    // }
    // setSelectedImages(tempArray);

    // setFormValues((prevValues) => ({
    //   ...prevValues,
    //   photos: [...prevValues.photos, ...imagesArray],
    // }));
  };

  async function deleteHandler(imageObj) {
    // setFormValues((prevValues) => ({
    //   ...prevValues,
    //   photos: formValues.photos.filter((e) => e !== image),
    // }));

    setSelectedImages((prevImages) => {
      prevImages.filter((image) => image !== imageObj);
    });

    // Editabele Images Deletion form array
    // const newImage1 = [...selectedImages];
    // newImage1.splice(image, 1);
    // setSelectedImages(newImage1);
    // URL.revokeObjectURL(image);

    // Editabele Images Deletion form array that will be send to backend
    // const newImages = [...files];
    // newImages.splice(image, 1);
    // setFiles(newImages);
    // setFiles((prevFiles) => prevFiles.filter((e) => e !== image));
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
      if (response.status === 200) {
        setAlertOn(true);
        setAlertType("success");
        setAlertMessage("Hotel Updated Successfully");
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
  return (
    <>
      <div className="d-flex">
        <AdminSidebar/>
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
                  <AlertTitle>Add Hotel</AlertTitle>
                  <strong>{alertMessage}!</strong>
                </Alert>
              </Stack>
            </Collapse>
          )}
          <div className={`container  ${IsMobile ? "" : "w-50"} `}>
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
                <div
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
                    {/* <IconButton
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
                    </IconButton> */}
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
                <button
                  className="btn btn-primary btn-lg profile-button mb-4"
                  type="submit"
                  // disabled={files.length < 3 || files.length > 7}
                  onClick={handleSubmit}
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

export default UpdateHotel;
