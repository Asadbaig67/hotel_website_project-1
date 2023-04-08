import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import axios from "axios";

const DataTable = ({ url, path }) => {
  const { header } = useSelector((state) => state.setHeader);
  const dispatch = useDispatch();
  // const {view}=useSelector((state)=>state.view)
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

  const [list, setList] = useState([]);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    let data;
    if (path === "hotels" || path === "hotelRequests") {
      data = await axios.delete(
        `http://localhost:5000/hotels/deletehotel/${id}`
      );
    } else if (path === "users") {
      data = await axios.delete(`http://localhost:5000/user/delete/${id}`);
    } else if (path === "parkings" || path === "parkingRequests") {
      data = await axios.delete(
        `http://localhost:5000/parking/deleteparking/${id}`
      );
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests"
    ) {
      data = await axios.delete(
        `http://localhost:5000/hotelandparking/deletehotelandparking/${id}`
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
  };

  const handleView = async (id) => {
    let data;
    if (path === "hotels" || path === "hotelRequests") {
      data = await axios.get(`http://localhost:5000/hotels/gethotelbyid/${id}`);
    } else if (path === "users") {
      data = await axios.get(`http://localhost:5000/user/getuserbyid/${id}`);
    } else if (path === "parkings" || path === "parkingRequests") {
      data = await axios.get(
        `http://localhost:5000/parking/getParkingById/${id}`
      );
    } else if (
      path === "HotelsAndParkings" ||
      path === "hotelAndParkingRequests"
    ) {
      data = await axios.get(
        `http://localhost:5000/hotelandparking/gethotelandparkingbyid/${id}`
      );
    }
    console.log(data);
  };

  const handleApprove = async (id) => {
    let data;
    if (path === "hotelRequests") {
      data = await axios.put(`http://localhost:5000/hotels/approvehotel/${id}`);
    } else if (path === "parkingRequests") {
      data = await axios.put(
        `http://localhost:5000/parking/approveParking/${id}`
      );
    } else if (path === "hotelAndParkingRequests") {
      data = await axios.put(
        `http://localhost:5000/hotelandparking/approveHotelAndParking/${id}`
      );
    }
    if (data) setList(list.filter((item) => item._id !== id));
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
  const approveColumn = [
    {
      field: "approve",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        return (
          <button
            className="btn btn-primary"
            onClick={() => handleApprove(params.row._id)}
          >
            Approve
          </button>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={list}
        columns={header.concat(viewColumn, deleteColumn, approveColumn)}
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
