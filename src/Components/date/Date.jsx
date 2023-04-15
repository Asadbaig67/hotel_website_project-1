import React, { useRef } from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import style from "./Date.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Dates = () => {
  dayjs.extend(customParseFormat);
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  // const { dateFocus } = useSelector((state) => state.getFocus);
  // console.log(dateFocus);
  // const datePickerRef = useRef(null);

  // if (dateFocus) {
  //   if (datePickerRef.current !== null) {
  //     console.log("i am getting called");
  //     datePickerRef.current.focus();
  //   }
  // } else {
  //   if (datePickerRef.current !== null) {
  //     datePickerRef.current.blur();
  //   }
  // }

  const disabledDate = (current) => {
    return current && current < dayjs().endOf("day");
  };
  return (
    <Space direction="vertical" size={12}>
      <RangePicker
        bordered={false}
        format="DD-MM-YYYY"
        disabledDate={disabledDate}
        popupClassName={style.popup}
        placeholder={["Check In", "Check Out"]}
        onChange={(val) => {
          dispatch({
            type: "SET_DATE",
            payload: val.map((v) => v.format("DD-MM-YYYY")),
          });
        }}
        onClick={() => {
          dispatch({
            type: "ALERTDATE",
            payload: false,
          });
        }}
        required={true}
        // ref={datePickerRef}
      />
    </Space>
  );
};
export default Dates;
