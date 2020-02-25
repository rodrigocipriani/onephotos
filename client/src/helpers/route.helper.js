import RouteCreator from "./router/RouteCreator";
import RouteProvider from "./router/Route.provider";
import RouteContext from "./router/Route.context";
import { useRouteSelector } from "./router/Route.hook";

const routeHelper = {
  RouteCreator,
  RouteProvider,
  RouteContext,
  useRouteSelector
};

export default routeHelper;
export { RouteCreator, RouteProvider, RouteContext, useRouteSelector };
