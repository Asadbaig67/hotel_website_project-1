import React, { useState } from "react";
import FormData from "form-data";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
// import { FormDataEncoder } from "form-data-encoder";

// import form-data-encoder from 'form-data-encoder';
import style from "./addhotel.module.css";

const AddHotelForm = () => {
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

  const [files, setFiles] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  // const handleFileInputChange = (event) => {
  //   setFiles([...event.target.files]);
  // };

  const onSelectFile = (event) => {
    // Get the selected files from the input element
    setFiles([...event.target.files]);

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
  function deleteHandler(image) {
    setFormValues((prevValues) => ({
      ...prevValues,
      photos: formValues.photos.filter((e) => e !== image),
    }));
    URL.revokeObjectURL(image);
    setFiles((prevFiles) => prevFiles.filter((e) => e !== image));
  }

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
    formData.append("ownerId", loggedinUser.user._id);

    // Append each photo in the photos array to the FormData object
    for (let i = 0; i < files.length; i++) {
      formData.append("photos", files[i]);
    }
    const url = "http://localhost:5000/hotels/addhotel";

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
      <h1 className="text-center fw-bold">Add Hotel Form</h1>
      <form className="needs-validation mx-4">
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
              <div className={style.image_selector}>
                {formValues.photos &&
                  formValues.photos.map((image, index) => {
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
                    please delete <b> {formValues.photos.length - 10} </b> of
                    them
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
        <div className="mt-5 text-center">
          <button
            className="btn btn-primary btn-md profile-button mb-4"
            type="submit"
            disabled={
              formValues.photos.length > 10 && formValues.photos.length < 3
            }
            onClick={handleSubmit}
          >
            Add Hotel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotelForm;
