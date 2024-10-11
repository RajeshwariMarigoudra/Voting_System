import express from "express";
import { VoterSignin } from "../models/VoterSignin.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const router = express.Router();

function createSecretToken(id) {
    console.log(id);
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: "1h"
    });
}

router.post('/signin', async (req, res) => {
    try {
        const { Voter_ID, password } = req.body;
        const user = await VoterSignin.findOne({ Voter_ID });
        if (user) {
            if (user.password === password) {
                const token = createSecretToken(user.Voter_ID);
                console.log(token);
                res.status(201).json({ message: "Login Success", success: true, jwttoken: token });
            } else {
                res.json({ message: "Wrong Password" });
            }
        } else {
            res.json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
    }
});

// Voter Signup
router.post("/signup", async (req, res) => {
    try {
      const { Voter_ID, password } = req.body;
  
      // Check if the Voter_ID already exists
      const existingVoter = await VoterSignin.findOne({ Voter_ID });
      if (existingVoter) {
        return res.status(400).json({ message: "Voter ID already exists" });
      }
  
      // Create a new voter without hashing the password
      const newVoter = new VoterSignin({
        Voter_ID,
        password, // Save the password directly
      });
  
      // Save the new voter
      await newVoter.save();
  
      return res.status(201).json({ message: "Voter registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  


router.get('/signout', (req, res) => {
    res.clearCookie('token');
    res.json({ logout: true });
});

export { router as VoterRouter };
