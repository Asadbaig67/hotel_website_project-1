import axios from "axios";

const getHotelName = async (params) => {
  const hotel = await axios.get(
    `http://localhost:5000/hotels/gethotelbyid/${params.row.hotelId}`
  );
  const data = hotel.data.name;
  return data;
};

const getUserName = async (params) => {
  const user = await axios.get(
    `http://localhost:5000/user/getuserbyid/${params.row.userId}`
  );
  return "Hassaan";
  // const data = `${user.data.firstName || ""} ${user.data.lastName || ""}`;
  // return data;
};

const getCheckInDate = async (params) => {
  const data = new Date(params.row.checkIn).toDateString();
  return data;
};

const getCheckOutDate = async (params) => {
  const data = new Date(params.row.checkOut).toDateString();
  return data;
};

const getBookingDate = async (params) => {
  const data = new Date(params.row.bookingDate).toDateString();
  return data;
};

export const userHeader = [
  { field: "_id", headerName: "ID", width: 100 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "account_type", headerName: "Type", width: 130 },
  { field: "email", headerName: "Email", width: 230 },
  // { field: "mobile", headerName: "Mobile", width: 130 },
  // { field: "postalCode", headerName: "Postal Code", width: 130 },
  // { field: "area", headerName: "Area", width: 130 },
  // { field: "country", headerName: "Country", width: 130 },
];

export const hotelsHeader = [
  { field: "_id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "rating", headerName: "Ratings", width: 130 },
  { field: "address", headerName: "Address", width: 130 },
  { field: "city", headerName: "City", width: 130 },
  { field: "country", headerName: "Country", width: 130 },
];

export const parkingHeader = [
  { field: "_id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "address", headerName: "Address", width: 130 },
  { field: "city", headerName: "City", width: 130 },
  { field: "country", headerName: "Country", width: 130 },
];

export const hotelAndParkingHeader = [
  { field: "_id", headerName: "ID", width: 100 },
  { field: "hotel_name", headerName: "Hotel Name", width: 130 },
  { field: "parking_name", headerName: "Parking Name", width: 130 },
  { field: "hotel_address", headerName: "Address", width: 130 },
  { field: "hotel_city", headerName: "City", width: 130 },
  { field: "hotel_country", headerName: "Country", width: 130 },
  { field: "hotel_rating", headerName: "Ratings", width: 130 },
];

export const bookingHeader = [
  { field: "_id", headerName: "ID", width: 100 },
  { field: "Booking_type", headerName: "Booking Type", width: 100 },
  {
    field: "hotelId || parkingId || HotelAndParkingId",
    headerName: "Name",
    width: 130,
    valueGetter: getHotelName,
  },
  {
    field: "userId",
    headerName: "User Name",
    width: 130,
    valueGetter: getUserName,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 130,
    valueGetter: getCheckInDate,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 130,
    valueGetter: getCheckOutDate,
  },
  { field: "totalPrice", headerName: "Total Price", width: 130 },
];

export const bookingHotelHeader = [
  { field: "_id", headerName: "Serial number", width: 120 },
  {
    field: "hotelId",
    headerName: "Hotel Name",
    width: 130,
    valueGetter: getHotelName,
  },
  {
    field: "userId",
    headerName: "User Name",
    width: 130,
    valueGetter: getUserName,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 130,
    valueGetter: getCheckInDate,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 130,
    valueGetter: getCheckOutDate,
  },
  {
    field: "createdAt",
    headerName: "Booking Date",
    width: 130,
    valueGetter: getBookingDate,
  },
  { field: "total_price", headerName: "Total Price", width: 130 },
];

export const bookingParkingHeader = [
  { field: "_id", headerName: "Serial number", width: 120 },
  {
    field: "parkingId",
    headerName: "Hotel Name",
    width: 130,
    valueGetter: getHotelName,
  },
  {
    field: "userId",
    headerName: "User Name",
    width: 130,
    valueGetter: getUserName,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 130,
    valueGetter: getCheckInDate,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 130,
    valueGetter: getCheckOutDate,
  },
  {
    field: "createdAt",
    headerName: "Booking Date",
    width: 130,
    valueGetter: getBookingDate,
  },
  { field: "total_price", headerName: "Total Price", width: 130 },
];

export const bookingHotelAndParkingHeader = [
  { field: "_id", headerName: "Serial number", width: 120 },
  {
    field: "HotelandParkingId",
    headerName: "Name",
    width: 130,
    valueGetter: getHotelName,
  },
  {
    field: "userId",
    headerName: "User Name",
    width: 130,
    valueGetter: getUserName,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 130,
    valueGetter: getCheckInDate,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 130,
    valueGetter: getCheckOutDate,
  },
  {
    field: "createdAt",
    headerName: "Booking Date",
    width: 130,
    valueGetter: getBookingDate,
  },
  { field: "total_price", headerName: "Total Price", width: 130 },
];
