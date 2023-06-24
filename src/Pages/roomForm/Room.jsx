import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoomForm = () => {
  const dispatch = useDispatch();
  const { roomData } = useSelector((state) => state.setRoomData);



  const [room, setRoom] = useState({
    title: "",
    no_of_bed: "",
    max_capacity: 0,
    price: 0,
    description: "",
  });


  const handleChange = (e) => {
    const value = e.target.value;

    setRoom({ ...room, [e.target.name]: value });
  };


  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "setroomdata",
      payload: room,
    });
  };

  return (
    <>
      <div>
        <p>{roomData.title}</p>
        <p>{roomData.price}</p>
        <p>{roomData.no_of_bed}</p>
        <p>{roomData.max_capacity}</p>
        <p>{roomData.description}</p>
      </div>
      <div className="container-fluid">
        <div className="container ">
          <div className="row ">
            <div className="col-md-12 col-lg-12 col-sm-12  d-flex flex-column">
              <div
                className="container p-3 my-4 rounded-7  border bg-light border-light rounded-3"
                style={{
                  boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
                }}
              >
                <h5 className="text-uppercase text-dark text-center ">
                  Room Listing Form
                </h5>
                <hr className="w-100" />
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label text-dark"
                      >
                        Title
                      </label>
                      <input 
                        type="text"
                        onChange={handleChange}
                        className="form-control"
                        name="title"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label text-dark"
                      >
                        Price
                      </label>
                      <input 
                        type="number"
                        name="price"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label text-dark"
                      >
                        No of Bed
                      </label>
                      <input
                        type="number"
                        name="no_of_bed"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="mb-3">
                      <label
                        for="exampleInputEmail1"
                        className="form-label text-dark"
                      >
                        Max Capacity
                      </label>
                      <input
                        type="number"
                        name="max_capacity"
                        onChange={handleChange}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>
                </div>
                <div className="my-3 ">
                  <label
                    for="exampleFormControlTextarea1"
                    className="text-dark form-label"
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                </div>
                <input
                  type="submit"
                  onClick={handleClick}
                  className="font-medium text-base px-4 py-2 my-3 leading-relaxed inline-block rounded-4 whitespace-nowrap cursor-pointer bg-black text-white"
                  value="Submit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomForm;
