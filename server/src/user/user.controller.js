const ErrorHelper = require("../../helpers/ErrorHelper");

module.exports = app => {
  const controller = {};
  const UserService = app.services.user;

  controller.getUser = async (req, res) => {
    let user = req.session.user;
    if (req.user) {
      req.session.user = req.user;
      user = req.user;
    }
    console.log("## user", user);
    return res.status(200).json(user);
  };

  app.controllers.user = controller;
  return controller;
};
