import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "../Hotel_Forms/addhotel.module.css";

const AddRoomForm = () => {
  const IsMobile = useMediaQuery("(max-width:450px)");

  const [formValues, setFormValues] = useState({
    room_no: "",
    type: "",
    price: "",
    desc: "",
    photos: [],
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

    let imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  // Function to remove an image from the array of images
  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    // Submit form data to API or perform other actions
  };

  const { mode } = useSelector((state) => state.mode);

  return (
    <div className={`container  ${IsMobile ? "" : "w-50"} `}>
      <h1 className="text-center fw-bold">Add Room Form</h1>
      <form className="needs-validation mx-4">
        <div className="row mt-2">
          <div className="col-md-6">
            <label
              htmlFor="validationCustom01"
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Room Type
            </label>
            <select
              className="form-select"
              name="type"
              id="validationCustom01"
              value={formValues.type}
              required
              onChange={handleInputChange}
            >
              <option value="">Select room type</option>
              <option value="Single">Single</option>
              <option value="Twin">Twin</option>
              <option value="Family">Family</option>
            </select>
          </div>

          <div className="col-md-6">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Room Number{" "}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Room No"
              name="room_no"
              value={formValues.room_no}
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
              Room Price
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="price"
              name="price"
              value={formValues.price}
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
              Upload Room Images
            </label>
            <div className="col-md-12 col-sm-4">
              <div className="image-selector">
                {selectedImages &&
                  selectedImages.map((image, index) => {
                    return (
                      <div key={image} className={`image-preview mx-1 my-1`}>
                        <img
                          className="preview-image"
                          src={image}
                          alt="upload"
                        />
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
              selectedImages.length < 10 ? "d-none" : ""
            } text-center my-3`}
          >
            {selectedImages.length > 0 &&
              (selectedImages.length > 10 ? (
                <p className="text-danger">
                  You can't upload more than 10 images! <br />
                  <span>
                    please delete <b> {selectedImages.length - 10} </b> of them
                  </span>
                </p>
              ) : (
                <div className="">
                  <button
                    className={`btn btn-primary btn-md`}
                    onClick={() => {
                      console.log(selectedImages);
                    }}
                  >
                    UPLOAD {selectedImages.length} IMAGE
                    {selectedImages.length === 1 ? "" : "S"}
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
        </div>
        <div className="mt-5 text-center">
          <button
            className="btn btn-primary btn-md profile-button mb-4"
            type="submit"
          >
            Add Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoomForm;
