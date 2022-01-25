const express = require('express');
const router = express.Router();
const dbo = require('../db/connection');
const e = require("express");

const routeCreate = router.route('/create');

routeCreate.get(((req, res) => {
    res.render('create', {action: '/create'});
}));

routeCreate.post( (req, res) => {
    dbo.getDatabase().collection('employees').insertOne(req.body, (error) => {
        if (error) {
            res.redirect('error');
        } else {
            res.redirect('view');
        }
    });
});

const routeDelete = router.route('/delete/:id');

routeDelete.delete((req, res) => {
    const search = { _id: req.body.id };
    dbo.getDatabase().collection('employees').deleteOne(search, ((error, result) => {
        if (error) {
            res.redirect('error');
        } else {
            res.redirect('view');
        }
    }));

});

const routeUpdate = router.route('/update')

const routeView = router.route('/view');

routeView.get(async (req, res) => {
    dbo.getDatabase().collection('employees').find({}).toArray((error, data) => {
        if (error) {
            res.redirect('error');
        } else {
            res.render('view', {employees: data});
        }
    })
});

router.route('/error').get(((req, res) => {

}));

module.exports = router;
