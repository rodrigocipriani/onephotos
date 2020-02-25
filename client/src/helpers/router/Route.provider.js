import React, { useContext } from "react";
import { useState, useEffect, createContext } from "react";
import RouteContext from "./Route.context";

const RouteProvider = ({ children }) => {
  const handleSetRoutes = routes => {
    setState({ ...state, routes });
  };

  const [state, setState] = useState({
    routes: {},
    setRoutes: handleSetRoutes
  });

  return (
    <RouteContext.Provider value={state}>{children}</RouteContext.Provider>
  );
};

export default RouteProvider;
