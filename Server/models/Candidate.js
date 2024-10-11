import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    name: String,
    party: String,
    age: Number,
    district: String,
    state: String,
    electionId: String
});

const CandidateSchema = mongoose.model('Candidate', candidateSchema);
export { CandidateSchema as Candidate }
