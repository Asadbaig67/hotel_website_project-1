import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useFetch } from "../../Utilis/Fetch";
import { Box } from "@mui/material";
import axios from "axios";

const DashboardDataTable = ({ path, user, type, url }) => {
  const { header } = useSelector((state) => state.setHeader);
  const { data, loading, error } = useFetch(url);
  


  const api = process.env.REACT_APP_BACKEND_URL_LOCAL;

  let filteredData = data;
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(filteredData);
  }, [filteredData]);

  const handleDeleteOperatingCity = async (id) => {
    let res;
    if (type === "hotel") {
      res = await axios.delete(
        `${api}/OperatingProperty/deleteOperatingCity`,
        { data: { type: "hotel", cityId: id } }
      );
    } else if (type === "parking") {
      res = await axios.delete(
        `${api}/OperatingProperty/deleteOperatingCity`,
        { data: { type: "parking", cityId: id } }
      );
    } else if (type === "hotelAndParking") {
      res = await axios.delete(
        `${api}/OperatingProperty/deleteOperatingCity`,
        { data: { type: "hotelandparking", cityId: id } }
      );
    }
    if (res.status === 200) {
      const newList = list.filter((item) => item._id !== id);
      setList(newList);
    }
  };

  const deleteOperatingCity = [
    {
      field: "deleteOperatingCity",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteOperatingCity(params.row._id)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={list}
        columns={header.concat(deleteOperatingCity)}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        loading={loading}
      />
    </Box>
  );
};

export default DashboardDataTable;
