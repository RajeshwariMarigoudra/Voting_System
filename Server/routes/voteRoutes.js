import express from "express";
import {SubmitVote} from "../models/Vote.js";

const router = express.Router();

router.get('/electionResults', async (req, res) => {
    try {
        // Aggregate the election results based on submitted votes
        const electionResults = await SubmitVote.aggregate([
            {
                $group: {
                    _id: '$Election_ID',
                    electionName: { $first: '$Election_ID' },
                    winner: { $first: '$Candidate_Name' },
                    votes: { $sum: 1 }
                }
            }
        ]);

        // Send the election results as a JSON response
        res.json(electionResults);
    } catch (error) {
        // If an error occurs, send an error response
        console.error('Error fetching election results:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/submitVote', async (req, res) => {
    try {
        const { Voter_ID, Voter_Name, Candidate_Name,Candidate_Party, Election_ID } = req.body;
        const newVote = new SubmitVote({
            Voter_ID,
            Voter_Name,
            Candidate_Name,
            Candidate_Party,
            Election_ID
        });
        await newVote.save();
        return res.json({ added: true });
    } catch (err) {
        console.error("Error submitting vote:", err);
        return res.status(500).json({ error: err.message });
    }
});

export {router as VoteRouter};
