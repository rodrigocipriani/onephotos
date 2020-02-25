const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const config = require("../config");
const db = {};

console.log("# Initializing models...");
Sequelize.postgres.DECIMAL.parse = function(value) {
  return parseFloat(value);
};

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const sequelize = new Sequelize(
  config.postgresDB,
  config.postgresUser,
  config.postgresPwd,
  {
    host: config.postgresHost,
    dialect: "postgres",
    port: config.postgresPort || 5432,
    // dialectOptions: {
    //   ssl: true
    // },
    define: { timestamps: false, freezeTableName: true, underscored: true },
    pool: {
      maxConnections: 10,
      minConnections: 0,
      maxIdleTime: 60
    },
    operatorsAliases
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Postgres connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database Postgres:", err);
  });

// sequelize.query("CREATE EXTENSION IF NOT EXISTS unaccent", { raw: true });

const models = [];

models.push("./user/UserModel.js");
models.push("./user/UserDetailModel.js");

models.forEach(file => {
  var model = sequelize["import"](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  console.log("Model: " + modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize.sync();
// // sequelize.sync({ force: true });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
