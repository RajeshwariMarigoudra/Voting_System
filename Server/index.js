import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./db.js";
import { ElectionRouter } from "./routes/electionRoutes.js";
import { AdminRouter } from "./routes/auth.js";
import { CandidateRouter } from "./routes/candidateRoutes.js";
import { VoteRouter } from "./routes/voteRoutes.js";
import { VoterInsertRouter } from "./routes/voterInsertRoutes.js";
import { VoterRouter } from "./routes/voterAuth.js";
import { voterRoutes } from "./routes/voterRoutes.js";

// Routes
const app = express();
app.use(express.json());

// Configure CORS to allow requests from any origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // This allows cookies to be sent
}));


app.use(cookieParser());
dotenv.config();

app.use('/auth', AdminRouter);
app.use('/voterAuth', VoterRouter);
app.use('/electionRoutes', ElectionRouter);
app.use('/candidateRoutes', CandidateRouter);
app.use('/voteRoutes', VoteRouter);
app.use('/voterInsertRoutes', VoterInsertRouter);
app.use('/voterRoutes', voterRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
