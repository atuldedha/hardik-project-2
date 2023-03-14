import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import LineChart from "../LineChart/LineChart";
import data from "../staticData";
import "../../../../../css/Analytics/Analytics.css";

const containerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.4)",
  display: "flex",
  zIndex: 9999,
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
};

const modalContainerStyle = {
  display: "flex",
  flexDirection: "column",
  background: "#eeeeee",
  borderRadius: "0.9375em",
  width: "70%",
  padding: "20px 30px",
};

const HiringGraphModal = (props) => {
  const ref = useRef();
  const [chartData, setChartData] = useState({
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Hired",
        data: data.map((item) => item.value),
        borderWidth: 2,
        borderColor: "#00A3FF",
      },
    ],
  });
  const [selectedYear, setSelectedYear] = useState("2023");
  const years = ["2023", "2022", "2021", "2020", "2019", "2018"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.closeModal();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props, ref]);

  if (document.querySelector("body")) {
    if (props.open) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  }

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return props.open ? (
    <Box sx={{ ...containerStyle }}>
      <Box sx={{ ...modalContainerStyle }} ref={ref}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component="span"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "700",
              fontSize: "30px",
              lineHeight: "47px",
              color: "black",
              marginBottom: "5px",
              marginLeft: "50px",
            }}
          >
            Hiring Graph
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid var(--darkGray)",
              padding: "5px 18px",
              borderRadius: "10px",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            <select
              value={selectedYear}
              onChange={handleChange}
              className="analyticsModalDropdown"
            >
              {years.map((year) => (
                <option key={year} value={year} id={year}>
                  {year}
                </option>
              ))}
            </select>
          </Box>
        </Box>
        <LineChart chartData={chartData} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            component="span"
            variant="h5"
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "400",
              fontSize: "12px",
              lineHeight: "16px",
              marginBottom: "5px",
              cursor: "pointer",
              border: "1px solid var(--darkGray)",
              padding: "6px 20px",
              borderRadius: "10px",
              color: "var(--darkGray)",
              transition: "0.5s ease-in-out",
              ":hover": {
                cursor: "pointer",
                bgcolor: "var(--darkGray)",
                color: "white",
              },
            }}
          >
            + Add
          </Typography>
        </Box>
      </Box>
    </Box>
  ) : null;
};

export default HiringGraphModal;
