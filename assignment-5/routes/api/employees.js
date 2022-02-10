const express = require('express');
const router = express.Router();
const dbo = require('../db/connection');
const {ObjectId} = require("mongodb");



// Expose the router to the application
module.exports = router;
