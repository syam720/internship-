// routes/userRoutes.js
const express = require('express');
const { register, login, uploadAssignment } = require('../controllers/userController');
const { authenticate } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticate('user'), uploadAssignment);

module.exports = router;
