const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const modRewrite = require("connect-modrewrite");
const helmet = require("helmet");
const compression = require("compression");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const ejs = require("ejs");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const config = require("./config");

let redisClient = null;
if (config.redisUrl) {
  redisClient = redis.createClient({ url: config.redisUrl });
} else {
  redisClient = redis.createClient(config.redisPort, config.redisHost, {
    auth_pass: config.redisPwd
    // no_ready_check: true
  });
}

module.exports = ({ app }) => {
  app.use(cookieParser());

  app.set("trust proxy", 1); // trust first proxy

  // To sendo to https on heroku
  // https://jaketrent.com/post/https-redirect-node-heroku/
  // if (process.env.NODE_ENV === "production") {
  //   app.use((req, res, next) => {
  //     if (req.header("x-forwarded-proto") !== "https")
  //       res.redirect(`https://${req.header("host")}${req.url}`);
  //     else next();
  //   });
  // }

  const sessionConfig = {
    store: new RedisStore({ client: redisClient }),
    secret: config.sessionSecret,
    name: "uSession",
    resave: false,
    saveUninitialized: true
  };

  app.use(session(sessionConfig));
  app.set("views", "./src/views");
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");
  app.use(
    cors({
      origin: config.corsOriginsAccept,
      credentials: true
    })
  );

  // temporary upload server, should be better this belongs to it own server
  // It need to be before modrewrite, otherwise, it is necessary to adapt modrewrite
  app.use(config.uploadSufix, express.static(config.uploadFolder));
  app.use(
    modRewrite([
      "!\\api/|\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.woff2|\\.ttf|\\.manifest$ /index.html [L]"
    ])
  );
  app.use(express.static(config.publicFolder));
  app.use(compression());
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(helmet.hidePoweredBy({ setTo: "Cobol" }));
};
