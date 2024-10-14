const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const User = require("../models/userModels"); // Import the User model

// Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            count: users.length,
            data: {
                users
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to get user list",
            message: e.message
        });
    }
};

// Get one user by ID
exports.getOneUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to get user details",
            message: e.message
        });
    }
};

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "Failed",
                message: "User already exists"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            status: "success",
            data: {
                user
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to create user",
            message: e.message
        });
    }
};

//Update user password
exports.updateUserPassword = async (req, res, next) => {
    try {
        const { password } = req.body;

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the user by ID and update their password
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { password: hashedPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Password updated successfully",
            data: {
                user
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to update password",
            message: e.message
        });
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }
        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });
    } catch (e) {
        res.status(400).json({
            status: "Failed to delete user",
            message: e.message
        });
    }
};
