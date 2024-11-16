import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

import cors from "cors";

dotenv.config();

const port = process.env.PORT || 5001;

connectDB();

const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/camera/auth", userRoutes);
app.use("/camera/category", categoryRoutes);
app.use("/camera/products", productRoutes);


app.listen(port, () => console.log(`Server running on port: ${port}`));

app.get("/", (req, res) => {
  res.json({ message: "nice" });
});
