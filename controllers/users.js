const queries = require("../database/userqueries")
const jwt = require("jsonwebtoken") 
const hasher = require("../database/hasher") 
const errorms = require("./errorsms")
const jwtconfig = require("../config").jwtconfig 

//handle user registeration
exports.postUsers = function(req, res) {
    let username = req.body.username 
    let password = req.body.password 
    if (username && password) {
        queries.insertUser(username,password)
        .then((result) => {
            if (result){
                res.json({
                    Status: "Ok",
                    Message: "Registering was successful"
                })
            } else {
                res.json(errorms.usernameTaken) 
            } 
        })
        .catch((err) => {
            console.log(err) 
            res.json(errorms.errorGeneral)
        })
    } else {
        res.json(errorms.missingFields)
    }
}

//check if username and password were found in the database and return a jwt when successful 
exports.authenticateUser = function(req,res){
    let username = req.body.username 
    let password = req.body.password
    if (!username || !password){
        res.json(errorms.missingFields)
    } else {
        queries.findUser(username)
        .then((user) => {
            if (!user) {
                res.json(errorms.userNotFound)
            } else {
                hasher.compare(password,user.Password)
                .then((isMatch) => {
                    if (isMatch){
                        var token = jwt.sign(user.Username,jwtconfig.secret)
                        res.json({
                            Status: "Ok",
                            token: token,
                            coins: user.Coins
                        })
                    } else {
                        res.json(errorms.checkPassword)
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err) 
            res.json(errorms.errorGeneral)
        })
    }
}

exports.updateCoins = function(req,res){
    let username = jwt.decode(req.header("Authorization").replace("Bearer ",""))
    let coin = req.query.type
    if (username && coin){
        queries.updateCoins(username,coin)
        .then((isSuccess) => {
            if(isSuccess){
                res.json({
                    Status: "Ok",
                    Message: "Coins updated"
                })
            } else {
                res.json(errorms.coinsNotUpdated)
            }
        })
        .catch((err) => {
            console.log(err)
            res.json(errorms.errorGeneral)
        })
    } else {
        res.json(errorms.missingFields)
    }
}

