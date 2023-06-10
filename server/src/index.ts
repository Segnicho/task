import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import productRoute from "./routes/product.route.js";

import sequelize from "./db.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoute);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
    return sequelize.sync(); 
  })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error: any) => {
    console.error("Error connecting to the database:", error);
  });

app.listen(PORT, (): void => {
  console.log("Backend Running");
});
