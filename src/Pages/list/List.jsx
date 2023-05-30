import style from "./list.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useEffect, useState, useMemo } from "react";
import Card from "../../Components/Card/Card";
import Dates from "../../Components/date/Date";
import Footer from "../../Components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Dropdown from "../../Components/dropdown/Dropdown";

const List = () => {
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.searchCity);
  const { dates } = useSelector((state) => state.searchDate);
  const { options } = useSelector((state) => state.searchOption);
  const { c } = useSelector((state) => state.searchVehicle);

  const { adult, children, familyroom, singleroom, twinroom } = options;
  const checkin = dates[0];
  const checkout = dates[1];

  const { activePath } = useSelector((state) => state.activePath);

  if (window.scroll(0, 0)) {
    document.body.style.width = "100vw";
  }
  // For Hotel and parking
  // Getting City For Hotel and Parking
  const { cityHotelAndParking } = useSelector(
    (state) => state.searchHotelAndParkingCity
  );

  // Getting Static Data For Hotel and parking
  const { hotel_parking_data } = useSelector(
    (state) => state.getStaicHotalParking
  );

  // Checking City For Hotel and parking
  const checkHotelParkingCity = (hotel_parking_data) => {
    return (
      hotel_parking_data.hotel_city.toLowerCase() ===
      cityHotelAndParking.toLowerCase()
    );
  };
  // Filtering Data For Hotel and `parking
  let filtered_hotel_parking = [];
  if (hotel_parking_data) {
    filtered_hotel_parking = hotel_parking_data.filter(checkHotelParkingCity);
  }
  // For Hotel and parking

  const [option, setOption] = useState(options);
  const [openDate, setOpenDate] = useState(false);
  // const [min, setMin] = useState(undefined);
  // const [max, setMax] = useState(undefined);

  // const checkCity = (hotel_data) => {
  //   return hotel_data.city.toLowerCase() === city.toLowerCase();
  // };

  // let filtered_data = [];
  // if (hotel_data) {
  //   filtered_data = hotel_data.filter(checkCity);
  // }

  const handleClick = () => {
    // reFetch();
    activePath === "hotel" ? getHotels() : getHotelAndParking();
  };

  const getHotels = async () => {
    try {
      dispatch({ type: "SET_FEATURED_DATA", payload: [] });
      const url = `http://localhost:5000/hotels/search?city=${city}&checkIn=${checkin}&checkOut=${checkout}&adult=${adult}&children=${children}&singleRoom=${singleroom}&twinRoom=${twinroom}&familyRoom=${familyroom}`;
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
      dispatch({ type: "SET_FEATURED_DATA", payload: [] });
      // const url = `http://localhost:5000/hotelandparking/search?city=${cityHotelAndParking}&checkIn=2023-03-11T00:00:00.000Z&checkOut=2023-03-14T00:00:00.000Z&adult=4&children=2&singleRoom=1&twinRoom=1&familyRoom=1&vehicle=5`;
      const url = `http://localhost:5000/hotelandparking/search?city=${cityHotelAndParking}&checkIn=${checkin}&checkOut=${checkout}&adult=${adult}&children=${children}&singleRoom=${singleroom}&twinRoom=${twinroom}&familyRoom=${familyroom}&vehicles=${c}`;
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
  const rating = [1, 2, 3, 4, 5];
  let selectedRatings = [];

  const handleOnChangeRating = (e) => {
    const rating = parseInt(e.target.value);
    if (selectedRatings.includes(rating)) {
      selectedRatings = selectedRatings.filter((item) => item !== rating);
    } else {
      selectedRatings.push(rating);
    }

    console.log(selectedRatings);

    if (selectedRatings.length === 0) {
      setDataList(hotelData);
    } else {
      let filter = hotelData.filter((item) =>
        selectedRatings.includes(item.hotel.rating)
      );
      setDataList(filter);
    }
  };

  // useEffect(() => {
  //   const filteredData = () => {
  //     console.log(selectedRatings);
  //     if (selectedRatings.length === 0) {
  //       setDataList(hotelData);
  //     } else {
  //       const filter = hotelData.filter((item) =>
  //         selectedRatings.includes(item.rating)
  //       );
  //       setDataList(filter);
  //     }
  //   };
  //   filteredData();
  // }, [selectedRatings, dataList]);
  console.log(featured_hotel);

  useEffect(() => {
    if (activePath === "hotel" && featured_hotel.length === 0) {
      getHotels();
    }
    if (activePath === "hotelAndParking" && featured_hotel.length === 0) {
      getHotelAndParking();
    }
  }, [activePath]);

  return (
    <div className="container-fluid w-100">
      <Navbar list={false} className="w-100" />
      <div className={`${style.listContainer}`}>
        <div className={`row justify-content-around ${style.listWrapper}`}>
          <div className="col-3">
            <div className={`${style.listSearch}`}>
              <h1 className={style.lsTitle}>Search</h1>
              <div className={style.lsItem}>
                <label style={{ color: "white" }}>Destination</label>
                {/* <input
                  placeholder={city === "" ? cityHotelAndParking : city}
                  type="text"
                  onChange={(e) =>
                    dispatch({ type: "SET_CITY", payload: e.target.value })
                  }
                /> */}
                <Dropdown name="cityHotel" />
              </div>
              <div className={style.lsItem}>
                <label style={{ color: "white" }}>Check-in Date</label>
                <span
                  style={{ fontSize: "15px" }}
                  onClick={() => setOpenDate(!openDate)}
                >
                  {dates[0] ? `${dates[0]} to ${dates[1]}` : null}
                </span>
                {openDate && <Dates />}
              </div>
              <div className={style.lsItem}>
                <label style={{ color: "white" }}>Options</label>
                <div className={style.lsOptions}>
                  {/* <div className={style.lsOptionItem}>
                    <span className={style.lsOptionText}>
                      Min price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMin(e.target.value)}
                      className={style.lsOptionInput}
                    />
                  </div>
                  <div className={style.lsOptionItem}>
                    <span className={style.lsOptionText}>
                      Max price <small>per night</small>
                    </span>
                    <input
                      type="number"
                      onChange={(e) => setMax(e.target.value)}
                      className={style.lsOptionInput}
                    />
                  </div> */}
                  <div className={style.lsOptionItem}>
                    <span className={style.lsOptionText}>Adult</span>
                    <input
                      type="number"
                      min={1}
                      className={style.lsOptionInput}
                      placeholder={option.adult}
                      onChange={(e) =>
                        e.target.value < 1 || e.target.value === ""
                          ? dispatch({
                              type: "SET_OPTION",
                              payload: { ...options, adult: 1 },
                            })
                          : dispatch({
                              type: "SET_OPTION",
                              payload: { ...options, adult: e.target.value },
                            })
                      }
                    />
                  </div>
                  <div className={style.lsOptionItem}>
                    <span className={style.lsOptionText}>Children</span>
                    <input
                      type="number"
                      min={0}
                      className={style.lsOptionInput}
                      placeholder={options.children}
                      onChange={(e) =>
                        e.target.value < 1 || e.target.value === ""
                          ? dispatch({
                              type: "SET_OPTION",
                              payload: { ...options, children: 1 },
                            })
                          : dispatch({
                              type: "SET_OPTION",
                              payload: { ...options, adult: e.target.value },
                            })
                      }
                    />
                  </div>
                  <div className={style.lsOptionItem}>
                    <span className={style.lsOptionText}>Room</span>
                    <input
                      type="number"
                      min={1}
                      className={style.lsOptionInput}
                      placeholder={
                        options.singleRoom +
                        options.twinRoom +
                        options.familyRoom
                      }
                      onChange={(e) =>
                        e.target.value < 1 || e.target.value === ""
                          ? dispatch({
                              type: "SET_OPTION",
                              payload: { ...options, SingleRoom: 1 },
                            })
                          : dispatch({
                              type: "SET_OPTION",
                              payload: { ...options, room: e.target.value },
                            })
                      }
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-primary " onClick={handleClick}>
                Search
              </button>
            </div>
            {/* <div className="border border-dark mt-5">
              <h1
                className={`border border-dark border-top-0 border-start-0 border-end-0 ${style.filterTitle}`}
              >
                Filter
              </h1>
              <div className="row">
                <div className="col-12">
                  <div
                    className={`border border-dark border-top-0 border-start-0 border-end-0 ${style.filterItem}`}
                  >
                    <h3 className={style.filterItemTitle}>Rating</h3>
                    {rating.map((item) => {
                      return (
                        <div className="form-check" key={item}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value={item}
                            id={`flexCheckRating5${item}`}
                            onChange={handleOnChangeRating}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexCheckRating5${item}`}
                          >
                            {item} Stars
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  <div className={style.filterItem}>
                    <h3 className={style.filterItemTitle}>Price</h3>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioPrice"
                        id="flexRadioDefault6"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault6"
                      >
                        Min to Max
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioPrice"
                        id="flexRadioDefault7"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault7"
                      >
                        Max to Min
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className={`col-8 ${style.listResult}`}>
            {activePath === "hotel" &&
              featured_hotel.length === 0 &&
              dataList.length === 0 && <Loader />}
            {activePath === "hotelAndParking" &&
              dataList.length === 0 &&
              featured_hotel.length === 0 && <Loader />}
            {activePath === "hotel" && featured_hotel.length > 0 && (
              <>
                {featured_hotel.map((item) => (
                  <Card item={item} activePath={activePath} key={item._id} />
                ))}
              </>
            )}
            {activePath === "hotel" && dataList.length > 0 && (
              <>
                {dataList.map((item) => (
                  <Card item={item} key={item._id} />
                ))}
              </>
            )}
            {activePath === "hotelAndParking" && featured_hotel.length > 0 && (
              <>
                {featured_hotel.map((item) => (
                  <Card item={item} activePath={activePath} key={item._id} />
                ))}
              </>
            )}
            {activePath === "hotelAndParking" && dataList.length > 0 && (
              <>
                {/* {dispatch({ type: "SET_FEATURED_DATA", payload: [] })} */}
                {dataList.map((item) => (
                  <Card item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default List;
