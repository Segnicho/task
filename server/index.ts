import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import productRoute from "./routes/product.route";

import mysql from "mysql2";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const connectMYSQL = () => {
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }

    console.log("Connected to MySQL database");
  });
};

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoute);

// error handling
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Sth went wrong";
  return res.status(status).json({
    success: false,
    message,
    status,
  });
});

app.listen(PORT, () => {
  connectMYSQL();
  console.log("Backend Running");
});
