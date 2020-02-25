const PUBLIC_ROUTES = ["/api/v1/auth/login", "/api/v1/auth/user2"];

const isRequiredAuth = req => PUBLIC_ROUTES.indexOf(req.path) < 0;

module.exports = { isRequiredAuth };
