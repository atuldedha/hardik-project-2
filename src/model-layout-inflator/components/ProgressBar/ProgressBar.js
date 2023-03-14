import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const ProgressBar = ({
  acheivedPercentage,
  fullWidthColor,
  acheivedWidthColor,
  showPercentage,
}) => {
  return (
    <Box>
      {showPercentage && (
        <Typography
          sx={{
            width: acheivedPercentage,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
          }}
        >
          {acheivedPercentage}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "20px",
          bgcolor: fullWidthColor,
          height: "16px",
        }}
      >
        <Box
          sx={{
            width: acheivedPercentage,
            bgcolor: acheivedWidthColor,
            borderRadius: "20px",
            height: "100%",
          }}
        />
      </Box>
    </Box>
  );
};

export default ProgressBar;
