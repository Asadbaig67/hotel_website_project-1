import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none", // Remove the border
    boxShadow: "none", // Optional: Remove the box shadow as well
    width: "100%",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "14px", // Adjust the font size as needed
  }),
  indicatorSeparator: () => ({
    display: "none", // Hide the line between text and arrow
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    fontSize: "12px", // Adjust the padding to change the size of the arrow
    padding: "0px",
  }),
};

export default function Dropdown(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const { hotelOperatingCity } = useSelector(
    (state) => state.hotelOperatingCities
  );
  const { parkingOperatingCity } = useSelector(
    (state) => state.parkingOperatingCities
  );
  const { hotelAndParkingOperatingCity } = useSelector(
    (state) => state.hotelAndParkingOperatingCities
  );

  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  const dispatch = useDispatch();

  const { name } = props;

  useEffect(() => {
    const GetHotelCities = async () => {
      const response = await axios.get(
        `${api}/OperatingProperty/getHotelOperatingCity`
      );
      dispatch({ type: "SET_HOTEL_CITY", payload: response.data });
    };

    const getParkingCities = async () => {
      const response = await axios.get(
        `${api}/OperatingProperty/getParkingOperatingCity`
      );
      dispatch({ type: "SET_PARKING_CITY", payload: response.data });
    };

    const GetHotelAndParkingCities = async () => {
      const response = await axios.get(
        `${api}/OperatingProperty/getHotelAndParkingOperatingCity`
      );
      dispatch({ type: "SET_HOTEL_AND_PARKING_CITY", payload: response.data });
    };
    GetHotelCities();
    getParkingCities();
    GetHotelAndParkingCities();
  }, [path]);

  return (
    <div className="App w-100">
      <Select
        defaultValue={selectedOption}
        options={
          name === "cityHotel"
            ? hotelOperatingCity.map((city) => ({
                value: city,
                label: city,
              }))
            : name === "cityParking"
            ? parkingOperatingCity.map((city) => ({
                value: city,
                label: city,
              }))
            : hotelAndParkingOperatingCity.map((city) => ({
                value: city,
                label: city,
              }))
        }
        filterSort={(optionA, optionB) =>
          optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
        }
        styles={customStyles} // Apply the custom styles
        placeholder="Select the city"
        onChange={(value) => {
          if (name === "cityHotel") {
            dispatch({
              type: "SET_CITY",
              payload: value.value,
            });
          } else if (name === "cityParking") {
            dispatch({ type: "SET_PARKINGCITY", payload: value.value });
          } else {
            dispatch({ type: "SET_HOTELANDPARKINGCITY", payload: value.value });
          }
        }}
      />
    </div>
  );
}

// import React, { useEffect } from "react";
// import { Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const Dropdown = (props) => {
//   const location = useLocation();
//   const path = location.pathname.split("/")[1];

//   const { hotelOperatingCity } = useSelector(
//     (state) => state.hotelOperatingCities
//   );
//   const { parkingOperatingCity } = useSelector(
//     (state) => state.parkingOperatingCities
//   );
//   const { hotelAndParkingOperatingCity } = useSelector(
//     (state) => state.hotelAndParkingOperatingCities
//   );

//   const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

//   const dispatch = useDispatch();

//   const { name } = props;

//   useEffect(() => {
//     const GetHotelCities = async () => {
//       const response = await axios.get(
//         `${api}/OperatingProperty/getHotelOperatingCity`
//       );
//       dispatch({ type: "SET_HOTEL_CITY", payload: response.data });
//     };

//     const getParkingCities = async () => {
//       const response = await axios.get(
//         `${api}/OperatingProperty/getParkingOperatingCity`
//       );
//       dispatch({ type: "SET_PARKING_CITY", payload: response.data });
//     };

//     const GetHotelAndParkingCities = async () => {
//       const response = await axios.get(
//         `${api}/OperatingProperty/getHotelAndParkingOperatingCity`
//       );
//       dispatch({ type: "SET_HOTEL_AND_PARKING_CITY", payload: response.data });
//     };
//     GetHotelCities();
//     getParkingCities();
//     GetHotelAndParkingCities();
//   }, [path]);

//   return (
//     <Select
//       showSearch
//       bordered={false}
//       style={{ width: "100%", backgroundColor: "white" }}
//       placeholder={"Select the city"}
//       optionFilterProp="children"

//       filterOption={(input, option) =>
//         option?.label.toLowerCase().slice(0, input.length) ===
//         input.toLowerCase()
//       }
//       filterSort={(optionA, optionB) =>
//         (optionA?.label ?? "")
//           .toLowerCase()
//           .localeCompare((optionB?.label ?? "").toLowerCase())
//       }
//       options={
//         name === "cityHotel"
//           ? hotelOperatingCity.map((city) => ({
//               value: city,
//               label: city,
//             }))
//           : name === "cityParking"
//           ? parkingOperatingCity.map((city) => ({
//               value: city,
//               label: city,
//             }))
//           : hotelAndParkingOperatingCity.map((city) => ({
//               value: city,
//               label: city,
//             }))
//       }
//       onChange={(value) => {
//         if (name === "cityHotel") {
//           dispatch({
//             type: "SET_CITY",
//             payload: value,
//           });
//         } else if (name === "cityParking") {
//           dispatch({ type: "SET_PARKINGCITY", payload: value });
//         } else {
//           dispatch({ type: "SET_HOTELANDPARKINGCITY", payload: value });
//         }
//       }}
//     />
//   );
// };

// export default Dropdown;
