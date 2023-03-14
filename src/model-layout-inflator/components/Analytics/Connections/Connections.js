import { Box, Typography } from "@mui/material";
import React from "react";
import ProgressBar from "../../ProgressBar/ProgressBar";

const textStyle = {
  fontFamily: "Roboto, sans-serif",
  fontWeight: 300,
  fontSize: "15px",
  textAlign: "center",
  lineHeight: "18px",
};
const Connections = () => {
  return (
    <Box
      sx={{
        border: "1px solid var(--darkGray)",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 70px 20px",
      }}
    >
      <Typography
        variant="h5"
        component="span"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 300,
          fontSize: "20px",
          lineHeight: "23px",
          textAlign: "center",
          color: "var(--darkGray)",
        }}
      >
        Connections
      </Typography>

      <Box
        sx={{
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70px",
          }}
        >
          <Typography variant="h5" component="span" sx={{ ...textStyle }}>
            Received
          </Typography>
          <Typography variant="h5" component="span" sx={{ ...textStyle }}>
            100
          </Typography>
        </Box>
        {/* progress filled bar */}
        <Box sx={{ width: "300px" }}>
          <ProgressBar
            fullWidthColor="#C9E5D0"
            acheivedPercentage="77%"
            acheivedWidthColor="#67C587"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
            fontSize: "15px",
            textAlign: "center",
            lineHeight: "18px",
            width: "70px",
          }}
        >
          <Typography variant="h5" component="span" sx={{ ...textStyle }}>
            Accepted
          </Typography>
          <Typography variant="h5" component="span" sx={{ ...textStyle }}>
            77
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          marginTop: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "70px",
          }}
        >
          <Typography variant="h5" component="span" sx={{ ...textStyle }}>
            Sent
          </Typography>
          <Typography variant="h5" component="span" sx={{ ...textStyle }}>
            100
          </Typography>
        </Box>
        {/* progress filled bar */}
        <Box sx={{ width: "300px" }}>
          <ProgressBar
            fullWidthColor="#CBB6F8"
            acheivedPercentage="26%"
            acheivedWidthColor="#5E3FBE"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 300,
            fontSize: "15px",
            textAlign: "center",
            lineHeight: "18px",
            width: "70px",
          }}
        >
          <Typography variant="h5" component="span" sx={{ ...textStyle }}>
            Accepted
          </Typography>
          <Typography variant="h5" component="span" sx={{ ...textStyle }}>
            26
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Connections;
