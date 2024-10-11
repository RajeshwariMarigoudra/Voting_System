import mongoose from "mongoose";

const submitVoteSchema = new mongoose.Schema({
    Voter_ID: String,
    Voter_Name: String,
    Candidate_Name: String,
    Candidate_Party: String,
    Election_ID: String
});

const submitVoteModel = mongoose.model('submitVotes', submitVoteSchema);

export { submitVoteModel as SubmitVote };