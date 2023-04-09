import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Hotel_Forms/addhotel.css";

const AddParkingForm = () => {
  const IsMobile = useMediaQuery("(max-width:450px)");

  const [formValues, setFormValues] = useState({
    name: "",
    title: "",
    total_slots: 0,
    booked_slots: 0,
    description: "",
    photos: [],
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

  const [files, setFiles] = useState([]);

  const onSelectFile = (event) => {
    // Get the selected files and also previous file
    setFiles((prevFiles) => [...prevFiles, ...event.target.files]);
    // Get the selected files from the input element
    const selectedFiles = event.target.files;

    // Convert the FileList object to an Array
    const selectedFilesArray = Array.from(selectedFiles);
    // Map over the array of files and return a new array of objects of the desired shape
    let imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setFormValues((prevValues) => ({
      ...prevValues,
      photos: [...prevValues.photos, ...imagesArray],
    }));
  };

  // Function to remove an image from the array of images
  function deleteHandler(image) {
    setFormValues((prevValues) => ({
      ...prevValues,
      photos: formValues.photos.filter((e) => e !== image),
    }));
    URL.revokeObjectURL(image);
    // Also delete from files array
    // setFiles((prevFiles) => {
    //   return prevFiles.filter((file) => file !== image);
    // });
  }

  const { mode } = useSelector((state) => state.mode);

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
    formData.append("country", formValues.country);
    formData.append("address", formValues.address);

    // Append each photo in the photos array to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    const url = "http://localhost:5000/parking/addparking";

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`container  ${IsMobile ? "" : "w-50"} `}>
      <h1 className="text-center fw-bold">Add Parking Form</h1>
      <form className="needs-validation mx-4">
        <div className="row mt-2">
          <div className="col-md-6">
            <label
              htmlFor="validationCustom01"
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
          <div className="col-md-6">
            <label
              htmlFor="validationCustom01"
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
          <div className="col-md-6">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
        </div>
        <div className="row">
          <div className="col-md-12 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
          <div className="col-md-6 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
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
          <div className="col-md-12 col-sm-4">
            <div className="image-selector">
              {formValues.photos &&
                formValues.photos.map((image, index) => {
                  return (
                    <div key={image} className={`image-preview mx-1 my-1`}>
                      <img className="preview-image" src={image} alt="upload" />
                      <div className="image-overlay d-flex flex-row justify-content-between">
                        <p className="image-number text-light ms-1">
                          {index + 1}
                        </p>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          className="delete-button"
                        >
                          <DeleteIcon
                            className="text-light me-1"
                            onClick={() => deleteHandler(image)}
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
                className="add-button"
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
        <div
          className={`container ${
            formValues.photos.length < 7 ? "d-none" : ""
          } text-center my-3`}
        >
          {formValues.photos.length > 0 &&
            (formValues.photos.length > 7 ? (
              <p className="text-danger">
                You can't upload more than 7 images! <br />
                <span>
                  please delete <b> {formValues.photos.length - 7} </b> of them
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
        <div className="mt-5 text-center">
          <button
            className="btn btn-primary btn-md profile-button mb-4"
            type="submit"
            disabled={formValues.photos.length > 7}
            onClick={handleSubmit}
          >
            Add Parking
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddParkingForm;
