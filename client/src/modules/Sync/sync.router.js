import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RouteCreator } from "../../helpers/route.helper";
import SyncHomeRoute from "./routes/SyncHome.route";
import { syncSliceActions } from "./sync.slice";

export const SyncSlugRoutes = {
  SyncHomeRoute: {
    path: `/`,
    component: SyncHomeRoute,
    exact: true,
    restrict: true
  }
};

const SyncSlugRouter = () => {
  const { SyncSlug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(syncSliceActions.setSyncSlug(SyncSlug));
  }, [SyncSlug]);
  return <RouteCreator routeName="SyncSlugRoutes" routes={SyncSlugRoutes} />;
};

export const SyncRoutes = {
  SyncSlugRouter: {
    path: `/:SyncSlug`,
    component: SyncSlugRouter,
    exact: false,
    restrict: true
  }
};

const SyncRouter = () => {
  return <RouteCreator routeName="SyncRoutes" routes={SyncRoutes} />;
};

export default SyncRouter;
