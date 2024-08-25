const Book = require("../model/Book");
const User = require("../model/User");
const jwt = require("jsonwebtoken");


exports.getBook = async(req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

//Save create book to database
exports.createBook = async(req, res) => {
   const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const book = await Book.create(req.body)
        res.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }

};

//get all books
exports.allBook = async(req, res) => {
 

    try {
        console.log("AL Invalid token");
        const token = req.headers['x-access-token']
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            console.log("AL Invalid token");
            res.json({ status: 'error', error: 'invalid token' })
        }

        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

};

// update a book
exports.updateBook = async(req, res) => {
   const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        // we cannot find any book in database
        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

//get book by ID
exports.getBookById = async(req, res) => {
  const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

};

// delete a book
exports.deleteBook = async(req, res) => {
  try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }


};



















/* ------------------------------------ES Module----------------------------------------- */

/* import Book from "../model/Book.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken"; */

/* export const getBook = async(req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

//Save create book to database
export const createBook = async(req, res) => {
   const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const book = await Book.create(req.body)
        res.status(200).json(book);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }

};

//get all books
export const allBook = async(req, res) => {
 const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

};

// update a book
export const updateBook = async(req, res) => {
   const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        // we cannot find any book in database
        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

//get book by ID
export const getBookById = async(req, res) => {
  const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
        const user = await User.findOne({ email: email })
        
        if(!user){
            res.json({ status: 'error', error: 'invalid token' })
        }

        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message: error.message})
    }

};

// delete a book
export const deleteBook = async(req, res) => {
  try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if(!book){
            return res.status(404).json({message: `cannot find any book with ID ${id}`})
        }
        res.status(200).json(book);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }


}; */
