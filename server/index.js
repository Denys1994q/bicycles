import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
};
app.use(cors(corsOptions));

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_KEY}@cluster0.l8hygki.mongodb.net/bicycles-db?retryWrites=true&w=majority`
  )
  .then(() => console.log("DB Ok"))
  .catch((err) => console.log("ERROR", err));

app.listen("4444", err => {
    if (err) {
        return console.log(err);
    }
    console.log("Server OK");
});
