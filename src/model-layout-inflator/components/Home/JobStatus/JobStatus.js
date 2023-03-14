import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { jobStatusData } from "../staticData";

const JobStatus = () => {
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
          lineHeight: "47px",
          color: "black",
          marginBottom: "10px",
          display: "inline-block",
        }}
      >
        Job Status
      </Typography>

      <table className="homeJobStatusTable" cellPadding={5}>
        <thead>
          <tr className="homeJobStatusTableHeader">
            <th align="center" style={{ paddingRight: "25px" }}>
              Title
            </th>
            <th align="center" className="homeJobStatusTableLargeWidth">
              Total Openings
            </th>
            <th align="center">Filled</th>
            <th aria-label="action" />
          </tr>
        </thead>
        <tbody>
          {jobStatusData.map((data) => (
            <tr key={data.id}>
              <td className="homeJobStatusTableData">{data.title}</td>
              <td className="homeJobStatusTableData alignCenter">
                {data.totalOpenings}
              </td>
              <td className="homeJobStatusTableData alignCenter">
                {data.filled}
              </td>
              <td>
                <Box
                  sx={{
                    border: "1px solid var(--darkGray)",
                    borderRadius: "10px",
                    padding: "2px 20px",
                    textAlign: "center",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: "300",
                    fontSize: "14px",
                    lineHeight: "25px",
                    color: "var(--darkGray)",
                    transition: "0.5s ease-in-out",
                    ":hover": {
                      cursor: "pointer",
                      bgcolor: "var(--darkGray)",
                      color: "white",
                    },
                  }}
                >
                  View
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
};

export default JobStatus;
