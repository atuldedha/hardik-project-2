import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BarChart from "../BarChart/BarChart";

const BarChartInfo = ({
  chartData,
  heading,
  xAxisLabel,
  yAxisLabel,
  showLegend,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        border: "1px solid var(--darkGray)",
        borderRadius: "10px",
        padding: "10px 50px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "400",
          color: "var(--darkGray)",
          fontSize: "20px",
          lineHeight: "23px",
          marginBottom: "10px",
        }}
      >
        {heading}
      </Typography>
      {/* applicants chart */}
      <Box sx={{ height: "200px", width: "100%" }}>
        <BarChart
          chartData={chartData}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
          showLegend={showLegend}
        />
      </Box>
    </Box>
  );
};

export default BarChartInfo;
