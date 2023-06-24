import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./carPark.css";

const CarParkAvailability = (props) => {
  let dates = props.dates;

  const entryExitDates = dates.map((dateString) => {
    const [dateStringWithoutTime, time] = dateString.split(" ");
    const [day, month, year] = dateStringWithoutTime.split("-");
    const date = new Date(`${month}-${day}-${year}`);
    return date;
  });

  const entryDate = entryExitDates[0];
  const exitDate = entryExitDates[1];

  const entryDateString = entryDate.toDateString();
  const exitDateString = exitDate.toDateString();

  const entryTime = entryDate.toLocaleTimeString([], {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  const exitTime = exitDate.toLocaleTimeString([], {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  console.log("Props Are =", props);
  const carParkData = [
    {
      title: "Standard pass",
      hourlyPrice: `${props.price} €/h`,
      dailyPrice: "25 €/day",
      weeklyPrice: "100 €/week",
      vehicle: "SUV - Maximum height 2.30m",
      available: false,
    },
  ];

  const renderCarParkData = () => {
    return carParkData.map((data, index) => {
      const {
        title,
        hourlyPrice,
        dailyPrice,
        weeklyPrice,
        vehicle,
        available,
      } = data;
      return (
        <div key={index} className={`card ${available ? "card-selected" : ""}`}>
          <div className="card-header d-flex align-items-center">
            <div className="col text-truncate">
              <span className="card-title d-block text-truncate">{title}</span>
              <span className="card-info text-dark fw-bold text-truncate">
                UNLIMITED ENTRY AND EXIT
              </span>
            </div>
            <div className="col-auto pl-0 ml-auto d-flex align-items-center">
              <span className="card-price text-dark px-2 py-1 rounded-2 bg-secondary fw-bold fs-4">
                {hourlyPrice}
                <CheckCircleIcon className="text-success mx-1" />
              </span>
            </div>
          </div>
          <div className="card-body d-flex flex-wrap">
            <div className="col-6 d-flex align-content-center flex-wrap with-divider">
              <span className="card-label w-100">Car park entrance</span>
              <span>
                {entryDateString}{" "}
                <strong className="strong-hour">
                  {dates[0].split(" ")[1]}
                </strong>
              </span>
            </div>
            <div className="col-6 d-flex align-content-center flex-wrap">
              <span className="card-label w-100">Leave car park</span>
              <span>
                {exitDateString}{" "}
                <strong className="strong-hour">
                  {dates[1].split(" ")[1]}
                </strong>
              </span>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="bestproducts">
      <h2 className="title fw-bold text-dark mb-3">Car park availability</h2>
      <div className="card-group">{renderCarParkData()}</div>
    </div>
  );
};

export default CarParkAvailability;
