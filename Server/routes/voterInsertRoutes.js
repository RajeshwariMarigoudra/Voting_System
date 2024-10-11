import {Voter} from "../models/Voter.js";
import express from "express";


const router = express.Router();

router.post('/addVoter', async (req, res) => {
    try {
        const { id, voterName, age, gender, wardNumber, pincode, district, state } = req.body;
        const newVoter = new Voter({
            id,
            voterName,
            age,
            gender,
            wardNumber,
            pincode,
            district,
            state
        });
        await newVoter.save();
        return res.json({ added: true })
    } catch (err) {
        return res.json({ error: err.message })
    }
})

router.get('/getVoter', async (req, res) => {
    try {
        const voter = await Voter.find();
        return res.json(voter);
    } catch (err) {
        return res.json({ error: err.message });
    }
});

export { router as VoterInsertRouter }
