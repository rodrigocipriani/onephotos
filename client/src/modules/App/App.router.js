import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Redirect } from "react-router-dom";
import { RouteCreator } from "../../helpers/route.helper";
import AuthGate from "../Auth/components/AuthGate";
import SyncRouter from "../Sync/sync.router";
import AuthHomeRoute from "./../Auth/routes/AuthHome.route";
import AppMenu from "./components/AppMenu";
import AppMessages from "./components/AppMessages";
import AppStructure from "./components/AppStructure";
import AppOopsRoute from "./routes/AppOops.route";

export const appUrls = {
  // AppHomeRoute: { path: "/", component: AppHomeRoute, exact: true },
  AppHomeRoute: {
    path: "",
    component: () => <Redirect to={"/g/caymmi"} />,
    exact: true
  },
  AppSuggestsPage: {
    path: "suggests",
    component: AppOopsRoute,
    exact: true
  },
  AppOopsRoute: {
    path: "oops",
    component: AppOopsRoute,
    exact: true
  },
  AuthHomeRoute: {
    path: "login",
    component: AuthHomeRoute,
    exact: true
  },
  SyncRouter: {
    path: "g",
    component: SyncRouter,
    exact: false
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%"
  }
}));

const AppRouter = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AuthGate>
        <AppStructure menu={<AppMenu />}>
          <RouteCreator routeName="appRoutes" routes={appUrls} />
        </AppStructure>
      </AuthGate>

      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <CssBaseline />
        <AppMessages />
      </SnackbarProvider>
    </div>
  );
};

export default AppRouter;
