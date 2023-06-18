export const userHeader = [
  { field: "_id", headerName: "ID", width: 130 },
  { field: "firstName", headerName: "First Name", width: 130 },
  { field: "lastName", headerName: "Last Name", width: 130 },
  { field: "account_type", headerName: "Type", width: 130 },
  { field: "email", headerName: "Email", width: 260 },
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
  { field: "rating", headerName: "Rating", width: 130 },
];

export const hotelAndParkingHeader = [
  { field: "_id", headerName: "ID", width: 100 },
  {
    field: "hotel_name",
    headerName: "Hotel Name",
    width: 130,
    cellClassName: "name-column--cell",
  },
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
    field: "propertyName",
    headerName: "Name",
    width: 130,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 130,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 130,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 130,
  },
  { field: "total_price", headerName: "Total Price", width: 130 },
];

export const bookingHotelHeader = [
  { field: "_id", headerName: "Serial number", width: 120 },
  {
    field: "hotelName",
    headerName: "Hotel Name",
    width: 130,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 130,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 130,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 130,
  },
  {
    field: "createdAt",
    headerName: "Booking Date",
    width: 130,
  },
  { field: "total_price", headerName: "Total Price", width: 130 },
];

export const bookingParkingHeader = [
  { field: "_id", headerName: "Serial number", width: 120 },
  {
    field: "parkingName",
    headerName: "Parking Name",
    width: 130,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 130,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 130,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 130,
  },
  {
    field: "createdAt",
    headerName: "Booking Date",
    width: 130,
  },
  { field: "total_price", headerName: "Total Price", width: 130 },
];

export const bookingHotelAndParkingHeader = [
  { field: "_id", headerName: "Serial number", width: 120 },
  {
    field: "hotelAndParkingName",
    headerName: "Name",
    width: 130,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 130,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 130,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 130,
  },
  {
    field: "createdAt",
    headerName: "Booking Date",
    width: 130,
  },
  { field: "total_price", headerName: "Total Price", width: 130 },
];

export const dashboardOperatingCityHeader = [
  { field: "_id", headerName: "ID", width: 130 },
  { field: "city", headerName: "Name", width: 160 },
  { field: "createdAt", headerName: "Created at", width: 160 },
];

export const roomHeader = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "type",
    headerName: "Room Type",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 110,
  },
  {
    field: "room_no",
    headerName: "Total Rooms",
    width: 110,
    valueGetter: (params) => {
      return params.row.room_no.length;
    },
  },
  {
    field: "room",
    headerName: "Booked Rooms",
    type: "number",
    width: 110,
    valueGetter: (params) => {
      let count = params.row.room_no.length;
      console.log(params);
      params.row.room_no.forEach((element) => {
        element.unavailableDates.length === 0
          ? (count = count - 1)
          : (count = count);
      });
      return count;
    },
  },
];

export const parkingDetailHeader = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Parking Name",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "total_slots",
    headerName: "Total slots",
    width: 150,
  },
  {
    field: "",
    headerName: "Available slots",
    width: 150,
    valueGetter: (params) => {
      return params.row.total_slots - params.row.booked_slots;
    },
  },
  {
    field: "booked_slots",
    headerName: "Booked slots",
    width: 150,
  },
  {
    field: "approved",
    headerName: "Approved",
    width: 150,
  },
];

export const userHeader1 = [
  { name: "First Name", selector: (row) => row.firstName },
  { name: "Last Name", selector: (row) => row.lastName },
  { name: "Account Type", selector: (row) => row.account_type },
  { name: "Email", selector: (row) => row.email },
];

export const hotelsHeader1 = [
  { name: "Name", selector: (row) => row.name },
  { name: "Title", selector: (row) => row.title },
  { name: "Rating", selector: (row) => row.rating },
  { name: "Address", selector: (row) => row.address },
  { name: "City", selector: (row) => row.city },
  { name: "Country", selector: (row) => row.country },
];

export const parkingHeader1 = [
  { name: "Name", selector: (row) => row.name },
  { name: "Title", selector: (row) => row.title },
  { name: "Rating", selector: (row) => row.rating },
  { name: "Total Slots", selector: (row) => row.total_slots },
  { name: "Booked Slots", selector: (row) => row.booked_slots },
  { name: "Address", selector: (row) => row.address },
  { name: "City", selector: (row) => row.city },
  { name: "Country", selector: (row) => row.country },
];

export const hotelAndParkingHeader1 = [
  { name: "Hotel Name", selector: (row) => row.hotel_name },
  { name: "Parking Name", selector: (row) => row.parking_name },
  { name: "Rating", selector: (row) => row.hotel_rating },
  { name: "Address", selector: (row) => row.hotel_address },
  { name: "City", selector: (row) => row.hotel_city },
  { name: "Country", selector: (row) => row.hotel_country },
];

export const bookingHeader1 = [
  { name: "Booking Type", selector: (row) => row.Booking_type },
  { name: "Name", selector: (row) => row.propertyName },
  { name: "User Name", selector: (row) => row.userName },
  { name: "Total Price", selector: (row) => row.total_price },
  { name: "Check In", selector: (row) => row.checkIn },
  { name: "Check Out", selector: (row) => row.checkOut },
  { name: "Booking Date", selector: (row) => row.createdAt },
];

export const bookingHotelHeader1 = [
  { name: "Hotel Name", selector: (row) => row.hotelName },
  { name: "User Name", selector: (row) => row.userName },
  { name: "Total Price", selector: (row) => row.total_price },
  { name: "Check In", selector: (row) => row.checkIn },
  { name: "Check Out", selector: (row) => row.checkOut },
  { name: "Booking Date", selector: (row) => row.createdAt },
];

export const bookingParkingHeader1 = [
  { name: "Parking Name", selector: (row) => row.parkingName },
  { name: "User Name", selector: (row) => row.userName },
  { name: "Total Price", selector: (row) => row.total_price },
  { name: "Check In", selector: (row) => row.checkIn },
  { name: "Check Out", selector: (row) => row.checkOut },
  { name: "Booking Date", selector: (row) => row.createdAt },
];

export const bookingHotelAndParkingHeader1 = [
  { name: "Hotel Name", selector: (row) => row.hotelAndParkingName },
  { name: "User Name", selector: (row) => row.userName },
  { name: "Total Price", selector: (row) => row.total_price },
  { name: "Check In", selector: (row) => row.checkIn },
  { name: "Check Out", selector: (row) => row.checkOut },
  { name: "Booking Date", selector: (row) => row.createdAt },
];

export const dashboardOperatingCityHeader1 = [
  { field: "_id", headerName: "ID", width: 130 },
  { field: "city", headerName: "Name", width: 160 },
  { field: "createdAt", headerName: "Created at", width: 160 },
];

export const roomHeader1 = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "type",
    headerName: "Room Type",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 110,
  },
  {
    field: "room_no",
    headerName: "Total Rooms",
    width: 110,
    valueGetter: (params) => {
      return params.row.room_no.length;
    },
  },
  {
    field: "room",
    headerName: "Booked Rooms",
    type: "number",
    width: 110,
    valueGetter: (params) => {
      let count = params.row.room_no.length;
      console.log(params);
      params.row.room_no.forEach((element) => {
        element.unavailableDates.length === 0
          ? (count = count - 1)
          : (count = count);
      });
      return count;
    },
  },
];

export const parkingDetailHeader1 = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Parking Name",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 150,
  },
  {
    field: "total_slots",
    headerName: "Total slots",
    width: 150,
  },
  {
    field: "",
    headerName: "Available slots",
    width: 150,
    valueGetter: (params) => {
      return params.row.total_slots - params.row.booked_slots;
    },
  },
  {
    field: "booked_slots",
    headerName: "Booked slots",
    width: 150,
  },
  {
    field: "approved",
    headerName: "Approved",
    width: 150,
  },
];
