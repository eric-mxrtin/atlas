import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

// Function to load JSON data
const loadData = () => {
  const filePath = path.resolve("./data.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

// GET route to fetch data
router.get("/", (req, res) => {
  try {
    const data = loadData();
    res.send(data);
  } catch (error) {
    console.error("Error reading JSON data:", error);
    res.status(500).send({ error: "Failed to load data." });
  }
});

export default router;
