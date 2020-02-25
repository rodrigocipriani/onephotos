const path = require("path");
require("dotenv").config();

// todo: Check other required variables
const jwtSecret = process.env.JWT_SECRET;
["SESSION_SECRET", "JWT_SECRET"].forEach(name => {
  if (!process.env[name]) {
    console.error(
      `ERROR: You need to inform your ${name} on environment variables`
    );
  }
});

module.exports = {
  env: process.env.ENV || "production",
  apiPrefix: process.env.API_PREFIX || "/api",
  publicFolder: path.join(process.cwd(), "..", "client", "build"),
  uploadApiUrl:
    process.env.UPLOAD_API_URL ||
    "http://localhost:4000/uploads/files/onephotos",
  uploadFolder:
    process.env.UPLOAD_FOLDER ||
    path.join(process.cwd(), "..", "..", "uploads", "files", "onephotos"),
  uploadSufix: process.env.UPLOAD_SUFIX || "/uploads/files/onephotos",
  corsOriginsAccept: [
    "http://localhost",
    "http://localhost:3000",
    "https://localhost",
    "https://localhost:3000"
  ],
  port: process.env.PORT || 4000,
  redisUrl: process.env.REDIS_URL,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  redisPwd: process.env.REDIS_PWD,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
  postgresUser: process.env.POSTGRES_USER,
  postgresPwd: process.env.POSTGRES_PWD,
  postgresDB: process.env.POSTGRES_DB,
  postgresSchema: process.env.POSTGRES_SCHEMA || "onephotos",
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  accessToken: "75b3b39efc710c7b7b8238404a866f74",
  mockEnv: process.env.MOCK_ENV,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
  // accessToken: process.env.ACCESS_TOKEN,
  trelloKey: process.env.TRELLO_KEY,
  trelloToken: process.env.TRELLO_TOKEN
};
