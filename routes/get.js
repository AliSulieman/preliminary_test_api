const express = require("express");
const router = express.Router()
import models from '../models'
const url = require('url');
import Db from "../DB/operations";

function formatList(data, limit, offset, totalUsers) {
    let myList = data.map(el => el.get({
        plain: true
    }))
    let totalPages = Math.floor(totalUsers / limit)
    if (totalPages < 1) {
        totalPages = 1
    }
    myList.push({
        "Page number": offset,
        "Page Size": limit,
        "Total Pages": totalPages
    })

    return myList

}

//Create projec
//gets all of the courses
router.get("/api/users", (req, res) => {

    const queryObject = url.parse(req.url, true).query;

    let filtersUserProvided = {}

    if (queryObject.name) {
        filtersUserProvided["name"] = queryObject.name
    }
    if (queryObject.surname) {
        filtersUserProvided["surname"] = queryObject.surname
    }

    let page = 1
    const pageSize = 5

    if (queryObject.page) {
        page = parseInt(queryObject.page)
    }
    const offset = page * pageSize
    const limit = pageSize
    Db.GetUsers(filtersUserProvided, offset, limit)
        .then((users) => {
            res.send(formatList(users.rows, limit, page, users.count))
        })
        .catch(() => res.status(400).json({
            message: "Issue Retrieving users"
        }));

    //contact DB
    //get users 
    // return users

});

// app.get("/api/courses/:id", (req, res) => {
//     const course = courses.find((c) => c.id == parseInt(req.params.id));
//     if (!course) {
//         res.status(404).send("no id was found");
//     }
//     res.send(course);
// });
// // gets  a single courses based on the id passed in the request
// app.get("/api/courses/:id", (req, res) => {
//     const course = courses.find((c) => c.id == parseInt(req.params.id));
//     if (!course) {
//         res.status(404).send("no id was found");
//     }
//     res.send(course);
// });
module.exports = router;