const express = require('express');
const router = express.Router();
const dbo = require('../db/connection');
const {ObjectId} = require("mongodb");

/////////////////////
/// CREATE ROUTES
/////////////////////
const routeCreate = router.route('/create');

routeCreate.get(((req, res) => {
    // Renders the creation form with the submit action of posting
    // to create
    res.render('create', {action: '/create'});
}));

routeCreate.post( (req, res) => {
    // Add an employee to the database using the form data
    dbo.getDatabase().collection('employees').insertOne(req.body, (error) => {
        if (error) {
            res.render('error', error);
        } else {
            res.redirect('view');
        }
    });
});

/////////////////////
/// DELETE ROUTES
/////////////////////
const routeDelete = router.route('/delete/:id');

routeDelete.post(async (req, res) => {
    // Get the ID of the employee to delete
    const search = { _id: ObjectId(req.params.id) };

    // Delete the employee from the database
    dbo.getDatabase().collection('employees').deleteOne(search, ((error, result) => {
        if (error) {
            res.render('error', error);
        } else {
            res.redirect('../view');
        }
    }));
});

/////////////////////
/// UPDATE ROUTES
/////////////////////
const routeUpdate = router.route('/update/:id');

routeUpdate.get(async (req, res) => {
    // Get the ID of the employee to update
    const search = { _id: ObjectId(req.params.id) };

    // Get the employee from the database
    dbo.getDatabase().collection('employees').findOne(search).then(result => {
        // Set the form action to post to update
        result.action = `/update/${req.params.id}`;
        // Load the known employee information into the form
        res.render('update', result);
    });
});

routeUpdate.post(async (req, res) => {
    // Update the employee based on the given data
    await dbo.getDatabase().collection('employees').updateOne({ _id: ObjectId(req.params.id) }, {$set: req.body});
    res.redirect('../view');
});

/////////////////////
/// VIEW ROUTES
/////////////////////
const routeView = router.route('/view');

routeView.get(async (req, res) => {
    // Collect all the employees from the database, and display them
    // Although this would be better as a lazy-load, for the sake of the
    // assignment it is done synchronously
    dbo.getDatabase().collection('employees').find({}).toArray((error, data) => {
        if (error) {
            res.render('error', error);
        } else {
            res.render('view', {employees: data});
        }
    })
});

/////////////////////
/// MISC ROUTES
/////////////////////
router.route('/error').get(((req, res) => {
    // Route for generic errors in case a static URL is needed
    res.render('error');
}));

router.route('*').get(((req, res) => {
    // Unknown routes are brought to the home page
    res.redirect('create');
}));

// Expose the router to the application
module.exports = router;
