import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

const HotelBooking = () => {
  const IsMobile = useMediaQuery("(max-width:450px)");

  const [formValues, setFormValues] = useState({
    name: "",
    type: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
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
              Booking Type
            </label>
            <select
              className="form-select"
              name="type"
              id="validationCustom01"
              value={formValues.type}
              required
              onChange={handleInputChange}
            >
              <option value="">Select Booking type</option>
              <option value="Hotel">Hotel</option>
              <option value="Hotel And Parking">Hotel And Parking</option>
              <option value="Parking">Parking</option>
            </select>
          </div>
          <div className="col-md-6">
            <label
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              {formValues.type} Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={formValues.type + " Name"}
              name="name"
              value={formValues.name}
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
              Check In Date
            </label>
            <input
              className="form-select"
              name="checkInDate"
              type="date"
              id="validationCustom01"
              value={formValues.checkInDate}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-6">
            <label
              htmlFor="validationCustom01"
              className={`labels text-${mode === "light" ? "dark" : "light"}`}
            >
              Check Out Date
            </label>
            <input
              className="form-select"
              name="checkOutDate"
              type="date"
              id="validationCustom01"
              value={formValues.checkOutDate}
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

export default HotelBooking;
