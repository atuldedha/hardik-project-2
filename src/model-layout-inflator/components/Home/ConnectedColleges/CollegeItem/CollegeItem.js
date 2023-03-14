import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const CollegeItem = ({ image, name }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "8px",
      }}
    >
      <Avatar alt="image" src={image} sx={{ width: "30px", height: "30px" }} />
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 300,
          fontSize: "20px",
          lineHeight: "26px",
          color: "black",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default CollegeItem;
