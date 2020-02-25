require("dotenv").config();

module.exports = {
  basename: process.env.REACT_APP_BASE_NAME || "/",
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:4000/api",
  uploadApiUrl:
    process.env.REACT_APP_UPLOAD_API_URL ||
    "https:/localhost:4000/uploads/files"
};
