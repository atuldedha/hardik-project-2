import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import AnalyticsItem from "../AnalyticsItem/AnalyticsItem";
import Connections from "../Connections/Connections";
import PieChartInfo from "../PieChartInfo/PieChartInfo";
import { tierData } from "../staticData";

const CollegeNetwork = ({ innerRef }) => {
  // tier wise hiring data
  const [tierChartData, setTierChartData] = useState({
    labels: tierData.map((item) => item.name),
    datasets: [
      {
        label: "Applicants",
        data: tierData.map((item) => item.value),
        backgroundColor: ["#9F629A", "#FFD76F", "#E37C7C"],
      },
    ],
  });
  return (
    <Box sx={{ marginTop: "100px" }} ref={innerRef}>
      {/* heading */}
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          fontSize: "30px",
          lineHeight: "47px",
          color: "var(--darkGray)",
          marginBottom: "20px",
          display: "inline-block",
        }}
      >
        College Network
      </Typography>

      {/* statistics info */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "3fr 3fr 3fr",
          gap: "35px",
        }}
      >
        <AnalyticsItem title="Total Connections" totalNumber={179} />
        <AnalyticsItem title="New Connections" totalNumber={51} />
      </Box>

      {/* connections and tier wise hiring chart */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr",
          gap: "20px",
          height: "250px",
          marginTop: "20px",
        }}
      >
        {/* custom component to represent experience bar chart */}
        <PieChartInfo
          chartData={tierChartData}
          heading="Tier Wise Hiring"
          paddingLeft={100}
        />
        {/* connections */}
        <Connections />
      </Box>
    </Box>
  );
};

export default CollegeNetwork;
