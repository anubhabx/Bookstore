import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to the Books API!");
});

app.use("/books", bookRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });
