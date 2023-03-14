import { Box } from "@mui/system";
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import ArrowRightGray from "../../../../images/arrowRightGray.svg";
import ShowCalendar from "./ShowCalendar/ShowCalendar";
import ShowEvents from "./ShowEvents/ShowEvents";

const MyCalendar = () => {
  // states to show left arrow
  const [showArrowLeft, setShowArrowLeft] = useState(false);
  // state to show right arrow
  const [showArrowRight, setShowArrowRight] = useState(false);
  // state to show calendar
  const [showCalendar, setShowCalendar] = useState(true);
  // state to show events
  const [showEvents, setShowEvents] = useState(false);

  // onClick handlers to show and hide calendar or events
  const activateEvents = () => {
    setShowCalendar(false);
    setShowEvents(true);
  };

  const activateCalendar = () => {
    setShowEvents(false);
    setShowCalendar(true);
  };

  return (
    <Box
      sx={{
        bgcolor: "var(--darkGray)",
        border: "1px solid var(--darkGray)",
        borderRadius: "20px",
        padding: "35px 35px 30px 24px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "35px",
          left: showCalendar ? "24px" : "-50px",
          width: "100%",
          transition: "all 0.2s ease-in-out",
          opacity: showCalendar ? "1" : "0",
          height: showCalendar ? "90%" : "0",
        }}
      >
        <ShowCalendar />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "35px",
          right: showEvents ? "-35px" : "-50px",
          width: "100%",
          transition: "all 0.2s ease-in-out",
          opacity: showEvents ? "1" : "0",
          height: showEvents ? "90%" : "0",
        }}
      >
        <ShowEvents />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          position: "absolute",
          bottom: "30px",
          right: "35px",
        }}
      >
        <Box
          sx={{
            border: "2px solid var(--grayColor)",
            borderRadius: "20px",
            padding: "10px 40px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "20px",
            color: "var(--grayColor)",
            width: "max-content",
            transition: "0.5s ease-in-out",
            ":hover": {
              cursor: "pointer",
              bgcolor: "var(--grayColor)",
              color: "var(--darkGray)",
            },
          }}
        >
          View all Events
        </Box>
      </Box>

      {/* right arrow */}
      <Box
        onMouseEnter={() => setShowArrowRight(true)}
        onMouseLeave={() => setShowArrowRight(false)}
        sx={{
          position: "absolute",
          top: "40%",
          right: "10px",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          transition: "1s ease-in-out",
        }}
      >
        <img
          src={ArrowRightGray}
          alt="icon"
          onClick={showArrowRight ? activateEvents : () => {}}
          className={`arrowImage ${
            showArrowRight ? "showImageRight" : "hideImageRight"
          }`}
        />
      </Box>

      {/* left Arrow */}
      <Box
        onMouseEnter={() => setShowArrowLeft(true)}
        onMouseLeave={() => setShowArrowLeft(false)}
        sx={{
          position: "absolute",
          top: "40%",
          left: "0px",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transition: "1s ease-in-out",
        }}
      >
        <img
          src={ArrowRightGray}
          alt="icon"
          onClick={showArrowLeft ? activateCalendar : () => {}}
          className={`arrowImage rotate ${
            showArrowLeft ? "showImageRight" : "hideImageRight"
          }`}
        />
      </Box>
    </Box>
  );
};

export default MyCalendar;
