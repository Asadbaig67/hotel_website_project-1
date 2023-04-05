import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  hotelsHeader,
  userHeader,
  bookingHeader, 
} from "../../Utilis/DataTableSource";
import { Box } from "@mui/material";
import axios from "axios";

const DataTable = ({ url, path }) => {
  const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await axios.get(url);
          setData(res.data);
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      };
      fetchData();
    }, [url]);

    // const reFetch = async () => {
    //   setLoading(true);
    //   try {
    //     const res = await axios.get(url);
    //     setData(res.data);
    //   } catch (err) {
    //     setError(err);
    //   }
    //   setLoading(false);
    // };

    return { data, loading, error };
  };

  const { data, loading, error } = useFetch(url);

  const dispatch = useDispatch();
  dispatch({ type: "SETPROFILEDATA", payload: data });
  const { profileData } = useSelector((state) => state.dataProfile);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(profileData);
  }, [profileData]);

  const header =
    path === "hotels"
      ? hotelsHeader
      : path === "users"
      ? userHeader
      : bookingHeader;

  const handleDelete = async (id) => {
    if (path === "hotels") {
      const data = await axios.delete(
        `http://localhost:5000/hotels/deletehotel/${id}`
      );
    } else if (path === "users") {
      const data = await axios.delete(
        `http://localhost:5000/user/delete/${id}`
      );
    }

    setList(list.filter((item) => item._id !== id));
  };
  const handleView = async (id) => {
    if (path === "hotels") {
      const data = await axios.get(
        `http://localhost:5000/hotels/gethotelbyid/${id}`
      );
    } else if (path === "users") {
      const data = await axios.get(
        `http://localhost:5000/user/getuserbyid/${id}`
      );
      console.log(data.data);
    }
  };
  const deleteColumn = [
    {
      field: "delete",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </button>
        );
      },
    },
  ];
  const viewColumn = [
    {
      field: "view",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-primary"
            onClick={() => handleView(params.row._id)}
          >
            View
          </button>
        );
      },
    },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={list}
        columns={header.concat(viewColumn, deleteColumn)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={(row) => row._id}
        loading={loading}
      />
    </Box>
  );
};

export default DataTable;
