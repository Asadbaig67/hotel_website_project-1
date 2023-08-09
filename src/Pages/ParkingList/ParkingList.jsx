import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ParkingCard from "../../Components/ParkingCard/ParkingCard";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";

const ParkingList = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const searchData = new URLSearchParams(location.search);

  const cityParking = JSON.parse(decodeURIComponent(searchData.get("city")));
  const c = searchData.get("vehicles");
  const dates = JSON.parse(decodeURIComponent(searchData.get("dates")));

  const { parkingData } = useSelector((state) => state.getParkingsfrombackend);

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const getParkings = async () => {
    try {
      const url = `${api}/parking/search?city=${cityParking}&vehicles=${c}`;
      const response = await fetch(url, {
        method: "GET",
        // credentials: "include",
      });
      const { parkingList } = await response.json();
      console.log(parkingList);
      if (parkingList) {
        dispatch({
          type: "SET_PARKING_DATA",
          payload: parkingList,
        });
      } else {
        dispatch({
          type: "SET_PARKING_DATA",
          payload: { message: "No Parking Found" },
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getParkings();
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar list={false} />
      <div className="mt-3 row">
        {parkingData.message === "Parking Not Found" ? (
          <h1 className="text-center text-danger">{parkingData.message}</h1>
        ) : parkingData.length === 0 ? (
          <Loader />
        ) : (
          parkingData.map((item) => (
            <div className="col-lg-3  col-md-4 col-sm-12">
              <ParkingCard data={item} dates={dates} vehicles={c} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParkingList;
