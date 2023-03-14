import { Module } from "../model-layout-inflator/layout";
import React from "react";
import { PaddedRegion, MaterialPage } from "../model-layout-inflator/layout";
import { Navigate, Route } from "react-router-dom";
import { login, signUp } from "../services/firebase-service";
import { RegistrationForm, LoginForm } from "../model-layout-inflator/forms";
import { Box } from "@mui/material";
import JobStatus from "../model-layout-inflator/components/Home/JobStatus/JobStatus";
import Notifications from "../model-layout-inflator/components/Home/Notifications/Notifications";
import CampusRecruitment from "../model-layout-inflator/components/Home/CampusRecruitment/CampusRecruitment";
import MyCalendar from "../model-layout-inflator/components/Home/MyCalendar/MyCalendar";
import ConnectedColleges from "../model-layout-inflator/components/Home/ConnectedColleges/ConnectedColleges";
import Reports from "../model-layout-inflator/components/Home/Reports/Reports";
import Onboarding from "../model-layout-inflator/components/Home/Onboarding/Onboarding";

export class HomeModule extends Module {
  getAuthedRoutes() {
    return [
      <Route key={"login"} path={"/login"} element={<Navigate to={"/"} />} />,
      <Route
        key={"register"}
        path={"/register"}
        element={<Navigate to={"/"} />}
      />,
      <Route
        key={"home"}
        path={"/"}
        element={
          <MaterialPage title={"Home"}>
            <Box
              sx={{
                marginTop: "30px",
                padding: "0 55px",
                marginBottom: "100px",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "3fr 2fr",
                  gap: "20px",
                  marginBottom: "40px",
                }}
              >
                {/* job status table component */}
                <JobStatus />
                {/* notifications column */}
                <Notifications />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "3fr 2fr",
                  gap: "20px",
                  marginBottom: "40px",
                }}
              >
                {/* campus recruitment column */}
                <CampusRecruitment />
                {/* calendar column */}
                <MyCalendar />
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2.5fr 3fr 2.5fr",
                  gap: "20px",
                }}
              >
                {/* connected colleges */}
                <ConnectedColleges />

                {/* custom component to represent job bar chart */}
                <Reports />

                {/* onboarding */}
                <Onboarding />
              </Box>
            </Box>
          </MaterialPage>
        }
        exact
      />,
    ];
  }

  getNavLinks() {
    return [{ label: "Home", to: "/", icon: "home" }];
  }

  getUnAuthedRoutes() {
    return [
      <Route
        key={"root"}
        path={"/"}
        exact
        element={<Navigate to={"login"} />}
      />,
      <Route
        key={"login"}
        path={"/login"}
        element={
          <MaterialPage title={"Login"} noDrawer>
            <PaddedRegion wrap maxWidth="360px" elevation={1}>
              {" "}
              <LoginForm
                onSubmit={async (data) => {
                  const creds = Object.fromEntries(data);
                  return await login(creds.email, creds.password);
                }}
              />{" "}
            </PaddedRegion>
          </MaterialPage>
        }
      />,
      <Route
        key={"register"}
        path={"/register"}
        element={
          <MaterialPage title={"Sign up"} noDrawer>
            <PaddedRegion wrap maxWidth="360px" elevation={1}>
              {" "}
              <RegistrationForm
                onSubmit={async (data) => {
                  const creds = Object.fromEntries(data);
                  if (creds.password !== creds.confirmPassword) {
                    throw new Error("Ensure both the passwords are same.");
                  }
                  return await signUp(creds.email, creds.password);
                }}
              />{" "}
            </PaddedRegion>
          </MaterialPage>
        }
      />,
    ];
  }
}
