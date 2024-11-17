// models/assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: false },
    task: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Rejected'], default: 'Pending' },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Assignment', assignmentSchema);
