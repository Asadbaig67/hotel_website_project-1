// import React from "react";
// import "./carPark.css";

// const CarParkAvailability = () => {
//   const carParkData = [
//     {
//       title: "Standard pass",
//       price: "15 €",
//       entry: {
//         date: "Fr, 15 Apr",
//         time: "14:00",
//       },
//       exit: {
//         date: "Sa, 16 Apr",
//         time: "14:00",
//       },
//       vehicle: "SUV - Maximum height 2.30m",
//       available: false,
//     },
//   ];

//   const renderCarParkData = () => {
//     return carParkData.map((data, index) => {
//       const {
//         title,
//         price,
//         entry: { date: entryDate, time: entryTime },
//         exit: { date: exitDate, time: exitTime },
//         vehicle,
//         available,
//       } = data;
//       return (
//         <div key={index} className={`card ${available ? "card-selected" : ""}`}>
//           <div className="card-header d-flex align-items-center">
//             <div className="col text-truncate">
//               <span className="card-title d-block text-truncate">{title}</span>
//               <span className="card-info text-truncate">
//                 UNLIMITED ENTRY AND EXIT
//               </span>
//             </div>
//             <div className="col-auto pl-0 ml-auto d-flex align-items-center">
//               <span className="card-price">{price}</span>
//             </div>
//           </div>
//           <div className="card-body d-flex flex-wrap">
//             <div className="col-6 d-flex align-content-center flex-wrap with-divider">
//               <span className="card-label w-100">Car park entrance</span>
//               <span>
//                 {entryDate} <strong className="strong-hour">{entryTime}</strong>
//               </span>
//             </div>
//             <div className="col-6 d-flex align-content-center flex-wrap">
//               <span className="card-label w-100">Leave car park</span>
//               <span>
//                 {exitDate} <strong className="strong-hour">{exitTime}</strong>
//               </span>
//             </div>
//             <div className="col-12 divider-top d-flex align-content-center flex-wrap">
//               <span className="card-label w-100">Vehicle</span>
//               {vehicle}
//             </div>
//           </div>
//           <div className="card-footer d-flex justify-content-center">
//             <button className="btn btn-card">Book now</button>
//           </div>
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="bestproducts">
//       <h2 className="title">Car park availability</h2>
//       <div className="card-group">{renderCarParkData()}</div>
//     </div>
//   );
// };

// export default CarParkAvailability;
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./carPark.css";

const CarParkAvailability = () => {
  const carParkData = [
    {
      title: "Standard pass",
      hourlyPrice: "5 €/h",
      dailyPrice: "25 €/day",
      weeklyPrice: "100 €/week",
      entry: {
        date: "Fr, 15 Apr",
        time: "14:00",
      },
      exit: {
        date: "Sa, 16 Apr",
        time: "14:00",
      },
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
        entry: { date: entryDate, time: entryTime },
        exit: { date: exitDate, time: exitTime },
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
                {entryDate} <strong className="strong-hour">{entryTime}</strong>
              </span>
            </div>
            <div className="col-6 d-flex align-content-center flex-wrap">
              <span className="card-label w-100">Leave car park</span>
              <span>
                {exitDate} <strong className="strong-hour">{exitTime}</strong>
              </span>
            </div>
            <div className="col-12 divider-top d-flex align-content-center flex-wrap">
              <span className="card-label w-100 fw-bold text-dark">
                Vehicle
              </span>
              {vehicle}
            </div>
          </div>
          {/* <div className="card-footer d-flex justify-content-center">
            <button className="btn btn-card">Book now</button>
          </div> */}
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
