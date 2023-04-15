import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import "../css/signup.css";
// import { Navigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../ImageUpload/ImageUpload";

export default function EditProfile({ profile }) {
  const { mode } = useSelector((state) => state.mode);
  const { user } = profile;
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.dataProfile);

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

  const handleSubmit = async (e) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/user/update/${data._id}`,
        data
      );
      dispatch({ type: "SET_LOGGEDIN_USER", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="needs-validation mx-4" onSubmit={handleSubmit}>
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
              //required
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
              Mobile Number
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter phone number"
              value={data.mobile}
              //required
              onChange={(e) => {
                data.mobile = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
          <div className="col-md-12 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Address Line 1
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter address line 1"
              value={data.addressLine1}
              //required
              onChange={(e) => {
                data.addressLine1 = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
          <div className="col-md-12 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Address Line 2
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter address line 2"
              value={data.addressLine2}
              //required
              onChange={(e) => {
                data.addressLine2 = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
          <div className="col-md-12 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Postcode
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Postal Code"
              value={data.postalCode}
              //required
              onChange={(e) => {
                data.postalCode = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
          <div className="col-md-12 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              State
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="State"
              value={data.state}
              //required
              onChange={(e) => {
                data.state = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
          <div className="col-md-12 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Area
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Area"
              value={data.area}
              //required
              onChange={(e) => {
                data.area = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
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
          <div className="col-md-12 mt-2">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Education
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="education"
              value={data.education}
              //required
              onChange={(e) => {
                data.education = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
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
              value={data.country}
              //required
              onChange={(e) => {
                data.country = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
          <div className="col-md-6">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              State/Region
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="state"
              value={data.region}
              //required
              onChange={(e) => {
                data.region = e.target.value;
                dispatch({ type: "SETPROFILEDATA", payload: data });
              }}
            />
          </div>
        </div>
        <div className="mt-5 text-center">
          <button className="btn btn-primary profile-button mb-4" type="submit">
            Save Profile
          </button>
        </div>
      </form>
    </>
  );
}
