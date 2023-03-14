import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { eventsData } from "../../staticData";

const ShowEvents = () => {
  return (
    <>
      <Typography
        component="span"
        variant="h5"
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: 300,
          fontSize: "30px",
          lineHeight: "35px",
          color: "white",
          display: "inline-block",
          marginBottom: "40px",
        }}
      >
        Upcoming Events
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {eventsData.map((event) => (
          <Box
            key={event.id}
            sx={{ display: "flex", alignItems: "center", gap: "30px" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: "var(--orange1)",
                  width: "45px",
                  height: "45px",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {event.date}
              </Avatar>
              <Typography
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 300,
                  fontSize: "12px",
                  color: "var(--grayColor)",
                }}
              >
                {event.day}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
                fontSize: "16px",
                color: "var(--grayColor)",
                paddingBottom: "30px",
              }}
            >
              {event.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ShowEvents;
