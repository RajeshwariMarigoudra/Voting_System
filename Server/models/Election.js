import mongoose from 'mongoose';

const electionSchema = new mongoose.Schema({
    electionId: {type: String, unique: true},
    electionName: {type: String, unique: true},
    startDate: Date,
    startTime: String, // Add startTime field
    endDate: Date,
    endTime: String // Add endTime field
});

const ElectionSchema = mongoose.model('Election', electionSchema);

export {ElectionSchema as Election};
