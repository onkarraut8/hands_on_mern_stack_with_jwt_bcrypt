const express = require("express");
const userRoute = require("../controller/userController");
const router = express.Router();

router.post("/signup", userRoute.signup);
router.post("/login", userRoute.login);

module.exports = router;









/* ------------------------------------ES Module----------------------------------------- */

/* import express from "express";
import userRoute from "../controller/userController.js";
const router = express.Router();

router.post("/register", userRoute.signup);
router.post("/login", userRoute.login);

export default router; */

