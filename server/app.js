const express = require("express");
const config = require("./config");
const passport = require("passport");
const passportStrategies = require("./src/auth/passportStrategies");
const models = require("./src/models");
const appBootModules = require("./src/appBootModules");
const serverDefaultModulesBoot = require("./serverDefaultModulesBoot");
const fileUpload = require("express-fileupload");
const publicUrls = require("./constants/publicUrls");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Express Best practices security
// https://expressjs.com/en/advanced/best-practice-security.html

const server = () => {
  const app = express();

  app.use(
    fileUpload({
      // debug: true,
      createParentPath: true,
      safeFileNames: true,
      preserveExtension: true
    })
  );

  /**
   * Models
   */
  app.models = models;

  /**
   * Boot commom used modules for express
   */
  serverDefaultModulesBoot({ app });

  app.use(async (req, res, next) => {
    if (!publicUrls.includes(req.path)) {
      return passport.authenticate("jwt", { session: false })(req, res, next);
    }
    return next();
  });

  /**
   * Boot modules cotrollers, services, routes, middlewares...
   */
  appBootModules({ app });

  /**
   * Configuring passport and Authentication
   */
  passportStrategies(app);
  app.use(passport.initialize());

  /**
   * Exception router catcher
   */
  app.get("*", (req, res) => {
    const msg = "Route/path not found";
    console.log(msg);
    if (req.xhr) return res.status(404).send({ message: msg });
    return res.status(404).render("404.ejs");
  });

  app.use((err, req, res) => {
    console.log("# Express general error", err);

    let error = err;
    let msg;
    let status = 500;

    if (error.stack) {
      const message = msg || "# Internal server error";
      return res.status(status).send({
        error,
        message,
        messageCode: new Date()
      });
    }
  });

  return app;
};

module.exports = server;
