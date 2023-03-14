import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ArrowDown from "../../../../images/downGray.svg";
import "../../../../css/Analytics/Analytics.css";

const AnalyticsFinancialYear = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: "10px",
        gap: "10px",
        width: "100%",
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "400",
          fontSize: "18px",
          leading: "29px",
          color: "black",
        }}
      >
        Financial Year:{" "}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid var(--darkGray)",
          padding: "2px 14px",
          borderRadius: "10px",
          gap: "10px",
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "300",
            fontSize: "14px",
            lineHeight: "24px",
            color: "var(--darkGray)",
          }}
        >
          2023
        </Typography>
        <img src={ArrowDown} alt="arrow" className="analyticsArrowDown" />
      </Box>
    </Box>
  );
};

export default AnalyticsFinancialYear;
