import style from "./featuredProperties.module.css";
import hotel1 from "../../images/hotelPic1.jpg";
import hotel2 from "../../images/hotelPic2.jpg";
import hotel3 from "../../images/hotelPic3.jpg";
import hotel4 from "../../images/hotelPic4.jpg";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const FeaturedProperties = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const isXtraSmallScreen = useMediaQuery("(max-width: 450px)");
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

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  return (
    <>
      <div className={`container-fluid ${style.fp}`}>
        <div className="row">
          <div className={`col-lg-3 col-md-6 col-sm-6 col-12 my-2 `}>
            <img src={hotel1} alt="" className={` ${style.fpImg} rounded-2`} />
            <h5 className={`${style.fpName} mt-2`}>Luxury Properties</h5>
            <div className="d-flex justify-content-start align-items-center">
              <Rating
                name="hover-feedback"
                value={4}
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <small className={`${style.fpCity} ms-2 mb-2 text-muted`}>
                Las Vegas
              </small>
            </div>

            <small className={`${style.fpPrice}`}>
              La Maison d'Eté is set in Poste Lafayette on the...
            </small>
            <div className={style.fpRating}>
              <button
                className={`btn btn-primary mt-2 ${
                  isXtraSmallScreen ? "btn-sm" : "btn-md"
                } btn-block`}
                onClick={() => HandleClick("Lahore")}
              >
                Explore Property
              </button>
            </div>
          </div>
          <div className={`col-lg-3 col-md-6 col-sm-6 col-12 my-2 `}>
            <img src={hotel2} alt="" className={` ${style.fpImg} rounded-2`} />
            <h5 className={`${style.fpName} mt-2`}>Resorts</h5>
            <div className="d-flex justify-content-start align-items-center">
              <Rating
                name="hover-feedback"
                value={4}
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <small className={`${style.fpCity} ms-2 mb-2 text-muted`}>
                California
              </small>
            </div>
            <small className={`${style.fpPrice}`}>
              La Maison d'Eté is set in Poste Lafayette on the...
            </small>
            <div className={style.fpRating}>
              <button
                className={`btn btn-primary mt-2 ${
                  isXtraSmallScreen ? "btn-sm" : "btn-md"
                } btn-block`}
                onClick={() => HandleClick("Lahore")}
              >
                Explore Property
              </button>
            </div>
          </div>
          <div className={`col-lg-3 col-md-6 col-sm-6 col-12  my-2`}>
            <img src={hotel3} alt="" className={` ${style.fpImg} rounded-2`} />
            <h5 className={`${style.fpName} mt-2`}>Luxury Hotels</h5>
            <div className="d-flex justify-content-start align-items-center">
              <Rating
                name="hover-feedback"
                value={4}
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <small className={`${style.fpCity} ms-2 mb-2 text-muted`}>
                Maldives
              </small>
            </div>
            <small className={`${style.fpPrice}`}>
              La Maison d'Eté is set in Poste Lafayette on the...
            </small>
            <div className={style.fpRating}>
              <button
                className={`btn btn-primary mt-2 ${
                  isXtraSmallScreen ? "btn-sm" : "btn-md"
                } btn-block`}
                onClick={() => HandleClick("Lahore")}
              >
                Explore Property
              </button>
            </div>
          </div>
          <div className={`col-lg-3 col-md-6 col-sm-6 col-12 my-2 `}>
            <img src={hotel4} alt="" className={` ${style.fpImg} rounded-2`} />
            <h5 className={`${style.fpName} mt-2`}>Elite Places</h5>
            <div className="d-flex justify-content-start align-items-center">
              <Rating
                name="hover-feedback"
                value={4}
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
              />
              <small className={`${style.fpCity} ms-2 mb-2 text-muted`}>
                Malaysia
              </small>
            </div>
            <small className={`${style.fpPrice}`}>
              La Maison d'Eté is set in Poste Lafayette on the...
            </small>
            <div className={style.fpRating}>
              <button
                className={`btn btn-primary mt-2 ${
                  isXtraSmallScreen ? "btn-sm" : "btn-md"
                } btn-block`}
                onClick={() => HandleClick("Lahore")}
              >
                Explore Property
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FeaturedProperties;
