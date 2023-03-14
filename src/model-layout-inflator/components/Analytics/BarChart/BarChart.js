import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ chartData, xAxisLabel, yAxisLabel, showLegend }) => {
  return (
    // <Box>
    //   <Box sx={{ display: "flex", flexDirection: "column" }}>
    //     <Box sx={{ display: "flex", alignItems: "center" }}>
    //       <Box sx={{ width: "20px", height: "20px", bgcolor: "black" }} />
    //       <Typography>Min</Typography>
    //     </Box>
    //   </Box>
    <Box sx={{ width: "100%", height: "100%" }}>
      <Bar
        data={chartData}
        options={{
          legend: {
            // display: false,
            display: showLegend ? true : false,
            align: "end",
            position: "top",
            labels: {
              padding: 5,
            },
          },
          plugins: {
            // chart js v4
            // legend: {
            //   display: showLegend ? true : false,
            //   align: "end",
            //   position: "top",
            //   labels: {
            //     padding: 5,
            //   },
            // },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: yAxisLabel,
                },
              },
            ],
            // chatt js v4
            // y: {
            //   beginAtZero: true,
            //   title: {
            //     display: true,
            //     text: yAxisLabel,
            //   },
            // },
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: xAxisLabel,
                },
              },
            ],
            // chart js v4
            // x: {
            //   beginAtZero: true,
            //   title: {
            //     display: true,
            //     text: xAxisLabel,
            //   },
            // },
          },
        }}
      />
    </Box>
    // </Box>
  );
};

export default BarChart;
