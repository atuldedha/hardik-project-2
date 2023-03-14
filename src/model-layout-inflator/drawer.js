import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
  List,
  ListDivider,
  ListItem,
  ListItemGraphic,
  ListItemText,
  DrawerSubtitle,
  Button,
  Avatar,
} from "rmwc";
import "../css/Home/Home.css";

const CollapsibleDrawerNavLink = ({
  label = "Label",
  to = "/",
  icon = null,
}) => {
  return (
    <NavLink style={{ textDecoration: "none" }} to={to}>
      {({ isActive }) => (
        <ListItem activated={isActive}>
          {icon === null ? <></> : <ListItemGraphic icon={icon} />}
          <ListItemText>{label}</ListItemText>
        </ListItem>
      )}
    </NavLink>
  );
};

export const CollapsibleDrawer = ({
  navLinks = [],
  open = false,
  user = null,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(open);
  useEffect(() => setDrawerOpen(open), [open]);
  return (
    <Drawer dismissible open={drawerOpen}>
      <DrawerHeader>
        {user === null || user === undefined ? (
          <DrawerTitle>Not Logged In</DrawerTitle>
        ) : (
          <DrawerUserContainer user={user} />
        )}
      </DrawerHeader>
      <ListDivider />
      <DrawerContent>
        <List>
          {navLinks.map((value, index) => (
            <CollapsibleDrawerNavLink key={index} {...value} />
          ))}
        </List>
      </DrawerContent>
    </Drawer>
  );
};

const DrawerUserContainer = ({ user }) => {
  const avatarStyle = { margin: "auto", border: "solid", borderColor: "black" };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "2px",
          flexFlow: "row",
        }}
      >
        <div
          style={{ display: "flex", paddingTop: "20px", paddingRight: "6px" }}
        >
          {user.photoUrl ? (
            <Avatar style={avatarStyle} src={user.photoUrl} size={"large"} />
          ) : user.displayName ? (
            <Avatar
              style={avatarStyle}
              name={user.displayName}
              size={"large"}
            />
          ) : (
            <Avatar style={avatarStyle} name={"User"} size={"large"} />
          )}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", padding: "2px" }}>
          <DrawerTitle>
            {user.displayName === null ? `User${user.uid}` : user.displayName}
          </DrawerTitle>
          <DrawerSubtitle>{user.email}</DrawerSubtitle>
        </div>
      </div>
      <DrawerSubtitle
        style={{
          marginTop: "6px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
        }}
      >
        <Button
          outlined
          style={{ width: "98%", marginLeft: "auto", marginRight: "auto" }}
        >
          Manage
        </Button>
      </DrawerSubtitle>
    </>
  );
};
