import "./App.css";
import { DrawerAppContent, SnackbarQueue } from "rmwc";
import { useContext, useState } from "react";
import { DrawerOpenContext, AuthContext } from "./context";
import { snackBarQueue } from "./model-layout-inflator/layout";
import React from "react";
import "rmwc/dist/styles";
import { BrowserRouter, Routes } from "react-router-dom";
import { HomeModule } from "./modules/home";
import { CollapsibleDrawer } from "./model-layout-inflator/drawer";
import { Job } from "./modules/jobs";
import { College } from "./modules/college";
import { Drive } from "./modules/drive";
import { Student } from "./modules/student";
import { AnalyticsModule } from "./modules/analytics";

function App({
  modules = [
    new HomeModule(),
    Job.module,
    College.module,
    Drive.module,
    Student.module,
    new AnalyticsModule(),
  ],
}) {
  const { open } = useContext(DrawerOpenContext);
  const { user } = useContext(AuthContext);
  const unAuthedRoutes = modules.reduce(
    (accumulator, current) => [...accumulator, ...current.getAuthedRoutes()],
    []
  );
  const authedRoutes = modules.reduce(
    (accumulator, current) => [...accumulator, ...current.getAuthedRoutes()],
    []
  );
  const navLinks = modules.reduce(
    (accumulator, current) => [...accumulator, ...current.getNavLinks()],
    []
  );
  return (
    <>
      <BrowserRouter>
        {/* <DrawerOpenContext.Provider value={{ open, setOpen }}> */}
        {user === null || user === undefined ? (
          <CollapsibleDrawer user={user} navLinks={navLinks} open={open} />
        ) : (
          <CollapsibleDrawer user={user} navLinks={navLinks} open={open} />
        )}
        <DrawerAppContent style={{ height: "100vh" }}>
          <Routes>
            {user === null || user === undefined
              ? unAuthedRoutes
              : authedRoutes}
          </Routes>
        </DrawerAppContent>
        {/* </DrawerOpenContext.Provider> */}
        <SnackbarQueue messages={snackBarQueue.messages} stacked />
      </BrowserRouter>
    </>
  );
}

export default App;
