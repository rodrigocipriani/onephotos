const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const config = require("../../config");
const ErrorHelper = require("../../helpers/ErrorHelper");

module.exports = app => {
  const UserService = app.services.user;

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: config.googleCallbackUrl
      },
      async function(accessToken, refreshToken, profile, done) {
        let photoUrl = null;
        if (profile.photos[0]) {
          photoUrl = profile.photos[0].value;
        }
        let userEmail = null;
        if (profile.emails[0]) {
          if (profile.emails[0].verified) {
            userEmail = profile.emails[0].value;
          }
        }
        const googleData = {
          id: null,
          name: profile.displayName,
          photoUrl,
          email: userEmail,
          googleProfile: profile
        };

        try {
          const data = await UserService.findOrCreateOrUpdate(googleData);
          return done(null, data);
        } catch (error) {
          console.error(`ERROR: ${error}`);
          return next(new ErrorHelper(error));
        }

        return done(null, false);
      }
    )
  );

  const cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) {
      token = req.cookies["Authorization"];
    }
    return token;
  };
  const opts = {};
  opts.jwtFromRequest = cookieExtractor;
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.jwtSecret;
  // console.error("!!!! todo: change issuer and audience");
  // opts.issuer = "accounts.examplesoft.com";
  // opts.audience = "yoursite.net";

  passport.use(
    "jwt",
    new JwtStrategy(opts, async function(jwt_payload, done) {
      try {
        // let user = await app.cache.get("user");
        let user = null;
        if (user) {
          return done(null, user);
        } else {
          console.log(
            `Session not found for user id: ${jwt_payload}. Loading by DB...`
          );
          user = await UserService.findByPk(jwt_payload);
          // app.cache.set("user", user);
          if (user) {
            return done(null, user);
          }
        }
      } catch (error) {
        console.error(`ERROR: ${error}`);
      }
      return done(null, false);
    })
  );
};
