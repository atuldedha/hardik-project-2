import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import BarChart from "../../Analytics/BarChart/BarChart";
import { jobTypeData } from "../../Analytics/staticData";

const Reports = () => {
  // ctc bar chart data
  const [ctcChartData, setCtcChartData] = useState({
    labels: jobTypeData.map((item) => item.name),
    datasets: [
      {
        label: "Max",
        data: jobTypeData.map((item) => item.max / 10),
        backgroundColor: "#FF9C09",
        borderColor: "#FF9C09",
        barPercentage: 0.5,
        barThickness: 20,
      },
      {
        label: "Min",
        data: jobTypeData.map((item) => item.value / 10),
        backgroundColor: "#FFD76F",
        borderColor: "#FFD76F",
        barPercentage: 0.5,
        barThickness: 20,
      },
    ],
  });
  return (
    <Box
      sx={{
        border: "1px solid var(--darkGray)",
        borderRadius: "10px",
        padding: "25px 20px",
      }}
    >
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 300,
          fontSize: "30px",
          lineHeight: "47px",
          color: "black",
          display: "flex",
          marginBottom: "25px",
          marginLeft: "40px",
        }}
      >
        Reports
      </Typography>

      <Box sx={{ width: "100%", height: "60%", marginBottom: "25px" }}>
        <BarChart
          chartData={ctcChartData}
          xAxisLabel="Job Type"
          yAxisLabel="CTC Offered (in lakhs)"
          showLegend
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            border: "2px solid var(--darkGray)",
            borderRadius: "20px",
            padding: "10px 40px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "20px",
            color: "var(--darkGray)",
            width: "max-content",
            transition: "0.5s ease-in-out",
            ":hover": {
              cursor: "pointer",
              bgcolor: "var(--darkGray)",
              color: "white",
            },
          }}
        >
          View all Reports
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
