import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

export default function EditProfile({ profile }) {
  // confirm modal
  const [emptyInput, setEmptyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const { mode } = useSelector((state) => state.mode);
  const { profileImage } = useSelector((state) => state.profileImage);
  const { user } = profile;
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.dataProfile);
  const Navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "SETPROFILEDATA", payload: user });
  }, [user]);

  const data = {
    _id: profileData._id,
    image: profileData.image,
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    mobile: profileData.mobile,
    addressLine1: profileData.addressLine1,
    addressLine2: profileData.addressLine2,
    postalCode: profileData.postalCode,
    state: profileData.state,
    area: profileData.area,
    email: profileData.email,
    education: profileData.education,
    country: profileData.country,
    region: profileData.region,
  };

  const handleClickOpen = () => {
    if (data.firstName === "" || data.lastName === "" || data.email === "") {
      setEmptyInput(true);
    } else {
      setEmptyInput(false);
    }
  };

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const handleConditions = () => {
    setError(false);
    setMessage("");
  };
  const handleSuccess = () => {
    setSuccess(false);
    setMessage("");
    Navigate("/profile");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setMessage("");
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", data._id);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("image", profileImage);

    const response = await fetch(`${api}/user/updateuser`, {
      method: "PUT",
      body: formData,
    });
    if (response.status === 200) {
      setMessage("Profile Updated Successfully!!");
      setLoading(false);
      setSuccess(true);
    } else {
      setMessage("Something Went Wrong!!");
      setSuccess(false);
      setLoading(false);
      setError(true);
    }
    const result = await response.json();
    const user = await axios.get(
      `${api}/user/getuserbyid/${data._id}`
    );
    dispatch({ type: "SET_LOGGEDIN_USER", payload: user.data });
  };

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
                Confirm Update Profile
              </h1>
            </div>
            <div class="modal-body">
              {!profileImage.name ? (
                <span className="text-danger d-block">
                  Please select profile images!!
                </span>
              ) : (
                ""
              )}
              {emptyInput ? (
                <span className="text-danger d-block">
                  Please fill all the fields!!
                </span>
              ) : (
                ""
              )}
              {profileImage.name && !emptyInput && (
                <>
                  <span className="d-block">
                    {message === ""
                      ? "Are you sure you want to update profile?"
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
                  disabled={!profileImage.name || emptyInput}
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
      <form className="needs-validation mx-4">
        <div className="row mt-2">
          <div className="col-md-12 row">
            <div className="col-md-5 d-flex justify-content-between px-3 pt-2">
              <span
                className={`mt-3 text-${mode === "light" ? "dark" : "light"}`}
              >
                Image Upload
              </span>
              <div className="position-relative">
                <ImageUpload />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <label
              htmlFor="validationCustom01"
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="first name"
              id="validationCustom01"
              value={data.firstName}
              //required
              onChange={(e) => {
                data.firstName = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
          <div className="col-md-6">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Surname
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="surname"
              value={data.lastName}
              onChange={(e) => {
                data.lastName = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Email ID
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter email id"
              value={data.email}
              //required
              onChange={(e) => {
                data.email = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
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
            Save Profile
          </button>
        </div>
      </form>
    </>
  );
}
