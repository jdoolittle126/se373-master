const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { EmployeeController } = require('../controllers/employee.controller');

/////////////////////
/// CREATE ROUTES
/////////////////////
const routeCreate = router.route('/create');

routeCreate.get(((req, res) => {
    // Renders the creation form with the submit action of posting
    // to create
    res.render('create', {action: '/create'});
}));

routeCreate.post( async (req, res) => {
    // Add an employee to the database using the form data
    let employee = await EmployeeController.createEmployee(req.body);

    if (employee) {
        res.redirect('view');
    } else {
        res.render('error');
    }

});

/////////////////////
/// DELETE ROUTES
/////////////////////
const routeDelete = router.route('/delete/:id');

routeDelete.post(async (req, res) => {
    // Get the ID of the employee to delete
    const search = { _id: ObjectId(req.params.id) };

    // Delete the employee from the database
    let employee = await EmployeeController.deleteEmployee(search);

    if (employee) {
        res.redirect('../view');
    } else {
        res.render('error');
    }
});

/////////////////////
/// UPDATE ROUTES
/////////////////////
const routeUpdate = router.route('/update/:id');

routeUpdate.get(async (req, res) => {
    // Get the ID of the employee to update
    const search = { _id: ObjectId(req.params.id) };

    // Get the employee from the database
    let employee = await EmployeeController.findEmployeeById(search);

    if (employee) {
        // Set the form action to post to update
        employee.action = `/update/${req.params.id}`;
        // Load the known employee information into the form
        res.render('update', employee);
    }
});

routeUpdate.post(async (req, res) => {
    // Update the employee based on the given data
    const search = { _id: ObjectId(req.params.id) };
    EmployeeController.updateEmployee(search, req.body).then(res.redirect('../view'));
});

/////////////////////
/// VIEW ROUTES
/////////////////////
const routeView = router.route('/view');

routeView.get(async (req, res) => {
    // Collect all the employees from the database, and display them
    // Although this would be better as a lazy-load, for the sake of the
    // assignment it is done synchronously

    let employees = await EmployeeController.getAllEmployees();
    if (employees) {
        res.render('view', {employees: employees});
    } else {
        res.render('error');
    }
});

/////////////////////
/// MISC ROUTES
/////////////////////
router.route('/error').get((req, res) => {
    // Route for generic errors in case a static URL is needed
    res.render('error');
});

router.route('/query').get((req, res) => {
    res.render('query');
});

router.route('*').get((req, res) => {
    // Unknown routes are brought to the home page
    res.redirect('create');
});




// Expose the router to the application
module.exports = router;
