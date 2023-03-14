import { Typography } from "@mui/material";
import React from "react";
import CollegeItem from "./CollegeItem/CollegeItem";

const College = ({ heading, data }) => {
  return (
    <>
      <Typography
        component="span"
        variant="h5"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "300",
          fontSize: "25px",
          lineHeight: "41px",
          color: "black",
          display: "inline-block",
          height: "100px",
        }}
      >
        {heading}
      </Typography>

      {data.map((data) => (
        <CollegeItem key={data.id} name={data.collegeName} image={data.image} />
      ))}
    </>
  );
};

export default College;
