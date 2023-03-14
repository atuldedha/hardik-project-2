import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Arrow from "../../../../images/arrowGray.svg";
import ArrowBlue from "../../../../images/arrowBlue.svg";
import "../../../../css/Analytics/Analytics.css";

const AnalyticsItem = ({
  title,
  onClick,
  totalNumber,
  showViewMore,
  handleViewMoreClick,
}) => {
  const [viewHover, setViewHover] = useState(false);
  return (
    <Box
      sx={{
        padding: "10px 0 10px 0",
        bgcolor: "var(--gray2)",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h5"
        component="h5"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "300",
          fontSize: "20px",
          lineHeight: "35px",
          color: "var(--darkGray)",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="h5"
        component="h5"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "500",
          fontSize: "30px",
          lineHeight: "46px",
          color: "var(--darkGray)",
          marginBottom: "14px",
          textAlign: "center",
        }}
      >
        {totalNumber}
      </Typography>

      {showViewMore ? (
        <Typography
          variant="h5"
          component="h5"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "300",
            fontSize: "16px",
            lineHeight: "23px",
            color: "var(--darkGray)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            alignSelf: "flex-end",
            paddingRight: "22px",
            transition: "0.5s ease-in-out",
            ":hover": {
              cursor: "pointer",
              transform: "scale(1.2)",
              color: "var(--blue1)",
            },
          }}
          onMouseEnter={() => setViewHover(true)}
          onMouseLeave={() => setViewHover(false)}
          onClick={handleViewMoreClick}
        >
          view more
          <img
            src={viewHover ? ArrowBlue : Arrow}
            alt="arrow"
            className="arrowIcon"
          />
        </Typography>
      ) : (
        ""
      )}
    </Box>
  );
};

export default AnalyticsItem;
