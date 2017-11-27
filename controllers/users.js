const queries = require("../database/userqueries")
const jwt = require("jsonwebtoken");
const hasher = require("../database/hasher");
const jwtconfig = require("../config").jwtconfig;


//Handle requests and responses for Endpoint /api/users

/**
 * @api {post} /user/register Register an Acoount
 * @apiName PostUser  
 * @apiGroup User
 * 
 * @apiParam {String} username Username
 * @apiParam {String} password Password
 */
exports.postUsers = function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        queries.insertUser(username,password)
        .then((result) => {
            if (result){
                res.json({
                    Status: "Ok",
                    Message: "Registering was successful"
                })
            } else {
                res.json({
                    Status: "Error",
                    Message: "Username already in use"
                }) 
            } 
        })
        .catch((err) => {
            console.log(err);
            res.json({
                Status: "Error",
                Message: "An Error Occured"
            })
        })
    } else {
        res.json({
            Status: "Error",
            Message: "Username/Password is missing"
        })
    }
}

exports.authenticateUser = function(req,res){
    let username = req.body.username;
    let password = req.body.password
    if (!username || !password){
        res.json({
            Status: "Error",
            Message: "Username/Password is missing"
        })
    } else {
        queries.findUser(username)
        .then((user) => {
            if (!user) {
                res.json({
                    Status: "Error",
                    Message: "Could not find User"
                })
            } else {
                hasher.compare(password,user.Password)
                .then((isMatch) => {
                    if (isMatch){
                        var token = jwt.sign(user.UName,jwtconfig.secret)
                        res.json({
                            Status: "Success",
                            token: token
                        })
                    } else {
                        res.json({
                            Status: "Error",
                            Message: "Check your password"
                        })
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                Status: "Error",
                Message: "An Error Occured"
            })
        })
    }
}

