const config = require("../../config");

const API_PREFIX = config.apiPrefix;
const ROUTE_PREFIX = "user";

module.exports = app => {
  const UserController = app.controllers.user;

  app
    .route(`${API_PREFIX}/v1/${ROUTE_PREFIX}/self`)
    .get(UserController.getUser);
};
