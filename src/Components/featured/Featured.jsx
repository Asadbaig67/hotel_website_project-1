import { useNavigate } from "react-router-dom";
import style from "./featured.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

const Featured = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { activePath } = useSelector((state) => state.activePath);

  const HandleClick = async (city) => {
    if (activePath === "hotel") {
      try {
        const response = await fetch(
          `http://localhost:5000/hotels/gethotelbycity/${city}`
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
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
        const response = await fetch(
          `http://localhost:5000/hotelandparking/cityhotel/${city}`
        );
        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          dispatch({ type: "SET_FEATURED_DATA", payload: data });
          Navigate("/listhotel");
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(activePath);

  return (
    <div>
      <div className={style.featured}>
        <div className={style.featuredItems}>
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
            alt=""
            className={`${style.featuredImg} ${style.cursor}`}
            onClick={() => HandleClick("Lahore")}
          />
          <div className={style.featuredTitles}>
            <h1 className={style.text_shadow}>Berlin</h1>
            <h2 className={style.text_shadow}>properties</h2>
          </div>
        </div>
        <div className={style.featuredItem}>
          <img
            src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
            alt=""
            className={`${style.featuredImg} ${style.cursor}`}
            onClick={() => HandleClick("Lahore")}
          />
          <div className={style.featuredTitles}>
            <h1 className={style.text_shadow}>Madrid</h1>
            <h2 className={style.text_shadow}>properties</h2>
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
              <h2 className={style.text_shadow}>properties</h2>
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
              <h2 className={style.text_shadow}>properties</h2>
            </div>
          </div>
          <div className={style.featuredItem}>
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className={`featuredImg ${style.cursor}`}
              onClick={() => HandleClick("Japan")}
            />
            <div className={style.featuredTitles}>
              <h1 className={style.text_shadow}>Japan</h1>
              <h2 className={style.text_shadow}>123 properties</h2>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Featured;
