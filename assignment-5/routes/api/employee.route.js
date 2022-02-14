const express = require('express');
const router = express.Router();
const dbo = require('../db/connection');
const {ObjectId} = require("mongodb");


const routeEmployees = router.route('employees');

routeEmployees.get(((req, res) => {
    res.json()
}));

// Expose the router to the application
module.exports = router;
