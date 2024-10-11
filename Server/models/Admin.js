import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    Voter_ID: String,
    password: String
});

const adminModel = mongoose.model('admin', adminSchema);

export { adminModel as Admin };
