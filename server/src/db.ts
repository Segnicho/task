import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
