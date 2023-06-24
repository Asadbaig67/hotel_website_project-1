import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";

import style from "./ParkingDate.module.css";
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

const ParkingDate = () => {
  const dispatch = useDispatch();
  const { dates } = useSelector((state) => state.searchParkingDate);
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  // Disable dates before today
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  // Disable times before the current hour
  const disabledRangeTime = (_, type) => {
    const currentDateTime = new Date(); // get current date and time
    const currentHour = currentDateTime.getHours();

    if (type === "start") {
      // Check if the starting date is after the current date
      const startingDate = dayjs(_).startOf("day");
      const currentDate = dayjs().startOf("day");
      const isStartingDateAfterCurrentDate = startingDate.isAfter(currentDate);

      // If the starting date is after the current date, enable all hours for that date
      if (isStartingDateAfterCurrentDate) {
        return {
          disabledHours: () => [],
        };
      }

      return {
        disabledHours: () => range(0, currentHour),
      };
    }

    if (type === "end" && dates[0] === dates[1]) {
      const startingDate = dayjs(dates[0], "DD-MM-YYYY HH:mm").startOf("hour");
      const endingDate = dayjs(_).startOf("hour");

      if (endingDate.isSame(startingDate, "hour")) {
        return {
          disabledHours: () => range(0, startingDate.hour()),
        };
      }
    }

    const [start, end] = dates.map((date) => dayjs(date, "DD-MM-YYYY HH:mm"));
    if (type === "end" && start) {
      const startingDate = dayjs(start).startOf("hour");
      const currentDate = dayjs().startOf("hour");
      const isStartingDateAfterCurrentDate = startingDate.isAfter(currentDate);

      if (isStartingDateAfterCurrentDate) {
        return {
          disabledHours: () => [],
        };
      }

      if (currentDate.isSame(startingDate, "day")) {
        return {
          disabledHours: () => {
            const startHour = startingDate.hour();
            return range(0, startHour).concat(range(startHour + 1, 24));
          },
        };
      }
    }

    // Check if the ending date is after the current date
    const endingDate = dayjs(_).startOf("day");
    const currentDate = dayjs().startOf("day");
    const isEndingDateAfterCurrentDate = endingDate.isAfter(currentDate);

    // If the ending date is after the current date, enable all hours for that date
    if (isEndingDateAfterCurrentDate) {
      return {
        disabledHours: () => [],
      };
    }

    return {
      disabledHours: () => range(0, currentHour + 1),
    };
  };

  const handleDateChange = (val) => {
    dispatch({
      type: "SETPARKING_DATE",
      payload: val.map((v) => v.format("DD-MM-YYYY HH:00")),
    });

    if (val.length === 2) {
      dispatch({
        type: "ALERTDATETIME",
        payload: false,
      });
    }
  };

  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        bordered={false}
        disabledDate={disabledDate}
        disabledTime={disabledRangeTime}
        popupClassName={style.popup}
        className={style.date}
        placeholder={["Parking from", "Parking to"]}
        showTime={{
          format: "HH:00",
          defaultValue: dayjs(),
          hideDisabledOptions: true,
        }}
        format="DD-MM-YYYY HH:00"
        onChange={handleDateChange}
      />
    </Space>
  );
};

export default ParkingDate;
