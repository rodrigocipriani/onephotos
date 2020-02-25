import React, { useContext } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import RouteContext from "./Route.context";

const mountRoutes = routes => {
  let newRoutes = [];
  for (let key in routes) {
    const route = routes[key];

    newRoutes.push(
      <Route
        key={key}
        exact={route.exact}
        path={route.path}
        component={route.component}
      />
    );
  }
  return newRoutes;
};

/**
 * @param {ReactComponentElement} children
 * @param {object} routes The routes object name needs to be the name of the route Ex.: {routes: ExampleRoute}. Don't use {routes: routes}
 * @param {String} routeName
 */

const RouteCreator = ({ children, routes, routeName, withSwitch }) => {
  const match = useRouteMatch();
  const prefix = match.path;
  const routeContext = useContext(RouteContext);

  const theRoutes = {};
  if (routes) {
    for (let routeName in routes) {
      const route = routes[routeName];
      theRoutes[routeName] = {
        ...route,
        path: `${prefix}${route.path}`
      };
    }
  }

  if (!routeContext.routes[routeName]) {
    routeContext.setRoutes({ ...routeContext.routes, [routeName]: theRoutes });
    return null;
  }

  return withSwitch ? (
    <Switch>{mountRoutes(theRoutes)}</Switch>
  ) : (
    mountRoutes(theRoutes)
  );
};

export default RouteCreator;
