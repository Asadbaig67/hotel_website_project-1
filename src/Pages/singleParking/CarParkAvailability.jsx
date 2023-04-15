import React from "react";
import "./carPark.css";

const CarParkAvailability = () => {
  const carParkData = [
    {
      title: "Unlimited pass",
      price: "25 €",
      entry: {
        date: "Th, 13 Apr",
        time: "10:00",
      },
      exit: {
        date: "Fr, 14 Apr",
        time: "10:00",
      },
      vehicle: "Car - Maximum height 2.05m",
      available: true,
    },
    {
      title: "Standard pass",
      price: "15 €",
      entry: {
        date: "Fr, 15 Apr",
        time: "14:00",
      },
      exit: {
        date: "Sa, 16 Apr",
        time: "14:00",
      },
      vehicle: "SUV - Maximum height 2.30m",
      available: false,
    },
  ];

  const renderCarParkData = () => {
    return carParkData.map((data, index) => {
      const {
        title,
        price,
        entry: { date: entryDate, time: entryTime },
        exit: { date: exitDate, time: exitTime },
        vehicle,
        available,
      } = data;
      return (
        <div key={index} className={`card ${available ? "card-selected" : ""}`}>
          <div className="card-header d-flex align-items-center">
            <div className="col text-truncate">
              <span className="card-title d-block text-truncate">{title}</span>
              <span className="card-info text-truncate">
                UNLIMITED ENTRY AND EXIT
              </span>
            </div>
            <div className="col-auto pl-0 ml-auto d-flex align-items-center">
              <span className="card-price">{price}</span>
              <div className={`card-check ${available ? "" : "ng-hide"}`}>
                <img
                  src="https://static.parclick.com/assets/img/icons/icon-check-negative.svg"
                  alt="Available"
                />
              </div>
            </div>
          </div>
          <div className="card-body d-flex flex-wrap">
            <div className="col-6 d-flex align-content-center flex-wrap with-divider">
              <span className="card-label w-100">Car park entrance</span>
              <span>
                {entryDate} <strong className="strong-hour">{entryTime}</strong>
              </span>
            </div>
            <div className="col-6 d-flex align-content-center flex-wrap">
              <span className="card-label w-100">Leave car park</span>
              <span>
                {exitDate} <strong className="strong-hour">{exitTime}</strong>
              </span>
            </div>
            <div className="col-12 divider-top d-flex align-content-center flex-wrap">
              <span className="card-label w-100">Vehicle</span>
              {vehicle}
            </div>
          </div>
          <div className="card-footer d-flex justify-content-center">
            <button className="btn btn-card">Book now</button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bestproducts">
      <h2 className="title">Car park availability</h2>
      <div className="card-group">{renderCarParkData()}</div>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="..." class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="..." class="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarParkAvailability;
