import React, { useContext } from "react";
import {
  Elevation,
  TopAppBar,
  TopAppBarFixedAdjust,
  TopAppBarNavigationIcon,
  TopAppBarSection,
  TopAppBarTitle,
  Typography,
} from "rmwc";
import "rmwc/dist/styles";
import { DrawerOpenContext } from "../context";
import { createSnackbarQueue } from "@rmwc/snackbar";

export const MaterialPage = ({
  title = "",
  children = <></>,
  noDrawer = false,
}) => {
  const { open, toggle } = useContext(DrawerOpenContext);
  return (
    <>
      <TopAppBar title={title}>
        <TopAppBarSection alignStart>
          {noDrawer ? (
            <></>
          ) : (
            <TopAppBarNavigationIcon
              icon={"menu"}
              onClick={() => {
                toggle();
              }}
            ></TopAppBarNavigationIcon>
          )}
          <TopAppBarTitle>{title}</TopAppBarTitle>
        </TopAppBarSection>
      </TopAppBar>
      <TopAppBarFixedAdjust>
        <div
          style={{
            display: "flex",
            width: "100%",
            // height: "calc(100vh - 30px)",
          }}
        >
          {children}
        </div>
      </TopAppBarFixedAdjust>
    </>
  );
};

export const PaddedRegion = ({
  maxWidth = "720px",
  innerPadding = "12px",
  marginTop = "6px",
  children = <></>,
  elevation = 0,
  wrap = false,
  rounded = true,
  marginLeft = "auto",
  marginRight = "auto",
}) => {
  return (
    <div
      style={{
        maxWidth: maxWidth,
        width: "100%",
        height: "100%",
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginTop: marginTop,
      }}
    >
      <Elevation
        z={elevation}
        wrap={wrap}
        style={{ ...(rounded ? { borderRadius: "6px" } : {}) }}
      >
        <div style={{ width: "100%", height: "100%", padding: innerPadding }}>
          {children}
        </div>
      </Elevation>
    </div>
  );
};

export const snackBarQueue = createSnackbarQueue();

export class Module {
  getNavLinks() {
    return [];
  }

  getAuthedRoutes() {
    return [];
  }

  getUnAuthedRoutes() {
    return [];
  }
}

export const NotAccessiblePage = () => {
  return (
    <MaterialPage>
      <Typography use="headline3">Not Accessible</Typography>
    </MaterialPage>
  );
};
