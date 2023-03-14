import { Box } from "@mui/system";
import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData, openModal }) => {
  return (
    <Box
      sx={{ width: "100%", height: "280px", cursor: "pointer" }}
      onClick={openModal}
    >
      <Line
        data={chartData}
        options={{
          elements: {
            line: {
              tension: 0,
              fill: false,
            },
          },
          legend: {
            display: false,
          },
          // plugins: {
          //   le
          // },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            // chart js v:4
            // y: {
            //   beginAtZero: true,
            //   title: {
            //     display: true,
            //     text: "Total Hired",
            //   },
            // },

            // chartjs v:2
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Total Hired",
                },
                beginAtZero: true,
              },
            ],
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Months",
              },
            },
          },
        }}
      />
    </Box>
  );
};

export default LineChart;
