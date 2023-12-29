import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { BicyclesController } from "./controllers/index.js";
import { createBicycleValidation } from "./validation/validation.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

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
        `mongodb+srv://Denys1994:pp74tvVguAJTZZa@cluster0.l8hygki.mongodb.net/bicycles-db?retryWrites=true&w=majority`
    )
    .then(() => console.log("DB Ok"))
    .catch(err => console.log("ERROR", err));

// get all bicycles
app.get("/bicycles", BicyclesController.getAllBicycles);
// create bicycle
app.post("/create-product", createBicycleValidation, handleValidationErrors, BicyclesController.createBicycle);
// remove bicycle
app.delete("/remove-product/:id", BicyclesController.removeBicycle);
// update bicycle status
app.put("/update-product-status/:id", BicyclesController.updateBicycleStatus);

app.listen("4444", err => {
    if (err) {
        return console.log(err);
    }
    console.log("Server OK");
});
