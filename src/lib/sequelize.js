import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  dialectModule: require("mysql2"),
  dialect: "mysql",
  benchmark: true,
  logging: true,
});

(async () => {
  try {
    await sequelize
      .authenticate()
      .then(async () => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
    await sequelize.sync({ alter: true });
    console.log("MYSQL connected...");
  } catch (error) {
    console.log(error);
  }
})();

export default sequelize;
