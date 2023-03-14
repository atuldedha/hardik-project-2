import React, { createContext, useEffect, useState } from "react";
import { auth } from "./services/firebase-service";

export const DrawerOpenContext = createContext();

export const DrawerProvider = (props) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <DrawerOpenContext.Provider value={{ open, toggle }}>
      {props.children}
    </DrawerOpenContext.Provider>
  );
};

export const AuthContext = createContext({
  user: null,
  setUser: (user) => {},
});

export const AuthProvider = ({ children = <></> }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  });
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
