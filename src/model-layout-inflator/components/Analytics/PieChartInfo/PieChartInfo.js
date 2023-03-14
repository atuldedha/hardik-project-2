import { Box, Typography } from "@mui/material";
import React from "react";
import PieChart from "../PieChart/PieChart";

const PieChartInfo = ({ chartData, heading, paddingLeft }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px solid var(--darkGray)",
        borderRadius: "10px",
        padding: "20px 10px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "400",
          color: "var(--darkGray)",
          fontSize: "20px",
          lineHeight: "23px",
          marginBottom: "20px",
        }}
      >
        {heading}
      </Typography>
      {/* applicants chart */}
      <Box sx={{ height: "100%", width: "100%" }}>
        <PieChart chartData={chartData} paddingLeft={paddingLeft} />
      </Box>
    </Box>
  );
};

export default PieChartInfo;
