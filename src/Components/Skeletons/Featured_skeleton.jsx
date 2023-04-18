import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const Featured_skeleton = () => {
  const data = [1, 2, 3, 3];

  return (
    <div className="container-fluid ">
      <div className="row mx-auto justify-content-center">
        {data.map((item) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 my-2">
              <Skeleton
                sx={{ ms: 2 }}
                variant="rectangular"
                width={240}
                height={272}
              />
              <Skeleton width={130} className="mt-1" />
              <div className="d-flex flex-row">
                <Skeleton width="100px" />
                <Skeleton width="50px" className="ms-2" />
              </div>
              <Skeleton width={240} className="mt-1" />
              <Skeleton width={240} className="" />
              <div className="">
                <Skeleton width={240} height={70} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featured_skeleton;
