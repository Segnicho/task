import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "Product",
  "segni",
  "segni",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize