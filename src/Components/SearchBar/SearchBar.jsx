import React, { useState } from "react";
import RoomDropdown from "../RoomsDropdown/RoomDropdown";
import Dropdown from "../dropdown/Dropdown";
import Dates from "../date/Date";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import style from "./Search.module.css";
import Button from "@mui/material/Button";


const SearchBar = (props) => {
  const { options } = props;

  return (
    <div className="container bg-warning rounded-2 mb-1">
      <div className="row">
        <div className="col-md-4 p-1 m-0">
          <div className={`my-auto ${style.lsItem}`}>
            <div className="bg-white p-1 border rounded-4">
              <Dates />
            </div>
          </div>
        </div>
        <div className="col-md-3 p-1 m-0">
          <div className={`my-auto ${style.lsItem}`}>
            <div className="bg-white p-1 border rounded-4">
              <Dropdown name="cityHotel" />
            </div>
          </div>
        </div>
        <div className="col-md-3 p-1 m-0">
          <RoomDropdown options={options} />
        </div>
        <div className="col-md-2 my-auto p-1 m-0">
          <Button
            className="rounded-4 w-100"
            variant="contained"
            startIcon={<TravelExploreIcon />}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
