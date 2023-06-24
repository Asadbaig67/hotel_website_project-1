import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ParkingCard = (props) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {
    
    availableSlots,
    parking,
  } = props.data;

  const { name, city, country, description, price, title, photos, rating } =
    parking;


  const HandleClick = () => {
    dispatch({ type: "SET_SELECTED_PARKING", payload: props.data });
    Navigate("/singleparking");
  };

  return (
    <>
      <div className="card my-3 shadow mx-4">
        
        <img
          src={photos[0]}
          height="220"
          width="200"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-title">{name}</h4>
          <small className="d-block">
            {" "}
            <span className="text-primary fw-bold">{city}</span> {country}
          </small>
          <small className="d-block">
            {" "}
            <span className="text-warning fw-bold">Rating</span> {rating}
          </small>
          <p>
            {" "}
            <span className="fw-bold text-info my-1">
              {availableSlots}
            </span>{" "}
            Free Slots{" "}
          </p>
          <p className="card-text fw-lighter mt-2 fst-italic">
            {description.slice(0, 100) + "..."}
          </p>
          <div className="mt-2">
            <h4 className="">
              <span className="fw-bold text-dark bg-secondary rounded-2 px-2 py-1 me-2">
                Price{" "}
              </span>{" "}
              {price}.00${" "}
            </h4>
          </div>
        </div>
        <div className="p-2">
          <button className="btn btn-primary btn-block" onClick={HandleClick}>
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ParkingCard;
