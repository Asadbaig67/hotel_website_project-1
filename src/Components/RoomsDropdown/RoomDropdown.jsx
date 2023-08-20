import React, { useState } from "react";
import style from "./dropDown.module.css";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const RoomDropdown = ({ options }) => {
  const [option, setOption] = useState(options);
  const [openRooms, setOpenRooms] = useState(false);

  const handleOption = (name, operation) => {
    setOption((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? option[name] + 1 : option[name] - 1,
      };
    });
  };

  return (
    <div>
      <div className={`border rounded-4 ${style.room_dropdown_container}`}>
        <div
          className="d-flex flex-row align-items-center"
          onClick={() => setOpenRooms((status) => !status)}
        >
          <PersonIcon className="mt-1" />
          <div className="d-flex ms-2 mt-1 flex-column">
            <small
              style={{ fontSize: "9px" }}
              className="text-muted fw-lighter"
            >
              Persons and Rooms
            </small>
            <span
              style={{ fontSize: "13px" }}
              className="text-muted fw-lighter "
            >
              2 Persons,1 Rooms
            </span>
          </div>
          {openRooms ? (
            <KeyboardArrowUpIcon className="ms-auto text-muted" />
          ) : (
            <KeyboardArrowDownIcon className="ms-auto text-muted" />
          )}
        </div>
        {openRooms && (
          <>
            <div
              className={`rounded-2 my-2 card shadow-lg ${style.Modal} ${style.room_element}`}
            >
              <div className="row">
                <div className="col-md-12">
                  <span className="fw-bold">Set Persons</span>
                  <div class="d-flex flex-row p-1 justify-content-between">
                    <div class="">
                      {" "}
                      <span>Adults</span>
                    </div>
                    <div class="">
                      <div className={style.optionCounter}>
                        <button
                          disabled={options.adult <= 1}
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("adult", "d")}
                        >
                          <RemoveIcon />
                        </button>
                        <span className={style.optionCounterNumber}>
                          {option.adult}
                        </span>
                        <button
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("adult", "i")}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row p-1 justify-content-between">
                    <div class="">
                      {" "}
                      <span>Childrens</span>
                    </div>
                    <div class="">
                      <div className={style.optionCounter}>
                        <button
                          disabled={options.adult <= 1}
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("children", "d")}
                        >
                          <RemoveIcon />
                        </button>
                        <span className={style.optionCounterNumber}>
                          {option.children}
                        </span>
                        <button
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("children", "i")}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <span className="fw-bold">Set Rooms</span>
                  <div class="d-flex flex-row p-1 justify-content-between">
                    <div class="">
                      {" "}
                      <span>Single Room</span>
                    </div>
                    <div class="">
                      <div className={style.optionCounter}>
                        <button
                          disabled={options.adult <= 1}
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("singleRoom", "d")}
                        >
                          <RemoveIcon />
                        </button>
                        <span className={style.optionCounterNumber}>
                          {option.singleRoom}
                        </span>
                        <button
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("singleRoom", "i")}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row p-1 justify-content-between">
                    <div class="">
                      {" "}
                      <span>Twin Room</span>
                    </div>
                    <div class="">
                      <div className={style.optionCounter}>
                        <button
                          disabled={options.adult <= 1}
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("twinRoom", "d")}
                        >
                          <RemoveIcon />
                        </button>
                        <span className={style.optionCounterNumber}>
                          {option.twinRoom}
                        </span>
                        <button
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("twinRoom", "i")}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-row p-1 justify-content-between">
                    <div class="">
                      {" "}
                      <span>Family Room</span>
                    </div>
                    <div class="">
                      <div className={style.optionCounter}>
                        <button
                          disabled={options.adult <= 1}
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("familyRoom", "d")}
                        >
                          <RemoveIcon />
                        </button>
                        <span className={style.optionCounterNumber}>
                          {option.familyRoom}
                        </span>
                        <button
                          className={`btn btn-primary d-flex justify-content-center align-items-center ${style.optionCounterButton}`}
                          onClick={() => handleOption("familyRoom", "i")}
                        >
                          <AddIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoomDropdown;
