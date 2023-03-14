import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import BarChartInfo from "../BarChartInfo/BarChartInfo";
import PieChartInfo from "../PieChartInfo/PieChartInfo";
import { campusData, driveData, locationWiseData } from "../staticData";

const DriveStatistics = ({ innerRef }) => {
  //campus drive wise hiring data
  const [campusChartData, setCampusChartData] = useState({
    labels: campusData.map((item) => item.name),
    datasets: [
      {
        label: "Applicants",
        data: campusData.map((item) => item.value),
        backgroundColor: ["#E5C646", "#F9F5E5", "#F4E9BD"],
      },
    ],
  });

  // drive wise hiring data
  const [driveChartData, setDriveChartData] = useState({
    labels: driveData.map((item) => item.name),
    datasets: [
      {
        label: "Applicants",
        data: driveData.map((item) => item.value),
        backgroundColor: ["#FF7008", "#FFD28F"],
      },
    ],
  });

  //   location wise chart data
  const [locationChartData, setLocationChartData] = useState({
    labels: locationWiseData.map((item) => item.name),
    datasets: [
      {
        label: "Openings",
        data: locationWiseData.map((item) => item.value),
        backgroundColor: "#A39C00",
        borderColor: "#A39C00",
        barPercentage: 0.5,
        barThickness: 20,
      },
    ],
  });
  return (
    <Box
      sx={{
        marginTop: "100px",
      }}
      ref={innerRef}
    >
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          fontSize: "30px",
          lineHeight: "47px",
          color: "var(--darkGray)",
          display: "inline-block",
          marginBottom: "15px",
        }}
      >
        Drive Statistics
      </Typography>
      {/* pie charts */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr",
          gap: "20px",
          height: "250px",
        }}
      >
        {/* custom component to represent experience bar chart */}
        <PieChartInfo
          chartData={campusChartData}
          heading="Types of Drives"
          paddingLeft={170}
        />
        {/* custom component to represent job bar chart */}
        <PieChartInfo
          chartData={driveChartData}
          heading="New v/s Recurring Campus Drives"
          paddingLeft={100}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr",
          gap: "20px",
          height: "250px",
          marginTop: "15px",
        }}
      >
        {/* custom component to represent experience bar chart */}
        <BarChartInfo
          chartData={locationChartData}
          heading="Location-Wise Openings"
          xAxisLabel="Location"
          yAxisLabel="Openings"
        />
      </Box>
    </Box>
  );
};

export default DriveStatistics;
