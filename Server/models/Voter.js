import mongoose from 'mongoose';

// Define the voter schema
const voterSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    voterName: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    wardNumber: { type: Number, required: true },
    pincode: { type: Number, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true }
}, { strict: true }); // Ensure strict mode is enforced

const Voter = mongoose.model('Voter', voterSchema);

export { Voter };