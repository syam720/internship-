// controllers/adminController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Assignment = require('../models/assignment');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await Admin.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'Admin registered successfully', admin });
    } catch (error) {
        res.status(400).json({ message: 'Error registering admin', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};

exports.getAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ adminId: req.user.id }).populate('userId', 'name');
        res.json(assignments);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching assignments', error });
    }
};

exports.updateAssignmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const assignment = await Assignment.findByIdAndUpdate(id, { status }, { new: true });
        res.json({ message: `Assignment ${status.toLowerCase()} successfully`, assignment });
    } catch (error) {
        res.status(400).json({ message: 'Error updating assignment status', error });
    }
};
