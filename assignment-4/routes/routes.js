const express = require('express');
const router = express.Router();

/////////////////////
/// INDEX ROUTE
/////////////////////
const routeHome = router.route('/');

routeHome.get(((req, res) => {
    res.render('home');
}));

routeHome.post((async (req, res) => {
    if (req.body.grid) {
        res.render('home', req.body);
    } else {
        res.redirect('error');
    }
}));

/////////////////////
/// MISC ROUTES
/////////////////////

router.route('*').get(((req, res) => {
    // Unknown routes are brought to the home page
    res.render('error');
}));

// Expose the router to the application
module.exports = router;
