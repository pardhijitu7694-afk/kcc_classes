const userModel = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password, confirm_password, role } = req.body;

        // ✅ Validate required fields
        if (!name || !email || !password || !confirm_password || !role) {
            return res.status(400).send({
                code: 100,
                status: "FAILED",
                message: "Some fields are missing in the request body!",
                data: {}
            });
        }

        // ✅ Check if user already exists
        const findUser = await userModel.findOne({ email: email });
        if (findUser) {
            return res.status(200).send({
                code: 200,
                status: "SUCCESS",
                message: "User is already registered!",
                data: {}
            });
        }

        // ✅ Check password match
        if (password !== confirm_password) {
            return res.status(400).send({
                code: 100,
                status: "FAILED",
                message: "Password and Confirm Password do not match!",
                data: {}
            });
        }

        // ✅ Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // ✅ Save new user
        const saveResult = await userModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // ✅ Generate JWT Token (auto login after register)
        const token = jwt.sign(
            { id: saveResult._id, email: saveResult.email, role: saveResult.role },
            process.env.JWT_SECRET,
            { expiresIn: "10s" } // 1 hour expiry
        );

        return res.status(201).send({
            code: 200,
            status: "SUCCESS",
            message: "User registered successfully!",
            token,
            data: {
                id: saveResult._id,
                name: saveResult.name,
                email: saveResult.email,
                role: saveResult.role
            }
        });
    } catch (error) {
        console.error("RegisterUser Error:", error);
        return res.status(500).send({
            code: 500,
            status: "FAILED",
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).send({
                code: 100,
                status: "FAILED",
                message: "All fields are mandatory!",
                data: {}
            });
        }

        const findUser = await userModel.findOne({ email: email });
        if (!findUser) {
            return res.status(404).send({
                code: 100,
                status: "FAILED",
                message: "User not found!",
                data: {}
            });
        }

        const isMatch = await bcryptjs.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(401).send({
                code: 100,
                status: "FAILED",
                message: "Invalid password!",
                data: {}
            });
        }

        if (role !== findUser.role) {
            return res.status(403).send({
                code: 100,
                status: "FAILED",
                message: "User role mismatched!",
                data: {}
            });
        }

        // ✅ Create JWT Token with expiry
        const token = jwt.sign(
            { id: findUser._id, email: findUser.email, role: findUser.role },
            process.env.JWT_SECRET, // keep secret in .env
            { expiresIn: "1h" } // token expires in 1 hour
        );
       

        return res.status(200).send({
            code: 200,
            status: "SUCCESS",
            message: "User logged in successfully!",
            token,
            data: {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                role: findUser.role
            }
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            status: "FAILED",
            message: "Internal Server Error",
            error: error.message
        });
    }
};



module.exports = {
    RegisterUser,
    loginUser
};
