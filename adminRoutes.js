// routes/adminRoutes.js
const express = require('express');
const { register, login, getAssignments, updateAssignmentStatus } = require('../controllers/adminController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/assignments', authenticate('admin'), getAssignments);
router.post('/assignments/:id/:status', authenticate('admin'), updateAssignmentStatus);

module.exports = router;
