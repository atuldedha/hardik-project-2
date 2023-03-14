import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import OnboardingStep from "./OnboardingStep/OnboardingStep";

const Onboarding = () => {
  return (
    <Box
      sx={{
        border: "1px solid var(--darkGray)",
        borderRadius: "10px",
        padding: "25px 20px",
      }}
    >
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 300,
          fontSize: "30px",
          lineHeight: "47px",
          color: "black",
          display: "flex",
          marginBottom: "25px",
        }}
      >
        Onboarding
      </Typography>

      <OnboardingStep
        name="Offer Accepted"
        fullWidthColor="#C9E5D0"
        acheivedPercentage="82%"
        acheivedWidthColor="#67C587"
      />
      <OnboardingStep
        name="Background Check"
        fullWidthColor="#CBB6F8"
        acheivedPercentage="75%"
        acheivedWidthColor="#5E3FBE"
      />
      <OnboardingStep
        name="Offer Accepted"
        fullWidthColor="#FFD76F"
        acheivedPercentage="70%"
        acheivedWidthColor="#FF9C09"
      />
      <OnboardingStep
        name="Offer Accepted"
        fullWidthColor="#F6AB9A"
        acheivedPercentage="20%"
        acheivedWidthColor="#FF522B"
      />
    </Box>
  );
};

export default Onboarding;
