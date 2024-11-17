// middlewares/auth.js
const jwt = require('jsonwebtoken');

const authenticate = (role) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(" ")[1];
        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (role && decoded.role !== role) return res.status(403).json({ message: 'Forbidden' });
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    };
};

module.exports = { authenticate };
