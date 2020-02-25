import { combineReducers } from "redux";
import { createLogger } from "redux-logger";
import { configureStore /*getDefaultMiddleware*/ } from "@reduxjs/toolkit";
import asyncDispatchMiddleware from "./asyncDispatchMiddleware";
import readyStatePromiseMiddleware from "./readyStatePromiseMiddleware";
// import thunk from "redux-thunk";
import reducers from "./reducers";

// And use redux-batch as an example of adding enhancers
// import { reduxBatch } from '@manaflair/redux-batch'

// const middlewares = [
//   thunk,
//   readyStatePromiseMiddleware,
//   asyncDispatchMiddleware,
//   loggerMiddleware
// ];

const preloadedState = {};

const SHOW_LOGS = false;
const loggerMiddleware = createLogger({ predicate: () => SHOW_LOGS });
const reducer = combineReducers(reducers);
const middleware = [
  // ...getDefaultMiddleware(),
  loggerMiddleware,
  readyStatePromiseMiddleware,
  asyncDispatchMiddleware
];

let store = configureStore({
  middleware,
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState
  // enhancers: [reduxBatch]
});

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./reducers", () => store.replaceReducer(reducers));
}

export default store;
