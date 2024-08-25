const User = require("../model/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async(req, res) => {
    try {
        const { name, role, email, password } = req.body;
        console.log("SU "+name);
        const user = await User.findOne({ email });
        if (user) {
            console.log("SU User already exists "+name);
            return res.status(400).json({ status: 400, message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            name: name,
            role: "USER",
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        console.log("SU User"+name);
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                name: createdUser.name,
                role: createdUser.role,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({status: 500, message: "Internal server error" });
    }
};
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ status: 400, message: "Invalid username or password" });
        } else {

            const jwtToken = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                },
                'secret123'
            )


            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                },
                token:jwtToken,
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({status: 500, message: "Internal server error" });
    }
};


exports.allUser = async(req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 400, error: 'invalid token' })
        }

        const users = await User.find({});
          res.status(200).json(users);
      } catch (error) {
          res.status(500).json({status: 500, message: error.message})
      }
  
  };


/* ------------------------------------ES Module----------------------------------------- */

/* import User from "../model/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"; */


/* export const signup = async(req, res) => {
    try {
        const { name, role, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            name: name,
            role: "User",
            email: email,
            password: hashPassword,
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                name: createdUser.name,
                role: createdUser.role,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {

            const jwtToken = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                },
                'secret123'
            )


            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    name: user.name,
                    role: user.role,
                    email: user.email,
                },
                token:jwtToken,
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const allUser = async(req, res) => {

    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const users = await User.find({});
          res.status(200).json(users);
      } catch (error) {
          res.status(500).json({message: error.message})
      }
  
  }; */