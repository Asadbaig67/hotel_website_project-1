import React, { useState } from "react";
import listing4 from "../../images/listing-04.jpg";
import listing3 from "../../images/listing-03.jpg";
import listing2 from "../../images/listing-02.jpg";
import listing1 from "../../images/listing-01.jpg";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleIcon from "@mui/icons-material/People";
import KingBedIcon from "@mui/icons-material/KingBed";
import WifiIcon from "@mui/icons-material/Wifi";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import HotelIcon from "@mui/icons-material/Hotel";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AccessibleIcon from "@mui/icons-material/Accessible";
import BathtubIcon from "@mui/icons-material/Bathtub";
import DoneIcon from "@mui/icons-material/Done";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const Roomcard = (props) => {
  const { type, price, pic } = props.data;
  const [rooms, setRooms] = useState(1);
  const [persons, setPersons] = useState(1);
  const [deals, setDeals] = useState(0);

  const handleChange = (event) => {
    setRooms(event.target.value);
  };
  const handlePersonChange = (event) => {
    setPersons(event.target.value);
  };
  const handleDealsChange = (event) => {
    setDeals(event.target.value);
  };

  return (
    <div className="card mt-4 mx-auto" style={{ width: "23rem" }}>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-mdb-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={pic} className="card-img-top" alt="Wild Landscape" />
          </div>

        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselExampleControls"
          data-mdb-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-mdb-target="#carouselExampleControls"
          data-mdb-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="card-body p-2">
        <h5 className="card-title">
          {props.hotel}, {type}{" "}
        </h5>
        <label className="d-block fw-light " htmlFor="">
          <SquareFootIcon /> 687 sq ft
        </label>
        <label className="d-block fw-light" htmlFor="">
          <LocationCityIcon /> City view
        </label>
        <label className="d-block fw-light" htmlFor="">
          <PeopleIcon /> Sleeps
        </label>
        <label className="d-block fw-light" htmlFor="">
          <KingBedIcon /> Double bed
        </label>
        <label className="d-block fw-light" htmlFor="">
          <WifiIcon /> Wifi
        </label>
        <label className="d-block fw-light" htmlFor="">
          <FreeBreakfastIcon /> Breakfast
        </label>
        <label className="d-block ms-1 fw-light" htmlFor="">
          Fully Refundable <br />
          <small className="d-block ms-3 fw-light text-muted ">
            before 24 hours
          </small>
        </label>
        <a
          href="#"
          className="text-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          More Details
        </a>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  {props.hotel}, {type}{" "}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src={pic}
                        className="d-block w-100 rounded-2"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
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
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                <div className="container-fluid">
                  <h4 className="my-2">Room Anmeties</h4>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <h6 className="my-2">
                        <AccessibleIcon /> Accessebility
                      </h6>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Bathroom emergency pull cord
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Doorbell,phone notification
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Grab bar in shower
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Grab bar near toilet
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Hand-held showerhead
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Height-adjustable showerhead
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Lever door handles
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Low-height counters and sink
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Low-height outlets in bathroom
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Phone accessibility kit
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Raised toilet seat
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Visual fire alarm
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Wheelchair accessible
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Wheelchair-width doorways
                      </small>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h6 className="my-2">
                        <BathtubIcon /> Bathroom
                      </h6>
                      <small className="d-block ms-3 fw-light text-muted "></small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Bathrobes
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Bidet
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Deep soaking bathtub
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Designer toiletries
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Hair dryer
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Private bathroom
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Rainfall showerhead
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Separate bathtub and shower
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Slippers
                      </small>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <h6 className="my-2">
                        <KingBedIcon /> Bedroom
                      </h6>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Air conditioning
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Bed sheets
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Ceiling fan
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Down duvet
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Egyptian cotton linens
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Free cribs/infant beds
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Hypo-allergenic bedding
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Pillow menu
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Premium bedding
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Rollaway/extra beds (surcharge)
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Tempur-Pedic bed
                      </small>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h6 className="my-2">
                        <DoneIcon /> Entertainment
                      </h6>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Free newspaper
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        LCD TV
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Pay movies
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Premium TV channels
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Satellite channels
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Hair dryer
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Private bathroom
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Rainfall showerhead
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Separate bathtub and shower
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Slippers
                      </small>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <h6 className="my-2">
                        <FastfoodIcon /> Food and Drinks
                      </h6>
                      <small className="d-block ms-3 fw-light text-muted ">
                        24-hour room service
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Coffee/tea maker
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Dining area
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Espresso maker
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Free bottled water
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Minibar (fees may apply)
                      </small>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <h6 className="my-2">
                        <WifiIcon /> Internet
                      </h6>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Free WiFi
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Free wired Internet
                      </small>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <h6 className="my-2">
                        <DoneIcon /> More
                      </h6>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Connecting rooms available
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Daily housekeeping
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Desk
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Dining table
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Free newspaper
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Iron/ironing board
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Laptop workspace
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Safe
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Soundproofed rooms
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Turndown service
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        View - park
                      </small>
                      <small className="d-block ms-3 fw-light text-muted ">
                        Wardrobe or closet
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="m-0" />
        <div className="card-body p-2">
          <h6 className="my-2">Options</h6>
          <Box sx={{ maxWidth: 70 }}>
            <FormControl variant="standard" sx={{ minWidth: 200 }}>
              <InputLabel className="" id="demo-simple-select-standard-label">
                <HotelIcon /> Rooms
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={rooms}
                onChange={handleChange}
                label="rooms"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: 200 }}>
              <InputLabel className="" id="demo-simple-select-standard-label">
                <GroupAddIcon /> Persons
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={persons}
                onChange={handlePersonChange}
                label="rooms"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: 200 }}>
              <InputLabel className="" id="demo-simple-select-standard-label">
                <LocalOfferIcon /> Optional Choice
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={deals}
                onChange={handleDealsChange}
                label="deals"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>No Extras</MenuItem>
                <MenuItem value={5}>Breakfast Only +5$</MenuItem>
                <MenuItem value={20}>Buffet and Breakfast +20$</MenuItem>
                <MenuItem value={45}>Lunch + Buffet +45$</MenuItem>
                <MenuItem value={50}>
                  Special Deal + Dinner + Refreshment +50$
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <span className="badge mt-3 bg-success text-light">20% Discount</span>
          <div className="d-flex  ms-auto flex-row align-items-center">
            <h4 className="fw-bold mx-1 fs-4">{rooms * price + deals}$</h4>
            <span className="text-danger">
              <s>{rooms * price + 40 + deals}$</s>
            </span>
          </div>
          <small
            className="d-block ms-3 fw-light text-muted text-muted text-end fs-7 fw-light"
          >
            {rooms * price + 10 + deals}$ Tax and charges
          </small>
          <button className="btn my-3 btn-block btn-md btn-outline-primary">
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roomcard;
