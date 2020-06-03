const express = require("express");
const router = express.Router();
import models from "../models";
const Joi = require("joi");
import Db from "../DB/operations";

//Create User Request
router.post("/api/users", (req, res) => {

    const usrInfo = req.body;
    //User data schema to ensure input data is valid
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        surname: Joi.string().min(3).required(),
    };

    return Joi.validate(usrInfo, schema)
        //If the schema is valid then add to database
        .then(() => {
            Db.AddUserToDatabase(usrInfo)
                .then((userInfo) => {
                    res.send(userInfo);
                }).catch(err => res.status(400).json({
                    message: err.message
                }))
        })
        //Return that the schema failed because of invalid body
        .catch(() => res.status(400).json({
            message: "Invalid Request body"
        }));
});

//Create project request
router.post("/api/project", (req, res) => {

    const projectInfo = req.body;
    //Project data schema to ensure input data is valid
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required(),
        text: Joi.string().min(3).required(),
        status: Joi.string().allow("active", "inactive", "declined", "completed").valid().required()
    };
    return Joi.validate(projectInfo, schema)
        .then(() => {
            Db.AddProject(projectInfo)
                .then((addedData) => {
                    res.send(addedData)
                })
                .catch((err) => {
                    if (err.message == "Project name exist") {
                        res.status(400).json({
                            message: "Name exists"
                        })
                    } else {
                        res.status(400).json({
                            message: err.message
                        })
                    }
                })
        })
        //Return that the schema failed because of invalid body
        .catch(() => res.status(400).json({

            message: "Invalid Request body"
        }));
});


//Create Task request
router.post("/api/task", (req, res) => {

    const taskInfo = req.body;
    //Project data schema to ensure input data is valid
    const schema = {
        name: Joi.string().min(3).required(),
        description: Joi.string().required(),
        email: Joi.string().required(),
        score: Joi.number().required(),
        status: Joi.string().allow("active", "inactive", "declined", "completed").valid().required(),
        projectName: Joi.string().required()
    };
    return Joi.validate(taskInfo, schema)
        .then((taskInfo) => {
            Db.AddTask(taskInfo)
                .then((addedData) => {
                    res.send(addedData)
                })
                .catch((err) => {
                    res.status(400).json({
                        message: err.message
                    })
                })
        })
        //Return that the schema failed because of invalid body
        .catch((err) => {
            res.status(400).json({
                message: "Invalid Request body"
            })
        })
});

module.exports = router;