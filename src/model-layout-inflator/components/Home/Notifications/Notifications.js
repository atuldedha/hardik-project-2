import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Arrow from "../../../../images/downGray.svg";

const boldTextStyle = {
  fontFamily: "Roboto, sans-serif",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "23px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "black",
  marginBottom: "20px",
  display: "inline-block",
};

const Notifications = () => {
  const [showArrowDown, setShowArrowDown] = useState(false);
  const [showArrowUp, setShowArrowUp] = useState(false);

  const scrollUp = () => {
    document.getElementById("scrollContainer").scrollTop -= 15;
  };

  const scrollDown = () => {
    document.getElementById("scrollContainer").scrollTop += 15;
  };
  return (
    <Box
      sx={{
        border: "1px solid var(--darkGray)",
        borderRadius: "20px",
        bgcolor: "var(--blue2)",
        padding: "30px 50px",
      }}
    >
      <Typography
        component="span"
        variant="h5"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 300,
          fontSize: "30px",
          lineHeight: "46px",
          color: "black",
          display: "inline-block",
          marginBottom: "25px",
        }}
      >
        Notifications
      </Typography>

      <Box sx={{ height: "250px", overflowY: "auto" }} id="scrollContainer">
        <Typography sx={{ ...boldTextStyle }}>
          Fermentum leo vel orci porta non pulvinar. Sit amet venenatis urna
          cursus
        </Typography>
        <Typography sx={{ ...boldTextStyle }}>
          Eget dolor morbi non arcu. Nulla pharetra diam sit amet nisl suscipit
          adipiscing bibendum.
        </Typography>

        <Typography sx={{ ...boldTextStyle, fontWeight: 400 }}>
          Vitae justo eget magna fermentum iaculis eu non. Sapien faucibus et
          molestie ac feugiat sed.
        </Typography>
        <Typography sx={{ ...boldTextStyle, fontWeight: 400 }}>
          Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare.
        </Typography>
        <Typography sx={{ ...boldTextStyle, fontWeight: 400 }}>
          Sollicitudin ac orci phasellus egestas tellus. Dictumst quisque
          sagittis purus sit amet volutpat consequat mauris nunc.
        </Typography>
        <Typography sx={{ ...boldTextStyle, fontWeight: 400 }}>
          Vitae justo eget magna fermentum iaculis eu non. Sapien faucibus et
          molestie ac feugiat sed.
        </Typography>
        <Typography sx={{ ...boldTextStyle, fontWeight: 400 }}>
          Pulvinar mattis nunc sed blandit libero volutpat sed cras ornare.
        </Typography>
        <Typography sx={{ ...boldTextStyle, fontWeight: 400 }}>
          Sollicitudin ac orci phasellus egestas tellus. Dictumst quisque
          sagittis purus sit amet volutpat consequat mauris nunc.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
            opacity: showArrowUp ? "1" : "0",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={() => setShowArrowUp(true)}
          onMouseLeave={() => setShowArrowUp(false)}
        >
          <img
            src={Arrow}
            alt="arrow"
            className={`arrowImage rotate`}
            onClick={showArrowUp ? scrollUp : () => {}}
          />
        </Box>

        <Box
          sx={{
            width: "40px",
            height: "40px",
            opacity: showArrowDown ? "1" : "0",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={() => setShowArrowDown(true)}
          onMouseLeave={() => setShowArrowDown(false)}
        >
          <img
            src={Arrow}
            alt="arrow"
            className={`arrowImage`}
            onClick={showArrowDown ? scrollDown : () => {}}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Notifications;
