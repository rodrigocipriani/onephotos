import { useContext } from "react";
import RouteContext from "./Route.context";

export const useRouteSelector = selector => {
  const routeContext = useContext(RouteContext);
  if (selector) {
    console.log("routeContext.routes || {}", routeContext.routes || {});
    return selector(routeContext.routes || {});
  } else {
    return routeContext.routes;
  }
};

export default useRouteSelector;
