import React, { useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";

const Listing = () => {
  const [singlefile, setsingleFile] = useState();
  const [selectedImages, setSelectedImages] = useState([]);

  const selectsingleimg = (e) => {
    setsingleFile(e.target.files[0]);
  };
  const onSelectFile = (event) => {
    // Get the selected files from the input element
    const selectedFiles = event.target.files;

    // Convert the FileList object to an Array
    const selectedFilesArray = Array.from(selectedFiles);

    // Map over the array of files and return a new array of objects of the desired shape
    let imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });


    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    
    event.target.value = "";
  };

  // Function to remove an image from the array of images
  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }

  const dispatch = useDispatch();
  const { userdata, titlefile } = useSelector((state) => state.setpropertyData);

  const [user, setUser] = useState({
    name: "",
    city: "",
    title: "",
    type: "",
    description: "",
  });

  // const showdata = () => {
  //   console.log(titlefile);
  // };

  const handleChange = (e) => {
    const value = e.target.value;

    setUser({ ...user, [e.target.name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "setuserdata",
      payload: user,
    });

  };

  return (
    <>
      <div>
        <p>{userdata.name}</p>
        <p>{userdata.city}</p>
        <p>{userdata.title}</p>
        <p>{userdata.type}</p>
        <p>{userdata.description}</p>
        {/* <p>{titlefile}</p> */}
      </div>
      <div className="container-fluid">
        <div className="container ">
          <div className="row ">
            <div className="col-md-12 col-lg-12 col-sm-12  d-flex flex-column">
              <div
                className="container p-3 my-4 rounded-7  border bg-light border-light rounded-3"
                style={{
                  boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
                }}
              >
                <h5 className="text-uppercase text-dark text-center ">
                  Property Listing Form
                </h5>
                <hr className="w-100" />
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label text-dark"
                      >
                        Property Name
                      </label>
                      <input
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        name="name"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label text-dark"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label text-dark"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label text-dark"
                      >
                        Type
                      </label>
                      <input
                        type="text"
                        name="type"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <div className="mb-3">
                      <div className="row">
                        <label for="formFile" className="text-dark form-label">
                          Property Pictures
                        </label>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-sm-4">
                          <div className={`${style.images}`}>
                            {selectedImages &&
                              selectedImages.map((image, index) => {
                                return (
                                  <div key={image} className={`mx-1 my-1`}>
                                    <img
                                      className=""
                                      src={image}
                                      height="50"
                                      width="50"
                                      alt="upload"
                                    />
                                    <div className="d-flex  bg-dark flex-row justify-content-between">
                                      <p className="text-light ms-1">
                                        {index + 1}
                                      </p>

                                      <IconButton
                                        aria-label="delete"
                                        size="small"
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
                              className="bg-dark p-4 rounded-3 text-light"
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
                      <div className="container text-center my-3">
                        {selectedImages.length > 0 &&
                          (selectedImages.length > 10 ? (
                            <p className={`${style.error}`}>
                              You can't upload more than 10 images! <br />
                              <span>
                                please delete{" "}
                                <b> {selectedImages.length - 10} </b> of them
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
                    </div>
                  </div>
                </div>
                <div className="my-3 ">
                  <label
                    for="exampleFormControlTextarea1"
                    className="text-dark form-label"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <input
                  type="submit"
                  onClick={handleClick}
                  className="font-medium text-base px-4 py-2 my-3 leading-relaxed inline-block rounded-4 whitespace-nowrap cursor-pointer bg-black text-white"
                  value="Submit"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Listing;
