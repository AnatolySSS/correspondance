import { Sequelize } from "sequelize";
import userModel from "./user.model.js";
import corrAppModel from "./corr.model.js";
import setConnection from "../config/db-config.js";

const { config } = setConnection()

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
});

sequelize.sync()

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize)
db.corrApp = corrAppModel(sequelize, Sequelize)

export default db