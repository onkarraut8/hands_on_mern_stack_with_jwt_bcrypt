const express = require("express");
const bookRouter = require("../controller/bookController");

const router = express.Router();

router.get("/", bookRouter.getBook);
router.get("/all", bookRouter.allBook);
router.post("/save", bookRouter.createBook);
router.get("/:id", bookRouter.getBookById);
router.delete("/:id", bookRouter.deleteBook);
router.put("/:id", bookRouter.updateBook);


module.exports = router;







/* ------------------------------------ES Module----------------------------------------- */

/* import express from "express";
import bookRouter from "../controller/bookController.js";

const router = express.Router();

router.get("/", bookRouter.getBook);
router.get("/all", bookRouter.allBook);
router.post("/save", bookRouter.createBook);
router.get("/:id", bookRouter.getBookById);
router.delete("/:id", bookRouter.deleteBook);
router.put("/:id", bookRouter.updateBook);


export default router; */