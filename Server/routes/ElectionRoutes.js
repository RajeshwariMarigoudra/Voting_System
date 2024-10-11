import express from "express";
import { Election } from "../models/Election.js";

const router = express.Router();

router.post('/createElection', async (req, res) => {
    try {
        const { electionId, electionName, startDate, startTime, endDate, endTime } = req.body; // Include startTime and endTime
        const newElection = new Election({
            electionId,
            electionName,
            startDate,
            startTime, // Include startTime
            endDate,
            endTime // Include endTime
        });
        await newElection.save();
        return res.json({ added: true })
    } catch (err) {
        return res.json({ error: err.message })
    }
});

router.get("/getElections", async (req, res) => {
    try{
        const elections = await Election.find() // Fetch all elections
        
        res.json(elections);
    }
    catch(error){
        console.error('Error fetching elections:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.put('/updateElection', async (req, res) => {
    try {
        const { electionId, electionName, startDate, startTime, endDate, endTime } = req.body; // Include startTime and endTime
        const updatedElection = await Election.findOneAndUpdate({ electionId }, {
            electionName,
            startDate,
            startTime, // Include startTime
            endDate,
            endTime // Include endTime
        });
        if (updatedElection) {
            return res.json({ message: "Election updated successfully" })
        } else {
            return res.status(404).json({ message: "Election not found" });
        }
    } catch (err) {
        console.error('Error updating election:', err);
        return res.status(500).json({ error: err.message });
    }
});

router.delete('/deleteElection/:electionId', async (req, res) => {
    try {
        const { electionId } = req.params;
        const deletedElection = await Election.findOneAndDelete({ electionId });
        if (deletedElection) {
            return res.json({ message: "Election deleted successfully" });
        } else {
            return res.status(404).json({ message: "Election not found" });
        }
    } catch (err) {
        console.error('Error deleting election:', err);
        return res.status(500).json({ error: err.message });
    }
});

export { router as ElectionRouter };
