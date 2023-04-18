import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

function Media(props) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      <Box sx={{ width: 210, marginRight: 2, my: 5 }}>
        <Skeleton
          sx={{ ms: 2 }}
          variant="rectangular"
          width={230}
          height={270}
        />
        {/* <Box sx={{ pt: 0.5 }}> */}
        <div className="mt-1">
          <Skeleton />
          <Skeleton width="70%" />
          <Skeleton />
          <Skeleton width="70%" />
        </div>
        {/* </Box> */}
      </Box>
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

const Featured_skeleton = () => {
  return (
    <div>
      <Box sx={{ overflow: "hidden" }}>
        <Media loading />
        {/* <Media /> */}
      </Box>
    </div>
  );
};

export default Featured_skeleton;
