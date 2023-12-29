import mongoose from "mongoose";

const BicycleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        wheelSize: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["available", "busy", "unavailable"],
            default: "available",
            required: true,
        },
    },
    {
        timestamps: true, 
    }
);

export default mongoose.model("Bicycle", BicycleSchema);
