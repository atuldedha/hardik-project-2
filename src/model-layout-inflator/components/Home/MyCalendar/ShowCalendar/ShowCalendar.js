import { Typography } from "@mui/material";
import React, { useState } from "react";
import { Calendar } from "react-calendar";

const ShowCalendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <Typography
        component="span"
        variant="h5"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 300,
          fontSize: "30px",
          lineHeight: "35px",
          color: "white",
          display: "inline-block",
          marginBottom: "10px",
        }}
      >
        Calendar
      </Typography>
      <Calendar onChange={onChange} value={value} />
    </>
  );
};

export default ShowCalendar;
