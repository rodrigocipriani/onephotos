import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import publicRoutes from "../../../constants/publicRoutes";
import { authSliceActions } from "../auth.slice";

const AuthGate = ({ children }) => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.authSlice);

  const search = location.search;
  const urlSearchParams = new URLSearchParams(search);
  const goTo = urlSearchParams.get("goto");

  useEffect(() => {
    if (!user) {
      dispatch(authSliceActions.loadAuthUser(null));
    }
    setInitialized(true);
  }, []);

  if (user && goTo) {
    window.location = goTo;
  }

  if (!publicRoutes.includes(location.pathname)) {
    if (initialized && !user && !loading.user) {
      return (window.location = `/login?goto=${window.location.href}`);
    }

    if (!user) {
      return <LinearProgress />;
    }
  }
  return children;
};

export default AuthGate;
