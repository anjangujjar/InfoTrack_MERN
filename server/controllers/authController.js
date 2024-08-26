const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.signup = async (req, res) => {
    const { username, email, password, phone } = req.body;

    try {
        const user = await User.create({ username, email, password, phone });
        const token = generateToken(user._id);
        res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, phone: user.phone } });
    } catch (err)
    {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            res.json({ token, user: { id: user._id, username: user.username, email: user.email, phone: user.phone } });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
