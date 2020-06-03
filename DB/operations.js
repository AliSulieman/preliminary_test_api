import models from "../models";



function AddUserToDatabase(usrInfo) {
    return models.user
        .create({
            name: usrInfo.name,
            email: usrInfo.email,
            surname: usrInfo.surname,
        })
        .then((user) => {
            //if succeeded return to engineer the info added
            if (user) {
                return user
            }
        })
        //If adding to database failed, check what kind of error occured
        .catch((err) => {
            //This means user email constraint broke
            if (err.message == "Validation error") {
                throw ("User Exist")
            }
            //Any other issues inserting to database, return issue to user
            else {
                throw ("Issue Inserting In Database")
            }
        });
}

function CheckIfUserExist(useremail) {

    return models.user.findOne({
            where: {
                email: useremail
            }
        }).then((userInfo) => {
            if (userInfo === null) {
                throw Error("User email does not exist")
            } else {
                return userInfo
            }
        })
        .catch((err) => {
            throw Error(err.message)
        })
}

function AddProject(projectInfo) {
    return CheckIfUserExist(projectInfo.email)
        .then((userInfo) => {
            return models.project.create({
                    name: projectInfo.name,
                    text: projectInfo.text,
                    status: projectInfo.status,
                    userID: userInfo.id
                }).then((projectData) => {
                    return projectData
                })
                .catch((err) => {
                    if (err.message == "Validation error") {
                        throw Error("Project name exist")
                    } else {
                        throw Error(err)
                    }
                })
        }).catch((err) => {
            throw Error(err.message)
        })
}




function CheckIfProjectExist(projectName) {

    return models.project.findOne({
            where: {
                name: projectName
            }
        }).then((projectInfo) => {
            if (projectInfo === null) {
                throw Error("Project does not exist")
            } else {
                return projectInfo
            }
        })
        .catch((err) => {
            throw Error(err.message)
        })
}

function AddTask(taskInfo) {
    return CheckIfUserExist(taskInfo.email)
        .then((userInfo) => {
            return CheckIfProjectExist(taskInfo.projectName)
                .then((projectInfo) => {
                    return models.task.create({
                            name: taskInfo.name,
                            description: taskInfo.description,
                            score: taskInfo.score,
                            status: taskInfo.status,
                            userID: userInfo.id,
                            projectID: projectInfo.dataValues.id
                        }).then((taskData) => {
                            return taskData
                        })
                        .catch((err) => {
                            throw Error(err)
                        })
                })
                .catch((err) => {
                    throw Error(err.message)
                })
        })
        .catch((err) => {
            throw Error(err.message)
        })
}




function GetUsers(filters, offset, limit) {
    if (Object.keys(filters).length == 0) {
        return models.user.findAndCountAll().then((users) => users)
            .catch((err) => {
                throw Error(err.message)
            })
    } else {
        return models.user.findAll({
                limit: limit,
                offset: offset,
                where: {
                    ...filters
                }
            }).then((users) => users)
            .catch((err) => {
                throw Error(err.message)
            })
    }

}


export default {
    AddUserToDatabase: AddUserToDatabase,
    AddProject: AddProject,
    AddTask: AddTask,
    GetUsers: GetUsers
}