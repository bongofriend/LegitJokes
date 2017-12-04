const queries = require("../database/userqueries")
const jwt = require("jsonwebtoken");
const hasher = require("../database/hasher");
const jwtconfig = require("../config").jwtconfig;



//Handle requests and responses for Endpoint /api/users

/**
 * @api {post} /user/register Register an Account
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

/**
 * @api {post} user/authenticate Exchange Username and Password for a JWT
 * @apiGroup User
 * @apiParam {String} password Password of the User
 * @apiParam {String} username Username of the User
 * @apiSuccessExample {json} Response: 
 *{
 *  Status: "Ok"
 *  token: "UserToken"   
 *}
 */
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
                        var token = jwt.sign(user.Username,jwtconfig.secret)
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

/**
 * @api {get} /user/coins Increase/Decrease Coins
 * @apiGroup User
 * @apiParam {String} type "up"/"down" for increasing/decreasing Coins by 1
 * @apiHeaderExample {json} Authorization-Example: 
 *        {
 *          "Authorization": Bearer Token
 *        }
 */
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
                res.json({
                    Status: "Error",
                    Message: "Could not Update Coins"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.json({
                Status: "Error",
                Message: "An Error Occured"
            })
        })
    } else {
        res.json({
            Status: "Error",
            Message: "Missing Query Parameter"
        })
    }
}

