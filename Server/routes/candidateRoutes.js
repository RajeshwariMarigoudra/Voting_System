import express from 'express';
import { Candidate } from '../models/Candidate.js';

const router = express.Router();

router.post('/createCandidate', async (req, res) => {
  try {
    const { candidates, electionId } = req.body;

    // Assuming candidates is an array of objects
    const candidatesData = candidates.map(candidate => ({
      name: candidate.name,
      party: candidate.party,
      age: candidate.age,
      district: candidate.district,
      state: candidate.state,
      electionId: electionId,
    }));

    // Use insertMany to insert all candidates in a single operation
    await Candidate.insertMany(candidatesData);

    return res.json({ added: true });
  } catch (err) {
    return res.json({ error: err.message });
  }
});

router.post('/getCandidates', async (req, res) => {
  try {
    const candidateDetails = await Candidate.find({ electionId: req.body.electionId });
    return res.json(candidateDetails);
  } catch (err) {
    return res.json({ error: err.message });
  }
});

export { router as CandidateRouter };
