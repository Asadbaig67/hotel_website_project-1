import style from "./list.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import Dates from "../../Components/date/Date";
import Footer from "../../Components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/dropdown/Dropdown";
import PageNotFound from "../../Components/No Data Page/PageNotFound";
import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import RoomsDropdown from "../../Components/RoomsDropdown/RoomDropdown";
import SearchBar from "../../Components/SearchBar/SearchBar";

const List = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const Navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const city = searchParams.get("city");
  const dates = JSON.parse(decodeURIComponent(searchParams.get("dates")));
  const options = JSON.parse(decodeURIComponent(searchParams.get("option")));
  const c = JSON.parse(decodeURIComponent(searchParams.get("c")));
  const propertyType = searchParams.get("propertyType");
  const citySearch = useSelector((state) => state.searchCity.city);
  const date = useSelector((state) => state.searchDate.dates);
  const optionRoom = useSelector((state) => state.searchOption.options);
  const no_of_vehicles = useSelector((state) => state.searchVehicle.c);

  const { adult, children, familyRoom, singleRoom, twinRoom } = options;
  let checkin, checkout;
  if (dates) {
    checkin = dates[0];
    checkout = dates[1];
  }
  const [option, setOption] = useState(options);
  const { activePath } = useSelector((state) => state.activePath);
  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const { cityHotelAndParking } = useSelector(
    (state) => state.searchHotelAndParkingCity
  );

  // Checking City For Hotel and parking
  const checkHotelParkingCity = (hotel_parking_data) => {
    return hotel_parking_data.hotel_city.toLowerCase() === city.toLowerCase();
  };
  // Filtering Data For Hotel and `parking
  // let filtered_hotel_parking = [];
  // if (hotel_parking_data) {
  //   filtered_hotel_parking = hotel_parking_data.filter(checkHotelParkingCity);
  // }
  // For Hotel and parking
  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  const [openDate, setOpenDate] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);

  const handleClick = () => {
    dispatch({ type: "SET_OPTION", payload: option });
    dispatch({ type: "SET_HOTEL_DATA", payload: [] });
    dispatch({ type: "SET_FEATURED_DATA", payload: [] });
    if (activePath === "hotel") {
      Navigate(
        `/hotel/hotellist?city=${citySearch}&dates=${encodeURIComponent(
          JSON.stringify(date)
        )}&option=${encodeURIComponent(JSON.stringify(option))}`
      );
    } else {
      Navigate(
        `/HotelAndParking/HotelAndParkingList?city=${cityHotelAndParking}&dates=${encodeURIComponent(
          JSON.stringify(date)
        )}&option=${encodeURIComponent(JSON.stringify(option))}&c=${no_of_vehicles}`
      );
    }
  };

  const getHotels = async () => {
    try {
      dispatch({ type: "SET_HOTEL_DATA", payload: [] });
      dispatch({ type: "SET_FEATURED_DATA", payload: [] });
      const url = `${api}/hotels/search?city=${city}&checkIn=${checkin}&checkOut=${checkout}&adult=${adult}&children=${children}&singleRoom=${singleRoom}&twinRoom=${twinRoom}&familyRoom=${familyRoom}`;
      const response = await fetch(url, {
        method: "GET",
        // credentials: "include",
      });
      // const hoteldata = await axios.get(url);
      const hoteldata = await response.json();
      dispatch({ type: "SET_HOTEL_DATA", payload: hoteldata });
    } catch (error) {
      console.log("You get The Error ", error);
    }
  };
  const getHotelAndParking = async () => {
    try {
      dispatch({ type: "SET_HOTEL_DATA", payload: [] });
      dispatch({ type: "SET_FEATURED_DATA", payload: [] });
      // const url = `${api}/hotelandparking/search?city=${cityHotelAndParking}&checkIn=2023-03-11T00:00:00.000Z&checkOut=2023-03-14T00:00:00.000Z&adult=4&children=2&singleRoom=1&twinRoom=1&familyRoom=1&vehicle=5`;
      const url = `${api}/hotelandparking/search?city=${city}&checkIn=${checkin}&checkOut=${checkout}&adult=${adult}&children=${children}&singleRoom=${singleRoom}&twinRoom=${twinRoom}&familyRoom=${familyRoom}&vehicles=${c}`;
      const response = await fetch(url, {
        method: "GET",
        // credentials: "include",
      });
      const hotelparkingdata = await response.json();
      dispatch({ type: "SET_HOTEL_DATA", payload: hotelparkingdata });
    } catch (error) {
      console.log("You get The Error ", error);
    }
  };

  const { hotelData } = useSelector((state) => state.getHotelsfrombackend);
  const { featured_hotel } = useSelector((state) => state.getfeaturedhotel);

  const [dataList, setDataList] = useState(hotelData);
  let selectedRatings = [];

  const handleOnChangeRating = (e) => {
    const rating = parseInt(e.target.value);
    if (selectedRatings.includes(rating)) {
      selectedRatings = selectedRatings.filter((item) => item !== rating);
    } else {
      selectedRatings.push(rating);
    }

    if (selectedRatings.length === 0) {
      setDataList(hotelData);
    } else {
      let filter = hotelData.filter((item) =>
        selectedRatings.includes(item.hotel.rating)
      );
      setDataList(filter);
    }
  };

  useEffect(() => {
    const featuredProperty = async (city) => {
      if (
        propertyType === "featuredHotel" ||
        propertyType === "featuredHotelAndParking"
      ) {
        if (activePath === "hotel") {
          try {
            dispatch({ type: "SET_FEATURED_DATA", payload: [] });
            dispatch({ type: "SET_HOTEL_DATA", payload: [] });
            const response = await fetch(
              `${api}/hotels/gethotelbycity/${city}`
            );
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              dispatch({ type: "SET_FEATURED_DATA", payload: data });
            } else {
              throw new Error("Request failed");
            }
          } catch (error) {
            console.error(error);
          }
        } else if (activePath === "hotelAndParking") {
          try {
            dispatch({ type: "SET_FEATURED_DATA", payload: [] });
            dispatch({ type: "SET_HOTEL_DATA", payload: [] });
            const response = await fetch(
              `${api}/hotelandparking/cityhotel/${city}`
            );
            if (response.ok) {
              const data = await response.json();
              console.log(data);
              dispatch({ type: "SET_FEATURED_DATA", payload: data });
            } else {
              throw new Error("Request failed");
            }
          } catch (error) {
            console.error(error);
          }
        }
      }
    };
    featuredProperty(city);
  }, [propertyType]);

  useEffect(() => {
    if (activePath === "hotel" && featured_hotel.length === 0) {
      getHotels();
    }
    if (activePath === "hotelAndParking" && featured_hotel.length === 0) {
      getHotelAndParking();
    }
  }, [location.search]);

  return (
    <div className="container-fluid w-100">
      <Navbar list={false} className="w-100" />
      <div className={`${style.listContainer}`}>
        <div className={`row justify-content-around ${style.listWrapper}`}>
          <div className={`col-3 ${style.sideSection} `}>
            <div className={`${style.listSearch}`}>
              <h1 className={`${style.lsTitle} fw-bold text-center fs-4`}>
                Search
              </h1>
              <div className={`${style.lsItem}`}>
                <label className={`${style.lsLabel}`}>Destination</label>
                <div className="bg-white p-1 rounded-4">
                  <Dropdown
                    name={`${
                      activePath === "hotel"
                        ? "cityHotel"
                        : "cityHotelAndparking"
                    }`}
                  />
                </div>
              </div>
              <div className={`${style.lsItem}`}>
                <label className={`${style.lsLabel}`}>Check-in Date</label>

                <div className="bg-white p-1 rounded-4">{<Dates />}</div>
              </div>
              <div className={`${style.lsItem}`}>
                <label className={`${style.lsLabel}`}>Options</label>
                <div className={`${style.lsOptions}`}>
                  <div className={`${style.lsOptionItem}`}>
                    <span className={`${style.lsOptionText}`}>Adult</span>
                    <input
                      type="number"
                      value={option.adult}
                      onChange={(e) => {
                        setOption({ ...option, adult: e.target.value });
                      }}
                    />
                  </div>
                  <div className={`${style.lsOptionItem}`}>
                    <span className={`${style.lsOptionText}`}>Children</span>
                    <input
                      type="number"
                      value={option.children}
                      onChange={(e) => {
                        setOption({ ...option, children: e.target.value });
                      }}
                    />
                  </div>
                  <div className={`${style.lsOptionItem}`}>
                    <span className={`${style.lsOptionText}`}>Single Room</span>
                    <input
                      type="number"
                      value={option.singleRoom}
                      onChange={(e) => {
                        setOption({ ...option, singleRoom: e.target.value });
                      }}
                    />
                  </div>
                  <div className={`${style.lsOptionItem}`}>
                    <span className={`${style.lsOptionText}`}>Twin Room</span>
                    <input
                      type="number"
                      value={option.twinRoom}
                      onChange={(e) => {
                        setOption({ ...option, twinRoom: e.target.value });
                      }}
                    />
                  </div>
                  <div className={`${style.lsOptionItem}`}>
                    <span className={`${style.lsOptionText}`}>Family Room</span>
                    <input
                      type="number"
                      value={option.familyRoom}
                      onChange={(e) => {
                        setOption({ ...option, familyRoom: e.target.value });
                      }}
                    />
                  </div>
                  {activePath === "hotelAndParking" && (
                    <div className={`${style.lsOptionItem}`}>
                      <span className={`${style.lsOptionText}`}>
                        No of Vehicles
                      </span>
                      <input
                        type="number"
                        value={c}
                        name="vehicle"
                        onChange={(e) =>
                          dispatch({
                            type: "INCREMENT",
                            payload: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <button className="btn btn-secondary" onClick={handleClick}>
                Search
              </button>
            </div>
          </div>
          <div className={`col-8 ${style.listResult}`}>
            {activePath === "hotel" &&
              featured_hotel.length === 0 &&
              hotelData.length === 0 && <Loader />}
            {activePath === "hotelAndParking" &&
              hotelData.length === 0 &&
              featured_hotel.length === 0 && <Loader />}

            {activePath === "hotel" &&
            featured_hotel.message === "No Hotel Found" ? (
              <PageNotFound />
            ) : (
              activePath === "hotel" &&
              featured_hotel.length > 0 && (
                <>
                  <span className="fs-6 mb-2 border badge rounded-pill text-bg-light">
                    <span className="text-warning">{city} </span>:{" "}
                    {featured_hotel.length} properties found
                  </span>
                  {featured_hotel.map((item) => (
                    <Card
                      item={item}
                      key={item._id}
                      options={options}
                      dates={dates}
                    />
                  ))}
                </>
              )
            )}
            {activePath === "hotel" &&
            hotelData.message === "No Hotel Found" ? (
              <PageNotFound />
            ) : (
              activePath === "hotel" &&
              hotelData.length > 0 && (
                <>
                  <span className="fs-6 mb-2 border badge rounded-pill text-bg-light">
                    <span className="text-warning">{city} </span>:{" "}
                    {hotelData.length} properties found
                  </span>
                  <SearchBar options={options} />
                  {hotelData.map((item) => (
                    <Card
                      item={item}
                      key={item._id}
                      options={options}
                      dates={dates}
                    />
                  ))}
                </>
              )
            )}
            {activePath === "hotelAndParking" &&
            featured_hotel.message === "No Hotel Found" ? (
              <PageNotFound />
            ) : (
              activePath === "hotelAndParking" &&
              featured_hotel.length > 0 && (
                <>
                  <span className="fs-6 mb-2 border badge rounded-pill text-bg-light">
                    <span className="text-warning">{city} </span>:{" "}
                    {featured_hotel.length} properties found
                  </span>
                  {featured_hotel.map((item) => (
                    <Card
                      item={item}
                      key={item._id}
                      options={options}
                      dates={dates}
                      c={c}
                    />
                  ))}
                </>
              )
            )}
            {activePath === "hotelAndParking" &&
            hotelData.message === "No hotels found" ? (
              <PageNotFound />
            ) : (
              activePath === "hotelAndParking" &&
              hotelData.length > 0 && (
                <>
                  <span className="fs-6 mb-2 border badge rounded-pill text-bg-light">
                    <span className="text-warning">{city} </span>:{" "}
                    {hotelData.length} properties found
                  </span>
                  {hotelData.map((item) => (
                    <Card
                      item={item}
                      key={item._id}
                      options={options}
                      dates={dates}
                      c={c}
                    />
                  ))}
                </>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
