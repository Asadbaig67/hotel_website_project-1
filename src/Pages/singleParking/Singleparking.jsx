import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import styles from "./ParkingPropertyDetails.module.css";
import CarParkAvailability from "./CarParkAvailability";
import RestoreIcon from "@mui/icons-material/Restore";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";

function ParkingPropertyDetails() {
  const { booked_property } = useSelector((state) => state.getBookedDetails);
  const { c } = useSelector((state) => state.searchVehicle);

  // Data The User Selected From Card
  const { selected_parking } = useSelector((state) => state.getSelectedParking);
  console.log(
    "here is the selected parking at parking - page= ",
    selected_parking
  );

  // Parking Dates
  const datesParking = useSelector((state) => state.searchParkingDate.dates);
  const price = selected_parking.parking.price;
  // Data for Api request
  // User Id Data
  const { loggedinUser } = useSelector((state) => state.getLoggedInUser);
  const userId = loggedinUser.user._id;
  // Hotel Id Data
  const parkingId = selected_parking.parking._id;
  // Dates Data

  const [checkInDay, checkInMonth, checkInYear, checkInTime] =
    datesParking[0].split(/-|\s|:/);
  const checkInDateFormatted = `${checkInMonth}-${checkInDay}-${checkInYear} ${checkInTime}:00`;
  let checkIn = new Date(checkInDateFormatted);

  const [checkOutDay, checkOutMonth, checkOutYear, checkOutTime] =
    datesParking[1].split(/-|\s|:/);
  const checkOutDateFormatted = `${checkOutMonth}-${checkOutDay}-${checkOutYear} ${checkOutTime}:00`;
  let checkOut = new Date(checkOutDateFormatted);

  // console.log("Nyc Date", checkInDateFormatted);
  // console.log("Nyc date", checkOutDateFormatted);

  checkIn = checkIn.toISOString();
  checkOut = checkOut.toISOString();

  // const checkIn = datesParking[0];
  // const checkOut = datesParking[1];
  // Parking Object

  let parking = {
    Total_slots: parseInt(c),
    Parking_price: selected_parking.parking.price,
  };

  parking = JSON.stringify(parking);
  // console.log("parking object = ", selected_parking);

  console.log("parking object to send backedn = ", parking);
  console.log("parking id = ", parkingId);
  console.log("user id = ", userId);
  console.log("check in = ", checkIn);
  console.log("check out = ", checkOut);

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  function getLabelText(Value) {
    return `${Value} Star${Value !== 1 ? "s" : ""}, ${labels[Value]}`;
  }

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const HandleBooking = async () => {
    // Api Request
    const parkingURL = `${api}/booking/addParkingBooking?userId=${userId}&parkingId=${parkingId}&checkIn=${checkInDateFormatted}&checkOut=${checkOutDateFormatted}&parking=${parking}`;
    const requestOptions = {
      method: "POST",
    };
    try {
      const response = await fetch(parkingURL, requestOptions);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Booking Successful");
      } else {
        alert("Booking Failed");
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("booked property = ", selected_parking);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={`my-3 ${styles.property_details}`}>
        <div>
          <div className="d-flex justify-content-between">
            <h2 className={`${styles.property_name} `}>
              {selected_parking.parking.name}
            </h2>
            <button className="btn btn-primary btn-lg " onClick={HandleBooking}>
              Book Now
            </button>
          </div>
          <div className={styles.property_ratings}>
            <Box
              className="justify-content-start mb-2"
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
                m: 0,
                p: 0,
              }}
            >
              <Rating
                name="read-only"
                readOnly
                value={
                  selected_parking.parking.rating
                    ? selected_parking.parking.rating
                    : 4
                }
                precision={1}
                getLabelText={getLabelText}
                // onChange={(event, newValue) => {
                //   setValue(newValue);
                // }}
                // onChangeActive={(event, newHover) => {
                //   setHover(newHover);
                // }}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              {
                <Box className="ms-3" sx={{ mb: 1, fontSize: 17 }}>
                  {
                    labels[
                      selected_parking.parking.rating
                        ? selected_parking.parking.rating
                        : 4
                    ]
                  }
                </Box>
              }
            </Box>
          </div>
          <div className="d-flex flex-row">
            <span>
              <Link
                to="/"
                className="text-primary fs-8 fw-bold my-0 mx-md-0 mx-0"
              >
                {selected_parking.parking.city}
              </Link>
            </span>
            <span>
              <div to="/" className="fs-8 fw-light my-0 mx-1">
                {selected_parking.parking.country}
                {/* {hotel_country ? hotel_country : "Bangladesh"} */}
              </div>
            </span>
            <span>
              <DirectionsWalkIcon fontSize="small" className="mb-2 small" />
              29 min (1.8km)
            </span>
          </div>
        </div>
        <hr />
        <div className="mb-3">
          <Tooltip title="Accessible For People With Reduces Mobility" arrow>
            <AccessibleIcon
              fontSize="larger"
              className="bg-secondary rounded-pill p-1 me-2 fs-1"
            />
          </Tooltip>
          <Tooltip title="24h Service" arrow>
            <RestoreIcon
              fontSize="larger"
              className="bg-secondary rounded-pill p-1 ms-1 fs-1"
            />
          </Tooltip>
        </div>
        <div className={`${styles.property_info} `}>
          <h3 className="fw-bold fs-5 text-dark my-2">
            Details: About the car park
          </h3>
          <div className={`${styles.property_description} my-2`}>
            <p>{selected_parking.parking.description}</p>
          </div>
          <div className={`${styles.property_features} my-2`}>
            <h3 className="my-1">Features:</h3>
            <ul className={`mt-2 ${styles.features_list}`}>
              {selected_parking.parking.Facilities &&
                selected_parking.parking.Facilities.map((feature) => (
                  <li key={feature} className={styles.feature_item}>
                    {feature}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Modal Code */}
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
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  id="carouselExample"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner">
                    {selected_parking.parking.photos.map((picture, index) => (
                      <div
                        class={`carousel-item ${index === 0 ? "active" : ""}`}
                        key={index}
                      >
                        <img
                          src={picture}
                          class="d-block "
                          style={{
                            objectFit: "cover",
                            height: "500px",
                            width: "100%",
                          }}
                          alt="property picture"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          {<CarParkAvailability dates={datesParking} price={price} />}
        </div>
        {/* <div className={styles.property_prices}>
        <h3>Prices:</h3>
        <ul className={styles.prices_list}>
          {property.prices.map((price) => (
            <li key={price.id} className={styles.price_item}>
              {price.description}: ${price.amount}
            </li>
          ))}
        </ul>
      </div> */}

        <div className={`mb-2 ${styles.property_pictures}`}>
          <h3 className="my-3">Pictures:</h3>
          {selected_parking.parking.photos.map((picture) => (
            <button
              type="button"
              class="btn btn-unstyled"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <img
                src={picture}
                className={`${styles.preview_image} me-2`}
                alt="upload"
              />
            </button>
          ))}
        </div>
        <div className="mb-2">
          <h3 className="fw-bold text-dark fs-5 my-4">How to get there?</h3>
          <div className="border border-2 border-dark  p-3 rounded-3 mb-2">
            <div className="d-flex justify-content-between">
              <div>
                <span className="text-uppercase text-dark fw-bold">
                  CAR PARK HOURS
                </span>
                <br />
                <small className="text-uppercase">Open 24 hours a day</small>
              </div>
              <div className="col-auto pl-0 ml-auto d-flex align-items-center">
                <span className="card-price text-dark px-2 py-1 rounded-2 bg-secondary fw-bold fs-4">
                  {selected_parking.parking.price} €/h
                  <CheckCircleIcon className="text-success mx-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          {/* <Link to={`/booking/${property.id}`}> */}
          <button
            className="btn my-2 btn-primary btn-lg "
            onClick={HandleBooking}
          >
            Book Now
          </button>
          {/* </Link> */}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default ParkingPropertyDetails;
