import { Module } from "../model-layout-inflator/layout";
import React, { useContext, useRef } from "react";
import { PaddedRegion, MaterialPage } from "../model-layout-inflator/layout";
import { Route } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AnalyticsFinancialYear from "../model-layout-inflator/components/Analytics/AnalyticsFinancialYear/AnalyticsFinancialYear";
import AnalyticsInfo from "../model-layout-inflator/components/Analytics/AnalyticsInfo/AnalyticsInfo";
import AnalyticsLineChart from "../model-layout-inflator/components/Analytics/AnalyticsLineChart/AnalyticsLineChart";
import JobStatistics from "../model-layout-inflator/components/Analytics/JobStatistics/JobStatistics";
import CollegeNetwork from "../model-layout-inflator/components/Analytics/CollegeNetworks/CollegeNetwork";
import DriveStatistics from "../model-layout-inflator/components/Analytics/DriveStatistics/DriveStatistics";
import { DrawerOpenContext } from "../context";
import { DrawerAppContent } from "rmwc";
import "../css/Analytics/Analytics.css";
// import {
//   IdField,
//   LazyForeignKeyField,
//   NumericField,
//   PlainTextField,
//   LongTextField,
//   Model,
// } from "../model-layout-inflator/models";
// import { Relation } from "../model-layout-inflator/models/fields";

export class AnalyticsModule extends Module {
  getAuthedRoutes() {
    const { open } = useContext(DrawerOpenContext);
    // const jobStatRef = useRef();
    // const collegeNetworkRef = useRef();
    // const driveStatRef = useRef();

    const handleNavigation = (sectionName) => {
      if (sectionName === "job") {
        // jobStatRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (sectionName === "college") {
        // collegeNetworkRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (sectionName === "drive") {
        // driveStatRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    return [
      <Route
        key={"analytics"}
        path={"/analytics"}
        element={
          <MaterialPage title={"Analytics"}>
            <Box
              sx={{
                marginTop: "20px",
                padding: "0 55px",
                marginBottom: "130px !important",
                width: open ? "calc(100% - 100px)" : "100%",
                // overflowX: "hidden",
              }}
            >
              {/*financial year text */}
              <Box>
                <AnalyticsFinancialYear />
              </Box>

              {/* Analytics Info Cards */}
              <AnalyticsInfo handleNavigation={handleNavigation} />

              {/* current Date Text */}
              <Typography
                component="span"
                sx={{
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: "300",
                  color: "black",
                  fontSize: "16px",
                  lineHeight: "23px",
                  display: "flex",
                  marginTop: "10px",
                  gap: "6px",
                  marginBottom: "2px",
                }}
              >
                Till Date:
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "700",
                    fontSize: "18px",
                    lineHeight: "29px",
                  }}
                >
                  *
                </Typography>
              </Typography>
              {/* Line Chart */}
              <AnalyticsLineChart />

              {/* job statistics */}
              <JobStatistics innerRef={null} />

              {/* college netwrok */}
              <CollegeNetwork innerRef={null} />

              {/* drive stats */}
              <DriveStatistics innerRef={null} />
            </Box>
          </MaterialPage>
        }
        exact
      />,
    ];
  }

  getNavLinks() {
    return [{ label: "Analytics", to: "/analytics", icon: "analytics" }];
  }
}
