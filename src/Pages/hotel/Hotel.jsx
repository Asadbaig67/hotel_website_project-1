import "./hotel.css";
import Navbar from "../../Components/Navbar/Navbar";
import Roomcard from "../../Components/RoomCard/Roomcard";
import MailList from "../../Components/mailList/MailList";
import Footer from "../../Components/footer/Footer";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Person from "@mui/icons-material/Person";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BedIcon from "@mui/icons-material/Bed";
import Diversity1TwoToneIcon from "@mui/icons-material/Diversity1TwoTone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DoneIcon from "@mui/icons-material/Done";
import { useMediaQuery } from "@mui/material";

// import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Hotel = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { options } = useSelector((state) => state.searchOption);
  const { c } = useSelector((state) => state.searchVehicle);
  const { room_data } = useSelector((state) => state.getStaticroom);
  const { activePath } = useSelector((state) => state.activePath);
  const { selected_hotel } = useSelector((state) => state.getSelectedHotel);

  if (selected_hotel) {
  }
  let Facilities = [];
  if (selected_hotel.Facilities) {
    Facilities = [...selected_hotel.Facilities];
  }

  // const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  let availableParkingSlots =
    selected_hotel.parking_total_slots - selected_hotel.parking_booked_slots;
  let parkingPrice = 0;
  if (activePath === "hotelAndParking") {
    parkingPrice = selected_hotel.parking_price * c;
  }

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber =
        slideNumber === 0
          ? selected_hotel.photos
            ? selected_hotel.photos.length - 1
            : selected_hotel.hotel_photos.length - 1
          : slideNumber - 1;
    } else {
      newSlideNumber =
        slideNumber ===
        (selected_hotel.photos
          ? selected_hotel.photos.length - 1
          : selected_hotel.hotel_photos.length - 1)
          ? 0
          : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  //card responsiveness for mobile screen
  const isXtraSmallScreen = useMediaQuery("(max-width:400px)");

  const data = {
    name: "Hotel Pod Roza",
    address: "ul. Floriańska 1, 31-005 Kraków, Poland",
    distance: "0.1",
    cheapestPrice: "100",
    photos: [
      "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=600",
    ],
    title: "Hotel Pod Roza",
    price: "100",
    desc: "Hotel Pod Roza is located in the heart of Krakow, just 100 metres from the Main Market Square. It offers air-conditioned rooms with free Wi-Fi and satellite TV. The rooms at the Pod Roza are classically decorated with warm colours. Each comes with a private bathroom with a shower. Some rooms have a balcony. The hotel’s restaurant serves Polish and international cuisine. Guests can enjoy a drink at the bar. The Pod Roza is situated just 200 metres from the Wawel Royal Castle. The Main Railway Station is 1.5 km away. The hotel offers a 24-hour front desk service. Free public parking is available nearby.",
    facilities: [
      "Free WiFi",
      "Free parking",
      "Restaurant",
      "Bar",
      "24-hour front desk",
      "Non-smoking rooms",
      "Family rooms",
      "Lift",
      "Heating",
      "Air conditioning",
      "Designated smoking area",
      "Non-smoking throughout",
      "Wheelchair accessible",
      "Toilet with grab rails",
      "Higher level toilet",
      "Lower bathroom sink",
      "Emergency cord in bathroom",
      "Visual aids: Braille",
      "Visual aids: Tactile signs",
      "Visual aids: Large print",
      "Visual aids: Low vision aids",
      "Visual aids: ECO Friendly",
      "Visual aids: Other",
    ],
    reviews: [
      {
        name: "John",
        rating: "4",
        review:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet lorem. Sed euismod, nisl vel tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet lorem.",
      },
    ],
    rating: "4.5",
  };

  // To handle see more button
  let [limit, setLimit] = useState(6);
  const handleSeemore = () => {
    limit === Facilities.length ? setLimit(6) : setLimit(Facilities.length);
  };

  const HandleBook = () => {
    dispatch({
      type: "SET_BOOKED_PROPERTY",
      payload: selected_hotel,
    });
    Navigate("/bookingdetails");
  };

  // To disable scroll when modal is open
  useEffect(() => {
    const disableScroll = () => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    };
    window.addEventListener("scroll", disableScroll);
    return () => window.removeEventListener("scroll", disableScroll);
  }, [open]);

  console.log("Selected Hotel Is", selected_hotel);

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar list={false} />
      {false ? (
        "loading"
      ) : (
        <div className="hotelContainer continer-fluid">
          {open && (
            <div className="slider">
              <div className="sliderWrapper">
                <CloseIcon
                  className="close"
                  onClick={() => {
                    setOpen(false);
                    document.body.style.overflow = "visible";
                  }}
                />
                <ArrowBackIosNewIcon
                  className="arrow fs-1"
                  onClick={() => handleMove("l")}
                />
                <img
                  src={
                    selected_hotel.photos
                      ? selected_hotel.photos[slideNumber]
                      : selected_hotel.hotel_photos[slideNumber]
                  }
                  style={{ objectFit: "cover" }}
                  alt=""
                  className="sliderImg"
                />
                <ArrowForwardIosNewIcon
                  className="arrow fs-1"
                  onClick={() => handleMove("r")}
                />
              </div>
            </div>
          )}
          <div className="hotelWrapper px-3">
            <div className="row p-1">
              <div className="col-md-9">
                <h1 className="hotelTitle">
                  {selected_hotel
                    ? selected_hotel.hotel_name
                      ? selected_hotel.hotel_name
                      : selected_hotel.name
                      ? selected_hotel.name
                      : data.name
                    : "Hotel Pod Roza"}
                </h1>
                <div className="hotelAddress my-1">
                  <LocationOnIcon className="fs-6" />
                  <span className="">
                    {selected_hotel
                      ? selected_hotel.hotel_country
                        ? selected_hotel.hotel_country
                        : selected_hotel.country
                        ? selected_hotel.country
                        : data.country
                      : "Dubai"}
                  </span>
                  <span className="text-primary fw-bold">
                    {selected_hotel
                      ? selected_hotel.hotel_city
                        ? selected_hotel.hotel_city
                        : selected_hotel.city
                        ? selected_hotel.city
                        : data.city
                      : "Dubai"}
                  </span>
                </div>
                <span className="hotelDistance my-1">
                  Excellent location – {data.distance}m from center
                </span>
                <span className="hotelPriceHighlight d-block my-1">
                  Book a stay over ${data.cheapestPrice} at this property and
                  get a free airport taxi
                </span>
              </div>
              <div className="col-md-3 col-sm-6 col-12 text-start mt-1">
                <button
                  className={`btn btn-primary ${
                    isXtraSmallScreen ? "my-1" : ""
                  }`}
                  onClick={HandleBook}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
            <div className="hotelImages">
              {selected_hotel.photos
                ? selected_hotel.photos.map((photo, i) => {
                    return (
                      <>
                        <div className="hotelImgWrapper" key={photo}>
                          <img
                            onClick={() => {
                              if (!isXtraSmallScreen) {
                                window.scrollTo(20, 20);
                                handleOpen(i);
                              }
                            }}
                            src={photo}
                            alt="hotel_img"
                            className="hotelImg"
                          />
                        </div>
                      </>
                    );
                  })
                : selected_hotel.hotel_photos.map((photo, i) => {
                    return (
                      <>
                        <div className="hotelImgWrapper" key={photo}>
                          <img
                            onClick={() => {
                              if (!isXtraSmallScreen) {
                                window.scrollTo(20, 20);
                                handleOpen(i);
                              }
                            }}
                            src={photo}
                            alt="hotel_img"
                            className="hotelImg"
                          />
                        </div>
                      </>
                    );
                  })}
            </div>

            <div className="shadow p-3 mt-3">
              <div className="row">
                <div className="col-12 mb-2 pb-2 border-bottom">
                  <h5>Enjoy some extra spaces</h5>
                </div>
                <div className="col-md-6 mb-3 border-end">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <div className="fw-bold">
                        <div className="">
                          {options.singleRoom > 0 && (
                            <>
                              {" "}
                              {options.singleRoom}x{" "}
                              <span className="text-primary fw-bold">
                                {" "}
                                Single Room{" "}
                              </span>
                            </>
                          )}
                          {options.twinRoom > 0 && (
                            <>
                              {" "}
                              {options.twinRoom}x{" "}
                              <span className="text-primary fw-bold">
                                {" "}
                                Twin Room{" "}
                              </span>
                            </>
                          )}
                          {options.familyRoom > 0 && (
                            <>
                              {" "}
                              {options.familyRoom}x{" "}
                              <span className="text-primary fw-bold">
                                {" "}
                                Family Room{" "}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div>
                          Price for: {options.adult}x
                          <span className="mx-1">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                      </div>
                      {/* <div>
                        <b>Each unit has:</b>
                        <br />
                        Bed: 1 king bed
                      </div>
                      <div className="text-success mt-3">
                        Free cancellation until 2:00 PM on Feb 15, 2023
                      </div>
                      <div className="text-success">
                        NO PREPAYMENT NEEDED – pay at the property
                      </div>
                      <div className="mt-3">
                        <i className="fas fa-utensils"></i>
                        <span className="ms-2">
                          Breakfast PKR 5,513 (optional)
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div
                  className={`col-md-2 border-end ${
                    isXtraSmallScreen ? "d-none" : ""
                  }`}
                >
                  <div className="d-flex flex-column align-items-start">
                    <div className="fw-bold fs-5">
                      {selected_hotel.SingleRoomPrice &&
                        selected_hotel.SingleRoomPrice !== 0 && (
                          <>
                            <small>
                              Single Room Price = $
                              {selected_hotel.SingleRoomPrice}
                            </small>
                            <br />
                          </>
                        )}
                      {selected_hotel.TwinRoomPrice &&
                      selected_hotel.TwinRoomPrice > 0 ? (
                        <>
                          <small>
                            Twin Room Price = ${selected_hotel.TwinRoomPrice}
                          </small>
                          <br />
                        </>
                      ) : null}
                      {selected_hotel.FamilyRoomPrice &&
                      selected_hotel.FamilyRoomPrice > 0 ? (
                        <small>
                          Family Room Price = ${selected_hotel.FamilyRoomPrice}
                        </small>
                      ) : null}

                      {selected_hotel.StandardPrice &&
                        selected_hotel.StandardPrice !== 0 && (
                          <small>
                            Standard Price = ${selected_hotel.StandardPrice}
                          </small>
                        )}
                    </div>
                  </div>
                </div>
                <div className={`col-md-4 ${isXtraSmallScreen ? "mt-0" : ""}`}>
                  <div className="d-flex flex-column align-items-start">
                    <div className="mt-3" style={{ fontSize: "12px" }}>
                      {selected_hotel.Nights} nights, {options.adult} adults,{" "}
                      {options.children} children
                    </div>
                    <div className="fw-bold fs-5">
                      {selected_hotel.Total_Price && (
                        <small>
                          Total Price = $
                          {selected_hotel.parking_price
                            ? selected_hotel.Total_Price +
                              220 +
                              selected_hotel.parking_price * c
                            : selected_hotel.Total_Price + 220}
                        </small>
                      )}

                      {selected_hotel.StandardPrice && (
                        <small>
                          Total Price = ${selected_hotel.StandardPrice + 220}
                        </small>
                      )}
                    </div>
                    <div className="mt-2" style={{ fontSize: "12px" }}>
                      Includes 220 taxes and fees
                    </div>
                    {availableParkingSlots &&
                    activePath === "hotelAndParking" &&
                    !selected_hotel.StandardPrice ? (
                      <div className="mt-2" style={{ fontSize: "12px" }}>
                        Extra {parkingPrice}$ for parking
                      </div>
                    ) : null}
                    <button
                      className="btn btn-primary btn-block mt-3 mb-2"
                      onClick={HandleBook}
                    >
                      Reserve your selection
                    </button>
                    <div className="mt-2" style={{ fontSize: "12px" }}>
                      Don't worry – clicking this button won't charge you
                      anything!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">
                  {/* {selected_hotel ? selected_hotel.name : data.title} */}
                  {selected_hotel
                    ? selected_hotel.hotel_name
                      ? selected_hotel.hotel_name
                      : selected_hotel.name
                      ? selected_hotel.name
                      : data.name
                    : null}
                </h1>
                <p className="fw-lighter  fs-6 lh-base mt-1 fst-italic">
                  {selected_hotel ? selected_hotel.description : data.desc}
                  {selected_hotel
                    ? selected_hotel.hotel_description
                      ? selected_hotel.hotel_description
                      : selected_hotel.description
                      ? selected_hotel.description
                      : data.name
                    : null}
                </p>

                <div
                  className=" my-2"
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#000",
                    marginBottom: "10px",
                  }}
                >
                  <h3 className="my-1">Features:</h3>
                  <ul
                    className="mt-2"
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      listStyle: "none",
                      margin: "0",
                      padding: "0",
                    }}
                  >
                    {Facilities &&
                      Facilities.slice(0, limit).map((feature, i) => (
                        <li
                          key={feature}
                          className=""
                          style={{
                            backgroundColor: "#ffffff",
                            color: "#555",
                            fontSize: "14px",
                            fontWeight: "700",
                            borderRadius: "20px",
                            padding: "10px 20px",
                            marginRight: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>
                {limit < Facilities.length && (
                  <small
                    onClick={handleSeemore}
                    className="my-auto ms-2 fw-bold text-info cursor_pointer"
                  >
                    See More
                  </small>
                )}

                {limit === Facilities.length && (
                  <small
                    onClick={handleSeemore}
                    className="my-auto ms-2 fw-bold text-info cursor_pointer"
                  >
                    See Less
                  </small>
                )}
              </div>

              <div className="hotelDetailsPrice">
                <div className="fw-bold">Property Highlights</div>
                <div className="fw-bold">
                  Perfect for an {selected_hotel.Nights}-night stay!
                </div>
                <div style={{ fontSize: "12px" }}>
                  <ul>
                    <li className="mb-1 d-flex">
                      <LocationOnOutlinedIcon className="me-1" />
                      Top location: Highly rated by recent guests (
                      {selected_hotel.rating})
                    </li>
                    <li className="mb-1 d-flex">
                      <BedIcon className="me-1" />
                      Want a great night's sleep? This hotel was highly-rated
                      for its very comfy beds.
                    </li>
                    <li className="mb-1 d-flex">
                      <Diversity1TwoToneIcon className="me-1" />
                      Top pick by families with children
                    </li>
                  </ul>
                </div>
                <div style={{ fontSize: "12px" }}>
                  <div className="fw-bold mb-1">Breakfast</div>
                  <div className="d-flex">
                    <RestaurantMenuIcon />
                    Info Continental, Buffet
                  </div>
                </div>
                <div style={{ fontSize: "12px" }}>
                  <div className="fw-bold mb-1">Rooms with:</div>
                  <div className="d-flex">
                    <ul>
                      {Facilities.slice(0, 4).map((feature, i) => (
                        <li key={feature} className="me-2">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ fontSize: "12px" }}>
                  <div className="fw-bold mb-1">Loyal Customers</div>
                  <div className="d-flex">
                    <DoneIcon />
                    There are more repeat guests here than most other
                    properties.
                  </div>
                </div>
                <button className="btn btn-primary" onClick={HandleBook}>
                  Reserve for {options.adult} adults,{options.children} children{" "}
                  <small className="fw-light">
                    (for pkr {selected_hotel.Total_Price})
                  </small>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Hotel;
