import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
  Voter_ID: String,
  password: String,
});

const voterModel = mongoose.model('voterSignin', voterSchema);

export { voterModel as VoterSignin };
