import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { campusRecruitmentData } from "../staticData";
import Arrow from "../../../../images/arrowGray.svg";
import ArrowBlue from "../../../../images/arrowBlue.svg";

const CampusRecruitment = () => {
  const [viewHover, setViewHover] = useState(false);
  return (
    <Box
      sx={{
        border: "1px solid var(--darkGray)",
        borderRadius: "20px",
        padding: "35px 35px 30px 24px",
      }}
    >
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 700,
          fontSize: "30px",
          lineHeight: "37px",
          color: "black",
          marginBottom: "10px",
          display: "inline-block",
        }}
      >
        Campus Recruitment
      </Typography>

      <table className="homeCampusTable" cellPadding={10}>
        <thead>
          <tr className="homeJobStatusTableHeader">
            <th align="center">College Name</th>
            <th align="center" className="homeJobStatusTableLargeWidth">
              POC
            </th>
            <th align="center">Status</th>
          </tr>
        </thead>
        <tbody>
          {campusRecruitmentData.map((data) => (
            <tr key={data.id}>
              <td className="homeJobStatusTableData">{data.collegeName}</td>
              <td className="homeJobStatusTableData alignCenter">{data.poc}</td>
              <td className="homeJobStatusTableData alignCenter">
                {data.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography
          variant="h5"
          component="span"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "300",
            fontSize: "16px",
            lineHeight: "23px",
            color: "var(--darkGray)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            transition: "0.5s ease-in-out",
            marginTop: "24px",
            ":hover": {
              cursor: "pointer",
              transform: "scale(1.2)",
              color: "var(--blue1)",
            },
          }}
          onMouseEnter={() => setViewHover(true)}
          onMouseLeave={() => setViewHover(false)}
          onClick={() => {}}
        >
          view more
          <img
            src={viewHover ? ArrowBlue : Arrow}
            alt="arrow"
            className="arrowIcon"
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default CampusRecruitment;
