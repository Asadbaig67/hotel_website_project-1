import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

const DatagridHeader = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography variant="h3" color="#141414">
        {title}
      </Typography>
      <Typography variant="h5" color="#3da58a">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default DatagridHeader;
