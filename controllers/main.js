const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequestError('Please provide both username and password');
    }

    // Generate a unique identifier for the user
    const id = Date.now();

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ msg: 'User created successfully', token });
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
 
    res.status(200).json({
        msg: `Hello, ${req.user.username}`, // Ensure req.user contains user information
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`
    });
};

module.exports = {
    login,
    dashboard
};
