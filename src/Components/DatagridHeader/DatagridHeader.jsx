import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

const DatagridHeader = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography variant="h3" color="#3da58a">
        {title}
      </Typography>
      <Typography variant="h5" color="#141414">
        {subtitle}
      </Typography>
    </Box>
  );
};

export default DatagridHeader;
