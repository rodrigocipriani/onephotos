const config = require("../../config");

const API_PREFIX = config.apiPrefix;
const ROUTE_PREFIX = "auth";

module.exports = app => {
  const AuthController = app.controllers.auth;

  app
    .route(`${API_PREFIX}/v1/${ROUTE_PREFIX}/logout`)
    .get(AuthController.logout);

  app
    .route(`${API_PREFIX}/v1/${ROUTE_PREFIX}/login/password`)
    .get(AuthController.loginByPassWord);
};
