import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import JenosizeController from "./jenosize.controller";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.MAIN_URL || "http://localhost:3000",
  })
);

// Controllers
const jenosizeController = new JenosizeController();

// Routes
app.get("/api/restaurants", jenosizeController.searchRestaurants);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
