import express from "express";
import { Admin } from "../models/Admin.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const router = express.Router();


function createSecretToken(id){
    console.log(id);
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
      expiresIn: "1h"
    });
}

router.get("/middleware", (req, res) => {
    console.log("Middleware");
    const cookieString = req.headers["cookie"];
    const cookies = cookieString.split("; ");
    const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
    const token = tokenCookie.split("=")[1];
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err) => {
        if (err) {
            console.log(err);
            res.status(403).send("Unauthorized");
        } else {
            console.log("Middleware Success");
            res.status(200).send("Authorized");
        }
        });
    } else {
        res.status(401).send("Unauthorized");
    }
});
router.post("/signin", async (req, res) => {
  try {
    const { Voter_ID, password } = req.body;
    const user = await Admin.findOne({ Voter_ID });
    console.log(user);
    if (user) {
      if (user.password === password) {
        const token = createSecretToken(user.Voter_ID);
        console.log(token);
        res.status(201).json({ message: "Login Success",success: true,jwttoken: token});
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

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  res.json({ logout: true });
});

export { router as AdminRouter };
