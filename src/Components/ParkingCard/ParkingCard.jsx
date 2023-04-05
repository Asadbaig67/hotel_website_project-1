import React from "react";
import image from "../../images/listing-01.jpg";
const ParkingCard = (props) => {
  const {
    // name,
    // description,
    // city,
    // country,
    // total_slots,
    // booked_slots,
    // price,
    // pic,
    availableSlots,
    parking,
  } = props.data;
  const { name, city, country, description, price, title, photos } = parking;
  const card = {
    title: "Card title",
    rating: "4.5",
    desc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    price: "$100",
  };
  return (
    <>
      <div className="card my-3 shadow mx-4">
        {/* <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={image} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={image} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={image} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div> */}
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
            <span className="text-warning fw-bold">Rating</span> {card.rating}
          </small>
          <p>
            {" "}
            <span className="fw-bold text-info">{availableSlots}</span> Free
            Slots{" "}
          </p>
          <p className="card-text">{description}</p>
          <div className="mt-3 ">
            <h4 className="">
              <span className="fw-bold text-dark bg-success rounded-2 px-2 py-1 me-2">
                Price{" "}
              </span>{" "}
              {price}.00${" "}
            </h4>
          </div>
        </div>

        <div className="card-body">
          <button className="btn btn-primary btn-block">Book Now</button>
        </div>
      </div>
    </>
  );
};

export default ParkingCard;
