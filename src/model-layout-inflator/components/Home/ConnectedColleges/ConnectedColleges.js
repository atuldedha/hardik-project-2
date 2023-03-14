import React, { useState } from "react";
import { Box } from "@mui/system";
import { collegeData } from "../staticData";
import ArrowDown from "../../../../images/downGray.svg";
import College from "./College";

const ConnectedColleges = () => {
  // state to manage right arrow
  const [showArrowRight, setShowArrowRight] = useState(false);
  // state to manage left arrow
  const [showArrowLeft, setShowArrowLeft] = useState(false);
  // state to show new colleges
  const [showNewCollege, setShowNewCollege] = useState(false);
  // state to show recent college
  const [showRecentCollege, setShowRecentCollege] = useState(true);

  const activeNewClgSlide = () => {
    setShowRecentCollege(false);
    setShowNewCollege(true);
  };

  const activeRecentClgSlide = () => {
    setShowNewCollege(false);
    setShowRecentCollege(true);
  };
  return (
    <Box
      sx={{
        border: "1px solid var(--darkGray)",
        borderRadius: "20px",
        bgcolor: "var(--blue2)",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* left nimation */}
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: showRecentCollege ? "20px" : "-50px",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease-in-out",
          opacity: showRecentCollege ? "1" : "0",
        }}
      >
        {/* custom component to render data */}
        <College heading="Recently Connected" data={collegeData} />
      </Box>

      {/* right animation box */}
      <Box
        sx={{
          position: "absolute",
          right: showNewCollege ? "130px" : "-50px",
          top: "20px",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.2s ease-in-out",
          opacity: showNewCollege ? "1" : "0",
        }}
      >
        {/* custom component to render data */}
        <College heading="New Colleges" data={collegeData} />
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
          src={ArrowDown}
          alt="icon"
          onClick={showArrowRight ? activeNewClgSlide : () => {}}
          className={`arrowDownImage ${
            showArrowRight ? "showImageRight" : "hideImageRight"
          }`}
        />
      </Box>

      {/* left arrow */}
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
          src={ArrowDown}
          alt="icon"
          onClick={showArrowLeft ? activeRecentClgSlide : () => {}}
          className={`arrowDownImageLeft ${
            showArrowLeft ? "showImageRight" : "hideImageRight"
          }`}
        />
      </Box>
    </Box>
  );
};

export default ConnectedColleges;
