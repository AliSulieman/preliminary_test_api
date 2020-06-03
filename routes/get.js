const express = require("express");
const router = express.Router()
import models from '../models'

//gets all of the courses
router.get("/api/users", (req, res) => {

    models.user.findAll().then((data) => res.send(data))

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