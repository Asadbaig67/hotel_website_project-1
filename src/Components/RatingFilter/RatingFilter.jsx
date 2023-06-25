import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

const RatingFilter = () => {
  const dispatch = useDispatch();
  const { hotelData } = useSelector((state) => state.getHotelsfrombackend);
  const rating = [1, 2, 3, 4, 5];
  const [selectedRatings, setSelectedRatings] = useState([]);

  const handleOnChangeRating = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(() => selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  // ...your existing code...

  const filteredData = useMemo(() => {
    if (!hotelData || selectedRatings.length === 0) {
      return hotelData;
    }
    return hotelData.filter((item) =>
      selectedRatings.includes(item.hotel.rating)
    );
  }, [hotelData, selectedRatings]);

  useEffect(() => {
    if (filteredData) {
      dispatch({ type: "SET_HOTEL_DATA", payload: filteredData(hotelData) });
    }
  }, []);
  return (
    <>
      {rating.map((item) => {
        return (
          <div className="form-check" key={item}>
            <input
              className="form-check-input"
              type="checkbox"
              value={item}
              checked={selectedRatings.includes(rating)}
              id={`flexCheckRating${item}`}
              onChange={handleOnChangeRating(item)}
            />
            <label
              className="form-check-label"
              htmlFor={`flexCheckRating${item}`}
            >
              {item} Stars
            </label>
          </div>
        );
      })}
    </>
  );
};

export default RatingFilter;
