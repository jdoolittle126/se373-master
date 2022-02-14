const {save} = require('debug');

require('../models/employee.model');

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
let debug = require('debug')('assignment-5');

const sendJsonResponse = (res, status, content) => {
    res.status(status)
    res.json(content)
}


module.exports.EmployeeController = {

    createEmployee: (data, callback) => {
        Employee.create(data, callback);
    },
    deleteEmployee: (search, callback) => {
        Employee.deleteOne(search, callback);
    },
    findEmployeeById: (id, callback) => {
        Employee.findById(id).lean().exec().then(employee => callback(employee));
    },
    getAllEmployees: (callback) => {
        Employee.find({}).lean().exec().then(employees => callback(employees)) ;
    },
    updateEmployee: (id, body, callback) => {
        Employee.findByIdAndUpdate(id, body).exec().then(callback());
    }

}



/*
module.exports.readReviewsAll = (req, res) =>



    Review.find().exec().then(results =>{
        sendJSONResponse(res,200,results)
    }).catch(err =>{
        sendJSONResponse(res,404,err)
    })
}


module.exports.reviewReadOne = (req,res)=>{
    if(req.params && req.params.reviewid){
        debug("Getting a single review with id = ", req.params.reviewid)

        Review.findById(req.params.reviewid).exec().then(results =>{
            sendJSONResponse(res,200,results)
        }).catch(err =>{
            sendJSONResponse(res,404,{
                "message":"Review not found"
            })
        })
    }else{
        sendJSONResponse(res,404,{
            "message":"Review id not found"
        })
    }


}


 */
