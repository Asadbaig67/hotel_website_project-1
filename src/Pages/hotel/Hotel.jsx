import "./hotel.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/footer/Footer";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosNewIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useState, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BedIcon from "@mui/icons-material/Bed";
import Diversity1TwoToneIcon from "@mui/icons-material/Diversity1TwoTone";
import DoneIcon from "@mui/icons-material/Done";
import { useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";

// import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Hotel = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selected_hotel = JSON.parse(
    decodeURIComponent(searchParams.get("hotel"))
  );
  const options = JSON.parse(decodeURIComponent(searchParams.get("options")));
  const c = searchParams.get("c");
  const dates = JSON.parse(decodeURIComponent(searchParams.get("dates")));
  console.log(c);
  // const { options } = useSelector((state) => state.searchOption);
  // const { c } = useSelector((state) => state.searchVehicle);
  // const { dates } = useSelector((state) => state.searchDate);
  const { success_State } = useSelector((state) => state.successState);
  const { rooms_Array } = useSelector((state) => state.getmodalData);

  const { activePath } = useSelector((state) => state.activePath);
  // const { selected_hotel } = useSelector((state) => state.getSelectedHotel);
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;
  const [option, setOption] = useState(options);

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    setOption({ ...option, [e.target.name]: parseInt(e.target.value) });
    dispatch({
      type: "SET_OPTION",
      payload: {
        ...option,
        [e.target.name]: parseInt(e.target.value),
      },
    });
  };

  let Facilities = [];
  if (selected_hotel.Facilities) {
    Facilities = [...selected_hotel.Facilities];
  }
  let date = new Date();
  const [valueIn, setValueIn] = useState(
    dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  );
  const [valueOut, setValueOut] = useState(
    dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 2}`)
  );

  // const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [singleRoomError, setSingleRoomError] = useState(false);
  const [twinRoomError, setTwinRoomError] = useState(false);
  const [familyRoomError, setFamilyRoomError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehiclesError, setVehiclesError] = useState(false);

  let roomArray = [];
  let singleRoomsArray = [];
  let twinRoomsArray = [];
  let familyRoomsArray = [];

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

  // To handle see more button
  let [limit, setLimit] = useState(6);
  const handleSeemore = () => {
    limit === Facilities.length ? setLimit(6) : setLimit(Facilities.length);
  };

  const Reload = () => {
    setOption({
      adult: 1,
      children: 0,
      singleRoom: 1,
      twinRoom: 0,
      familyRoom: 0,
    });
    dispatch({
      type: "SET_OPTION",
      payload: {
        adult: 1,
        children: 0,
        singleRoom: 1,
        twinRoom: 0,
        familyRoom: 0,
      },
    });
    dispatch({
      type: "SET_DATE",
      payload: [valueIn.format("DD-MM-YYYY"), valueOut.format("DD-MM-YYYY")],
    });
    setSingleRoomError(false);
    setTwinRoomError(false);
    setFamilyRoomError(false);
    dispatch({
      type: "SUCCESS",
      payload: false,
    });
    // setSuccess(false);
    setLoading(false);
    setRooms([]);
  };
  const CancelSelection = () => {
    setOption({
      adult: 1,
      children: 0,
      singleRoom: 1,
      twinRoom: 0,
      familyRoom: 0,
    });
    dispatch({
      type: "SET_OPTION",
      payload: {
        adult: 1,
        children: 0,
        singleRoom: 1,
        twinRoom: 0,
        familyRoom: 0,
      },
    });
    dispatch({
      type: "SET_DATE",
      payload: [],
    });
    setSingleRoomError(false);
    setTwinRoomError(false);
    setFamilyRoomError(false);
    // setSuccess(false);
    dispatch({
      type: "SUCCESS",
      payload: false,
    });
    setLoading(false);
    setRooms([]);
  };

  const HandleBook = () => {
    if (success_State) {
      let updatedHotel = {
        ...selected_hotel,
        Total_Price,
        SingleRoomPrice,
        TwinRoomPrice,
        FamilyRoomPrice,
        Nights: dayjs(valueOut).diff(dayjs(valueIn), "day"),
        roomArray,
        singleRoomsArray,
        ...(activePath === "hotelAndParking" && {
          parking: {
            Total_slots: c,
            Parking_price: parkingPrice,
          },
        }),
        twinRoomsArray,
        familyRoomsArray,
        featured: true,
      };
      dispatch({
        type: "SET_BOOKED_PROPERTY",
        payload: updatedHotel,
      });
    } else {
      dispatch({
        type: "SET_BOOKED_PROPERTY",
        payload: selected_hotel,
      });
      if (activePath === "hotelAndParking") {
        Navigate(
          `/hotelAndParking/hotelAndParkingList/bookingdetails?hotel=${encodeURIComponent(
            JSON.stringify(selected_hotel)
          )}&dates=${encodeURIComponent(
            JSON.stringify(dates)
          )}&options=${encodeURIComponent(JSON.stringify(options))}&c=${c}`
        );
      } else {
        Navigate(
          `/hotel/hotellist/bookingdetails?hotel=${encodeURIComponent(
            JSON.stringify(selected_hotel)
          )}&dates=${encodeURIComponent(
            JSON.stringify(dates)
          )}&options=${encodeURIComponent(JSON.stringify(options))}&c=${c}`
        );
      }
    }
  };

  const CheckConditions = (e) => {
    if ((c === 0 || !c) && activePath === "hotelAndParking") {
      setVehiclesError(true);
      alert("Please add vehicle");
      return;
    }
    if (option.adult === 0 || !option.adult || isNaN(option.adult)) {
      alert("Adults must be greater than 0");
      return;
    }
    if (
      option.singleRoom === 0 &&
      option.twinRoom === 0 &&
      option.familyRoom === 0
    ) {
      alert("Rooms must be greater than 0");
      return;
    }
    if (
      isNaN(option.singleRoom) ||
      isNaN(option.twinRoom) ||
      isNaN(option.familyRoom)
    ) {
      alert("Rooms must be a number");
      return;
    }
    handleRoomsRequest(e);
  };

  const handleRoomsRequest = async (event) => {
    event.preventDefault();
    setLoading(true);
    dispatch({
      type: "SUCCESS",
      payload: false,
    });
    let url;
    if (activePath === "hotelAndParking") {
      url = `${api}/hotelandparking/getHotelAndParkingRooms?checkIn=${valueIn}&checkOut=${valueOut}&id=${selected_hotel._id}`;
    } else {
      url = `${api}/hotels/gethotelrooms?checkIn=${valueIn}&checkOut=${valueOut}&id=${selected_hotel._id}`;
    }
    const options = {
      method: "GET",
    };

    try {
      const response = await fetch(url, options);
      const { rooms } = await response.json();
      console.log("Rooms", rooms);
      setLoading(false);
      setRooms(rooms);
      dispatch({
        type: "SET_MODAL_DATA",
        payload: rooms,
      });
      // setSuccess(true);
      dispatch({
        type: "SUCCESS",
        payload: true,
      });
    } catch (error) {
      // setSuccess(false);
      dispatch({
        type: "SUCCESS",
        payload: false,
      });
      setLoading(false);
      console.log(error);
    }
  };

  let SingleRoomPrice = 0;
  let TwinRoomPrice = 0;
  let FamilyRoomPrice = 0;
  const Total_Price = rooms_Array.reduce((acc, room) => {
    if (room.type === "Single") {
      if (option.singleRoom > 0) {
        SingleRoomPrice = room.price * option.singleRoom;
        return acc + option.singleRoom * room.price;
      }
    }
    if (room.type === "Twin") {
      if (option.twinRoom > 0) {
        TwinRoomPrice = room.price * option.twinRoom;
        return acc + option.twinRoom * room.price;
      }
    }
    if (room.type === "Family") {
      if (option.familyRoom > 0) {
        FamilyRoomPrice = room.price * option.familyRoom;
        return acc + option.familyRoom * room.price;
      }
    }
  }, 0);

  if (success_State) {
    rooms_Array.forEach((room, index) => {
      let obj = {};
      let obj1 = {};
      if (room.type === "Single") {
        if (option.singleRoom > 0) {
          for (let i = 0; i < option.singleRoom; i++) {
            obj = {
              Room_type: room.type,
              RoomId: room.id,
              Room_no: room.rooms_list[i],
              Room_price: room.price,
            };
            obj1 = {
              number: room.rooms_list[i],
            };
            roomArray.push(obj);
            singleRoomsArray.push(obj1);
          }
        }
      }
      if (room.type === "Twin") {
        if (option.twinRoom > 0) {
          for (let i = 0; i < option.twinRoom; i++) {
            obj = {
              Room_type: room.type,
              RoomId: room.id,
              Room_no: room.rooms_list[i],
              Room_price: room.price,
            };
            obj1 = {
              number: room.rooms_list[i],
            };
            roomArray.push(obj);
            twinRoomsArray.push(obj1);
          }
        }
      }
      if (room.type === "Family") {
        if (option.familyRoom > 0) {
          for (let i = 0; i < option.familyRoom; i++) {
            obj = {
              Room_type: room.type,
              RoomId: room.id,
              Room_no: room.rooms_list[i],
              Room_price: room.price,
            };
            obj1 = {
              number: room.rooms_list[i],
            };
            roomArray.push(obj);
            familyRoomsArray.push(obj1);
          }
        }
      }
    });
  }

  const ConfirmSelectedHotel = (e) => {
    e.preventDefault();
    let updatedHotel = {
      ...selected_hotel,
      Total_Price,
      SingleRoomPrice,
      TwinRoomPrice,
      FamilyRoomPrice,
      Nights: dayjs(valueOut).diff(dayjs(valueIn), "day"),
      roomArray,
      singleRoomsArray,
      twinRoomsArray,
      familyRoomsArray,
      featured: true,
    };
    dispatch({
      type: "SET_BOOKED_PROPERTY",
      payload: updatedHotel,
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

  // To set error if rooms are not available
  useEffect(() => {
    if (rooms_Array.length === 0) {
      setSingleRoomError(false);
      setTwinRoomError(false);
      setFamilyRoomError(false);
      return;
    }
    if (option.singleRoom > 0) {
      setSingleRoomError(
        !rooms_Array.some(
          (room) =>
            room.type === "Single" &&
            room.rooms_list.length >= option.singleRoom
        )
      );
    }
    if (option.twinRoom > 0) {
      setTwinRoomError(
        !rooms_Array.some(
          (room) =>
            room.type === "Twin" && room.rooms_list.length >= option.twinRoom
        )
      );
    }
    if (option.familyRoom > 0) {
      setFamilyRoomError(
        !rooms_Array.some(
          (room) =>
            room.type === "Family" &&
            room.rooms_list.length >= option.familyRoom
        )
      );
    }
  }, [rooms_Array]);

  // To set success true/false if error is true/false
  useEffect(() => {
    if (singleRoomError || twinRoomError || familyRoomError) {
      // setSuccess(false);
      dispatch({
        type: "SUCCESS",
        payload: false,
      });
    }
  }, [singleRoomError, twinRoomError, familyRoomError]);

  useEffect(() => {
    if (dates.length === 0) {
      dispatch({
        type: "SUCCESS",
        payload: false,
      });
    }
  }, [dates]);

  useEffect(() => {
    if (dates.length === 0) {
      dispatch({
        type: "SET_MODAL_DATA",
        payload: [],
      });
    }
  }, [dates]);

  useEffect(() => {
    if (c !== "0" && c !== "") {
      setVehiclesError(false);
    }
  }, [c]);

  console.log("Rooms", option.singleRoom, option.twinRoom, option.familyRoom);

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
        <div class="modal-dialog modal-lg ">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                {selected_hotel
                  ? selected_hotel.hotel_name
                    ? selected_hotel.hotel_name
                    : selected_hotel.name
                    ? selected_hotel.name
                    : "Hotel Pod Roza"
                  : "Hotel Pod Roza"}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                onClick={CancelSelection}
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-3 " style={{ backgroundColor: "#fff" }}>
              <div className="row my-1">
                <h2 className="my-2">Enter Check-In Check-Out Dates :</h2>
                <div className="col-md-6 mb-2 col-sm-12">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        className="w-100"
                        label="Check-In Date"
                        value={valueIn}
                        onChange={(newValue) =>
                          dispatch({
                            type: "SET_DATE",
                            payload: [
                              newValue.format("DD-MM-YYYY"),
                              valueOut.format("DD-MM-YYYY"),
                            ],
                          })
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="col-md-6 mb-3 col-sm-12 ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        className="w-100"
                        label="Check-Out Date"
                        value={valueOut}
                        onChange={(newValue) =>
                          dispatch({
                            type: "SET_DATE",
                            payload: [
                              valueIn.format("DD-MM-YYYY"),
                              newValue.format("DD-MM-YYYY"),
                            ],
                          })
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="row my-1">
                <h2 className="my-2">
                  {activePath === "hotelAndParking"
                    ? "Enter No Of Adults,Childrens and Vehicles"
                    : "Enter No Of Adults and Childrens "}
                </h2>
                <div
                  className={` ${
                    activePath === "hotelAndParking" ? "col-md-4" : "col-md-6"
                  } mb-3 col-sm-12`}
                >
                  <TextField
                    id="filled-basic"
                    label="Adults"
                    variant="outlined"
                    value={option.adult}
                    onChange={handleOptionChange}
                    name="adult"
                    type="number"
                    fullWidth
                  />
                </div>
                <div
                  className={`${
                    activePath === "hotelAndParking" ? "col-md-4" : "col-md-6"
                  } mb-3 col-sm-12`}
                >
                  <TextField
                    id="filled-basic"
                    label="Childrens"
                    variant="outlined"
                    value={option.children}
                    onChange={handleOptionChange}
                    name="children"
                    type="number"
                    fullWidth
                  />
                </div>
                {activePath === "hotelAndParking" && (
                  <div
                    className={`${
                      activePath === "hotelAndParking" ? "col-md-4" : "col-md-6"
                    } mb-3 col-sm-12`}
                  >
                    <TextField
                      id="filled-basic"
                      label="Vehicles"
                      variant="outlined"
                      name="vehicle"
                      value={c}
                      error={vehiclesError}
                      helperText={vehiclesError && "Please add vehicle"}
                      onChange={(e) =>
                        dispatch({
                          type: "INCREMENT",
                          payload: e.target.value,
                        })
                      }
                      type="number"
                      fullWidth
                    />
                  </div>
                )}
              </div>
              <div className="row my-1">
                <h2 className="my-2">Add Rooms Quantity :</h2>
                <div className="col-md-4 mb-3 col-sm-12">
                  <TextField
                    id="filled-basic"
                    label="Single Room"
                    value={option.singleRoom}
                    onChange={handleOptionChange}
                    variant="outlined"
                    name="singleRoom"
                    error={singleRoomError}
                    helperText={singleRoomError && "No Single Room Available"}
                    disabled={singleRoomError}
                    type="number"
                    fullWidth
                  />
                </div>
                <div className="col-md-4 mb-3 col-sm-12">
                  <TextField
                    id="filled-basic"
                    label="Twin Room"
                    value={option.twinRoom}
                    onChange={handleOptionChange}
                    variant="outlined"
                    name="twinRoom"
                    error={twinRoomError}
                    helperText={twinRoomError && "No Twin Room Available"}
                    disabled={twinRoomError}
                    type="number"
                    fullWidth
                  />
                </div>
                <div className="col-md-4 mb-3 col-sm-12">
                  <TextField
                    id="filled-basic"
                    label="Family Room"
                    variant="outlined"
                    value={option.familyRoom}
                    onChange={handleOptionChange}
                    name="familyRoom"
                    error={familyRoomError}
                    helperText={familyRoomError && "No Family Room Available"}
                    disabled={familyRoomError}
                    type="number"
                    fullWidth
                  />
                </div>
              </div>
              {(singleRoomError || twinRoomError || familyRoomError) && (
                <>
                  <div className="row my-1">
                    <small className="text-dnager">
                      If you want to select other room types and proceed.
                    </small>
                  </div>
                  <div className="row ">
                    <div className="col-md-2">
                      <button
                        className="btn btn-success btn-sm rounded-8"
                        onClick={Reload}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </>
              )}
              {success_State && (
                <>
                  <div className="row my-1">
                    <span className="fs-3 text-warning">Note!</span>
                    <small className="text-dnager">
                      The rooms you requested are availble for booking.If you
                      want to process this booking please click{" "}
                      <span className="fst-italic fw-bold">
                        Proceed Booking{" "}
                      </span>
                      button Below.
                    </small>
                    <small className="text-dnager">
                      If you want to select other room types and proceed.Click
                      <span className="fst-italic fw-bold">
                        Try Again{" "}
                      </span>{" "}
                      button Below.
                    </small>
                  </div>
                  <div className="row ">
                    <div className="col-md-2">
                      <button
                        className="btn btn-secondary btn-sm rounded-8"
                        onClick={Reload}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div class="modal-footer">
              {loading && (
                <>
                  <CircularProgress />
                </>
              )}
              {!success_State && !loading && (
                <button
                  type="button"
                  // onClick={RequestRooms}
                  onClick={CheckConditions}
                  class="btn btn-lg btn-secondary"
                  disabled={singleRoomError || twinRoomError || familyRoomError}
                >
                  Confirm Booking
                </button>
              )}
              {success_State && (
                <button
                  type="button"
                  class="btn btn-success btn-lg"
                  data-bs-dismiss="modal"
                  onClick={ConfirmSelectedHotel}
                >
                  Proceed Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
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
                        : "Hotel Pod Roza"
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
                          : "Dubai"
                        : "Dubai"}
                    </span>
                    <span className="text-primary fw-bold">
                      {selected_hotel
                        ? selected_hotel.hotel_city
                          ? selected_hotel.hotel_city
                          : selected_hotel.city
                          ? selected_hotel.city
                          : "Dubai"
                        : "Dubai"}
                    </span>
                  </div>
                  <span className="hotelDistance my-1">
                    Excellent location – 30m from center
                  </span>
                  <span className="hotelPriceHighlight d-block my-1">
                    Book a stay over $30 at this property and get a free airport
                    taxi
                  </span>
                </div>
                <div className="col-md-3 col-sm-6 col-12 text-start mt-1">
                  {dates.length === 0 ? (
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={Reload}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Select Dates and Rooms
                    </button>
                  ) : (
                    <button
                      className={`btn btn-primary ${
                        isXtraSmallScreen ? "my-1" : ""
                      }`}
                      onClick={HandleBook}
                      disabled={dates.length === 0}
                    >
                      Reserve or Book Now!
                    </button>
                  )}
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
                            Family Room Price = $
                            {selected_hotel.FamilyRoomPrice}
                          </small>
                        ) : null}

                        {selected_hotel.StandardPrice &&
                          !success_State &&
                          selected_hotel.StandardPrice !== 0 && (
                            <small>
                              Standard Price = ${selected_hotel.StandardPrice}
                            </small>
                          )}
                        {success_State && SingleRoomPrice > 0 ? (
                          <small>Single Room Price = ${SingleRoomPrice}</small>
                        ) : (
                          ""
                        )}
                        {success_State && TwinRoomPrice > 0 ? (
                          <small>Twin Room Price = ${TwinRoomPrice}</small>
                        ) : (
                          ""
                        )}
                        {success_State && FamilyRoomPrice > 0 ? (
                          <small>Single Room Price = ${FamilyRoomPrice}</small>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`col-md-4 ${isXtraSmallScreen ? "mt-0" : ""}`}
                  >
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

                        {selected_hotel.StandardPrice && !success_State && (
                          <small>
                            Total Price = ${selected_hotel.StandardPrice + 220}
                          </small>
                        )}
                        {success_State && (
                          <small>Total Price = ${Total_Price + 220}</small>
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
                      {dates.length === 0 ? (
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={Reload}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Select Dates and Rooms
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-block mt-3 mb-2"
                          onClick={HandleBook}
                          disabled={dates.length === 0}
                        >
                          Reserve your selection
                        </button>
                      )}

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
                        : "Hotel Pod Roza"
                      : null}
                  </h1>
                  <p className="fw-lighter  fs-6 lh-base mt-1 fst-italic">
                    {/* {selected_hotel ? selected_hotel.description : ""} */}
                    {selected_hotel
                      ? selected_hotel.hotel_description
                        ? selected_hotel.hotel_description
                        : selected_hotel.description
                        ? selected_hotel.description
                        : "Hotel Pod Roza"
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

                  {dates.length === 0 ? (
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={Reload}
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Select Dates and Rooms
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      disabled={dates.length === 0}
                      onClick={HandleBook}
                    >
                      Reserve for {options.adult} adults,{options.children}{" "}
                      children{" "}
                      <small className="fw-light">
                        (for pkr{" "}
                        {selected_hotel.Total_Price
                          ? selected_hotel.Total_Price
                          : Total_Price}
                        )
                      </small>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Hotel;
