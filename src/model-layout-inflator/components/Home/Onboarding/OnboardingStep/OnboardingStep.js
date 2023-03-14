import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProgressBar from "../../../ProgressBar/ProgressBar";

const OnboardingStep = ({
  name,
  acheivedPercentage,
  fullWidthColor,
  acheivedWidthColor,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginBottom: "20px",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          component="span"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            lineHeight: "29px",
          }}
        >
          {name}
        </Typography>

        <ProgressBar
          fullWidthColor={fullWidthColor}
          acheivedPercentage={acheivedPercentage}
          acheivedWidthColor={acheivedWidthColor}
          showPercentage
        />
      </Box>
    </Box>
  );
};

export default OnboardingStep;
