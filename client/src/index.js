import MomentUtils from "@date-io/moment";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createBrowserHistory } from "history";
import "moment/locale/pt-br";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import config from "./config";
import customTheme from "./constants/customTheme";
import "./index.css";
import AppRouter from "./modules/App/App.router";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { RouteProvider } from "./helpers/route.helper";

const theme = createMuiTheme(customTheme);

const browserHistoryConfig = {
  basename: config.basename
};

let history = createBrowserHistory(browserHistoryConfig);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils} locale={"pt-BR"}>
        <Router basename={config.basename} history={history}>
          <RouteProvider>
            <AppRouter />
          </RouteProvider>
        </Router>
      </MuiPickersUtilsProvider>{" "}
    </MuiThemeProvider>{" "}
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Product this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
