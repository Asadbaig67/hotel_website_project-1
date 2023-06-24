import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import ParkingCard from "../../Components/ParkingCard/ParkingCard";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";

const ParkingList = () => {
  const { parkingData } = useSelector((state) => state.getParkingsfrombackend);

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
              <ParkingCard data={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParkingList;
