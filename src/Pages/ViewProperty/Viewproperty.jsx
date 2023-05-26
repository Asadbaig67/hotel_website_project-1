import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import styles from "./viewProperty.module.css";
import RestoreIcon from "@mui/icons-material/Restore";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid } from "@mui/x-data-grid";

const Viewproperty = ({ property }) => {
  // Data Grid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  // Data Grid

  const { booked_property } = useSelector((state) => state.getBookedDetails);

  // Data The User Selected From Card
  const { selected_parking } = useSelector((state) => state.getSelectedParking);
  console.log(
    "here is the selected parking at parking - page= ",
    selected_parking
  );

  // Parking Dates
  // const datesParking = useSelector((state) => state.searchParkingDate.dates);
  // const price = selected_parking.parking.price;

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

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  console.log("booked_property = ", selected_parking);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={`my-3 ${styles.property_details}`}>
        <div>
          <div className="d-flex justify-content-between">
            <h2 className={`${styles.property_name} mb-2`}>
              {selected_parking.parking.name}
            </h2>
            {/* <button className="btn btn-primary btn-lg ">Book Now</button> */}
          </div>
          <div className={styles.property_ratings}>
            <Box
              className="justify-content-start mb-2"
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Rating
                name="hover-feedback"
                value={
                  booked_property
                    ? booked_property.rating
                      ? booked_property.rating
                      : booked_property.rating
                      ? booked_property.rating
                      : 4
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
                      booked_property
                        ? booked_property.rating
                          ? booked_property.rating
                          : booked_property.hotel_rating
                          ? booked_property.hotel_rating
                          : 4
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
              {property.features.map((feature) => (
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
          <div className=" my-3">
            <h3 className="fw-bold fs-5 my-3 text-dark my-2">
              All Rooms And Deatils
            </h3>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>
          <div className="my-3 ">
            <h3 className="fw-bold fs-5 my-3 text-dark my-2">
              ALl Bookings Details
            </h3>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
              />
            </Box>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Viewproperty;
