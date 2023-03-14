/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import data from "./staticData";
// import Chart from "chart.js/auto";
// import { Chart } from "chart.js";
import { Chart } from "chart.js";
import { Box } from "@mui/system";
import LineChart from "./LineChart/LineChart";
import { Typography } from "@mui/material";
import HiringGraphModal from "./HiringGraphModal/HiringGraphModal";
const AnalyticsLineChart = () => {
  const [chartData, setChartData] = useState({
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Hired",
        data: data.map((item) => item.value),
        borderWidth: 2,
        borderColor: "#00A3FF",
      },
    ],
  });
  const [openHiringGraph, setOpenHiringGraph] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "12px 72px 10px 22px",
          border: "1px solid var(--darkGray)",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h5"
          component="span"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "700",
            fontSize: "30px",
            lineHeight: "47px",
            color: "black",
            marginBottom: "5px",
            marginLeft: "50px",
          }}
        >
          Hiring Graph
        </Typography>

        {/* line chart custom component */}
        <LineChart
          chartData={chartData}
          openModal={() => setOpenHiringGraph(true)}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            component="span"
            variant="h5"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "16px",
              color: "black",
              marginBottom: "",
              cursor: "pointer",
            }}
            onClick={() => setOpenHiringGraph(true)}
          >
            know more...
          </Typography>
        </Box>
      </Box>
      <HiringGraphModal
        open={openHiringGraph}
        closeModal={() => setOpenHiringGraph(false)}
      />
    </>
  );
};

export default AnalyticsLineChart;
