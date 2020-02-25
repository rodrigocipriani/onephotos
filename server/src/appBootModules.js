const path = require("path");
const filterFiles = require("filter-files");
const isDir = require("is-directory");
const isRoutes = fileName => /((routes)|(route))\.js$/.test(fileName);
const isController = fileName => /((controller))\.js$/.test(fileName);
const isService = fileName => /((service))\.js$/.test(fileName);
const isMiddleware = fileName => /((middleware))\.js$/.test(fileName);
const isHelper = fileName => /((helper))\.js$/.test(fileName);

const appBootModules = ({ app, dirname = path.join(__dirname, "./") }) => {
  const getRoutesFilesFromDirname = dirname => {
    return filterFiles.sync(
      dirname,
      (fp, dir, files, recurse) => {
        if (
          isRoutes(fp) ||
          isController(fp) ||
          isService(fp) ||
          isMiddleware(fp) ||
          isHelper(fp)
        ) {
          return true;
        }

        return isDir.sync(path.join(dir, fp));
      },
      true
    );
  };

  app.controllers = {};
  app.services = {};
  app.middlewares = {};
  app.helpers = {};
  console.log(`# Botting modules from dir ${dirname}...`);
  let modules = {
    routers: [],
    controllers: [],
    services: [],
    middlewares: [],
    helpers: []
  };
  getRoutesFilesFromDirname(dirname).forEach(fileName => {
    if (isRoutes(fileName)) {
      modules.routers.push(fileName);
    }
    if (isController(fileName)) {
      modules.controllers.push(fileName);
    }
    if (isService(fileName)) {
      modules.services.push(fileName);
    }
    if (isMiddleware(fileName)) {
      modules.middlewares.push(fileName);
    }
    if (isHelper(fileName)) {
      modules.helpers.push(fileName);
    }
  });

  // Load in correct order
  ["helpers", "middlewares", "services", "controllers", "routers"].forEach(
    type => {
      modules[type].forEach(m => {
        console.log(`# botting ${type}`, m);
        require(m)(app);
      });
    }
  );

  console.log(`# Modules booted!`);
};

module.exports = appBootModules;
