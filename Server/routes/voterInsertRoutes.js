import { Voter } from "../models/Voter.js";
import express from "express";
import { VoterSignin } from "../models/VoterSignin.js";

const router = express.Router();

// Express route for adding a voter
// Express route for adding a voter
router.post('/addVoter', async (req, res) => {
    const validKeys = ['id', 'voterName', 'password', 'age', 'gender', 'wardNumber', 'pincode', 'district', 'state']; 
    const requestKeys = Object.keys(req.body);

    // Check for extra keys
    const extraKeys = requestKeys.filter(key => !validKeys.includes(key));
    if (extraKeys.length > 0) {
        return res.status(400).json({ 
            error: `Extra values detected: ${extraKeys.join(', ')}. Only the following keys are allowed: ${validKeys.join(', ')}.` 
        });
    }

    try {
        const { id, voterName, password, age, gender, wardNumber, pincode, district, state } = req.body; 

        // Create a new voter
        const newVoter = new Voter({
            id, 
            voterName,
            password, // Save the password directly without hashing
            age,
            gender,
            wardNumber,
            pincode,
            district,
            state
        });

        // Create a new voter signin
        const newVoterSign = new VoterSignin({
            Voter_ID: id, // Use Voter_ID for VoterSignin 
            password,  // Save the password directly
        });

        // Save the new voter and voter signin
        await newVoter.save();
        await newVoterSign.save();
        return res.json({ added: true, voterId: id }); // Returning the voter ID
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});



router.get('/getVoter', async (req, res) => {
    try {
        const voter = await Voter.find();
        return res.json(voter);
    } catch (err) {
        return res.json({ error: err.message });
    }
});

export { router as VoterInsertRouter };
