// routes/voterRoutes.js
import express from "express";
const router = express.Router();
import { Voter } from "../models/Voter.js";

// Get voter details by ID
router.get("/:voterID", async (req, res) => {
  try {
    const voterID = req.params.voterID;
    const voterDetails = await Voter.findOne({ id: voterID });
    res.json(voterDetails);
  } catch (error) {
    console.error("Error fetching voter details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add other routes as needed

export { router as voterRoutes };