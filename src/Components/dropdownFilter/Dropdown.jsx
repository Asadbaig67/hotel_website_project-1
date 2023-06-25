import React, { useEffect } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

const DropdownFilter = (props) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const { placeholder, disable, options, dropdown } = props;
  const { filterName } = useSelector((state) => state.filter_name);
  const { filterType } = useSelector((state) => state.filter_type);
  let typeValue = "";
  useEffect(() => {
    dispatch({
      type: "DISABLE",
      payload: {
        disabled: true,
        name: "",
      },
    });
    dispatch({
      type: "FILTER_TYPE",
      payload: "",
    });
    dispatch({
      type: "FILTER_NAME",
      payload: "",
    });
  }, [path]);
  return (
    <Select
      allowClear
      showSearch
      popupClassName={"fs-2"}
      disabled={disable}
      style={{ width: "100%" }}
      value={
        dropdown === "type" ? filterType : typeValue === undefined ? "" : filterName
      }
      placeholder={
        disable === true ? "Select filter type first" : placeholder
      }
      optionFilterProp="children"
      filterOption={(input, option) =>
        option?.label.toLowerCase().slice(0, input.length) ===
        input.toLowerCase()
      }
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? "")
          .toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
      }
      options={options.map((option) => ({
        value: option,
        label: option,
      }))}
      onChange={(value) => {
        if (dropdown === "type") {
          typeValue = value;
          dispatch({
            type: "FILTER_TYPE",
            payload: value,
          });
          if (typeValue === undefined) {
            dispatch({
              type: "DISABLE",
              payload: {
                disabled: true,
                name: "",
              },
            });
          } else
            dispatch({
              type: "DISABLE",
              payload: {
                disabled: false,
                name: value,
              },
            });
        } else {
          dispatch({
            type: "FILTER_NAME",
            payload: value,
          });
        }
      }}
    />
  );
};

export default DropdownFilter;
