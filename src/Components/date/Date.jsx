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
        inputPrefixCls={style.placeholder}
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
