const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name || name.trim().length < 2) {
        return res
            .status(400)
            .json({ error: "Name must be at least 2 characters." });
    }

    if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error:
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
        });
    }

    try {
        let user = await User.findOne({ email: normalizedEmail });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email: normalizedEmail,
            password: hashedPassword,
        });

        await user.save();

        const payload = {
            user: { id: user.id },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    try {
        const user = await User.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        const payload = {
            user: { id: user.id },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};
