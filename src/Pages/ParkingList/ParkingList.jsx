import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ParkingCard from "../../Components/ParkingCard/ParkingCard";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";

const ParkingList = () => {
  // const { parking_data } = useSelector((state) => state.getStaticParking);
  const { parkingData } = useSelector((state) => state.getParkingsfrombackend);
  // const { cityParking } = useSelector((state) => state.searchParkingCity);

  // console.log(parkingData);
  // let filtered_data = parking_data.filter(
  //   (item) => item.city.toLowerCase() === cityParking.toLowerCase()
  // );

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar list={false} />
      <div className="mt-3 row">
        {parkingData.length === 0 ? (
          <Loader />
        ) : (
          parkingData.map((item) => (
            <div className="col-lg-3  col-md-4 col-sm-12">
              <ParkingCard data={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParkingList;
