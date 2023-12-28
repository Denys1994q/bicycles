import Bicycle from "../models/Bicycle.js";

export const getAllBicycles = async (req, res) => {
    try {
        const allBicycles = await Bicycle.find();
        res.status(200).json(allBicycles);
    } catch (err) {
        console.error("Error getting all bicycles:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const createBicycle = async (req, res) => {
    try {
        const bicycle = new Bicycle({
            id: req.body.id,
            name: req.body.name,
            type: req.body.type,
            color: req.body.color,
            wheelSize: req.body.wheelSize,
            price: req.body.price,
            description: req.body.description,
        });

        await bicycle.save();

        const allBicycles = await Bicycle.find();

        res.status(201).json({ message: "Bicycle added successfully", bicycles: allBicycles });
    } catch (err) {
        console.error("Error adding bicycle:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const removeBicycle = async (req, res) => {
    try {
        const bicycleIdToRemove = req.params.id;
        const bicycle = await Bicycle.findOne({ id: bicycleIdToRemove });

        if (!bicycle) {
            return res.status(404).json({ error: "Bicycle not found" });
        }

        await Bicycle.deleteOne({ id: bicycleIdToRemove });

        const allBicycles = await Bicycle.find();

        res.status(200).json({ message: "Bicycle removed successfully", bicycles: allBicycles });
    } catch (err) {
        console.error("Error removing bicycle:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const updateBicycleStatus = async (req, res) => {
    try {
        const bicycleIdToUpdate = req.params.id;
        const newStatus = req.body.status;

        const bicycle = await Bicycle.findOne({ id: bicycleIdToUpdate });

        if (!bicycle) {
            return res.status(404).json({ error: "Bicycle not found" });
        }

        // Перевірка, чи новий статус є допустимим значенням
        if (!["available", "busy", "unavailable"].includes(newStatus)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        // Оновлення статусу велосипеда
        bicycle.status = newStatus;
        await bicycle.save();

        const allBicycles = await Bicycle.find();

        res.status(200).json({ message: "Bicycle status updated successfully", bicycles: allBicycles });
    } catch (err) {
        console.error("Error updating bicycle status:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
