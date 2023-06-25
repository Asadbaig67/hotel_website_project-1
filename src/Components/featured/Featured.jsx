import { useNavigate } from "react-router-dom";
import style from "./featured.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";

const Featured = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { cityCount } = useSelector((state) => state.featuredCityCount);
  const cityCountObj = {
    Lahore: cityCount.lahore,
    Islamabad: cityCount.islamabad,
    London: cityCount.london,
    Sydney: cityCount.sydney,
    Dubai: cityCount.dubai,
  };

  const { activePath } = useSelector((state) => state.activePath);

  const IsLargeScreen = useMediaQuery("(min-width:1100px)");

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const getCityCount = async (city) => {
    try {
      const response = await axios.get(
        `${api}/hotels/getcountofapprovedhotelbycity/${city}`
      );
      if (response.status === 200) {
        return response.data.count;
      }
      return 0;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const data = async () => {
      const lahoreCount = await getCityCount("Lahore");
      const islamabadCount = await getCityCount("Islamabad");
      const londonCount = await getCityCount("London");
      const sydneyCount = await getCityCount("Sydney");
      const dubaiCount = await getCityCount("Dubai");
      dispatch({
        type: "FEATURED_CITY_COUNT",
        payload: {
          lahore: lahoreCount,
          islamabad: islamabadCount,
          london: londonCount,
          sydney: sydneyCount,
          dubai: dubaiCount,
        },
      });
    };
    data();
  }, []);

  const HandleClick = async (city) => {
    if (activePath === "hotel") {
      try {
        dispatch({ type: "SET_HOTEL_DATA", payload: [] });
        const response = await fetch(
          `${api}/hotels/gethotelbycity/${city}`
        );
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "SET_FEATURED_DATA", payload: data });

          Navigate("/listhotel");
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    } else if (activePath === "hotelAndParking") {
      try {
        dispatch({ type: "SET_HOTEL_DATA", payload: [] });
        const response = await fetch(
          `${api}/hotelandparking/cityhotel/${city}`
        );
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: "SET_FEATURED_DATA", payload: data });

          Navigate("/HotelAndParkingList");
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className={`container ${IsLargeScreen ? "ms-5" : ""} `}>
      <div className={`${style.featured} `}>
        <div className={style.featuredItems}>
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
            alt=""
            className={`${style.featuredImg} ${style.cursor}`}
            onClick={() => HandleClick("Lahore")}
          />
          <div className={style.featuredTitles}>
            <h1 className={style.text_shadow}>Lahore</h1>
            <h2 className={style.text_shadow}>
              {cityCountObj.Lahore} properties
            </h2>
          </div>
        </div>
        <div className={style.featuredItem}>
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
            alt=""
            className={`${style.featuredImg} ${style.cursor}`}
            onClick={() => HandleClick("Islamabad")}
          />
          <div className={style.featuredTitles}>
            <h1 className={style.text_shadow}>Islamabad</h1>
            <h2 className={style.text_shadow}>
              {cityCountObj.Islamabad} properties
            </h2>
          </div>
        </div>
      </div>
      <div className={style.featured}>
        <>
          <div className={style.featuredItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className={`${style.featuredImg} ${style.cursor}`}
              onClick={() => HandleClick("London")}
            />
            <div className={style.featuredTitles}>
              <h1 className={style.text_shadow}>London</h1>
              <h2 className={style.text_shadow}>
                {cityCountObj.London} properties
              </h2>
            </div>
          </div>

          <div className={style.featuredItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className={`featuredImg ${style.cursor}`}
              onClick={() => HandleClick("Sydney")}
            />
            <div className={style.featuredTitles}>
              <h1 className={style.text_shadow}>Sydney</h1>
              <h2 className={style.text_shadow}>
                {cityCountObj.Sydney} properties
              </h2>
            </div>
          </div>
          <div className={style.featuredItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className={`featuredImg ${style.cursor}`}
              onClick={() => HandleClick("Dubai")}
            />
            <div className={style.featuredTitles}>
              <h1 className={style.text_shadow}>Dubai</h1>
              <h2 className={style.text_shadow}>
                {cityCountObj.Dubai} properties
              </h2>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Featured;
