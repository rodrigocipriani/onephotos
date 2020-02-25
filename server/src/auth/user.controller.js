const ErrorHelper = require("../../helpers/ErrorHelper");
const utilsHelper = require("../../helpers/utilsHelper");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = app => {
  const controller = {};
  const UserService = app.services.user;

  controller.logout = (req, res) => {
    // app.cache.delete("user");
    try {
      req.session.destroy(function(err) {
        if (err) {
          throw "Falha ao destruir a sessão.";
        } else {
          res.clearCookie("Authorization");
          res.status(200).json(null);
        }
      });
    } catch (error) {
      return next(new ErrorHelper(error));
    }
  };

  controller.loginByPassWord = async (req, res, next) => {
    const { slug } = req.query;
    console.log("############ slug", slug);
    try {
      const user = await UserService.findUser({ slug });
      if (user) {
        const token = jwt.sign(user.id, config.jwtSecret);
        console.log("############ token", token);
        res.cookie("Authorization", token);
        req.session.user = user;
        return res.status(200).json(user);
      } else {
        res.status(200).send({
          message: utilsHelper.newMessage({
            text: "Usuário não encontrado",
            type: "error"
          })
        });
      }
    } catch (error) {
      return next(new ErrorHelper(error));
    }
  };

  app.controllers.auth = controller;
  return controller;
};
