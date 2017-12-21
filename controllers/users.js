const queries = require("../database/userqueries")
const jwt = require("jsonwebtoken");
const hasher = require("../database/hasher");
const errorms = require("./errorsms")
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
                res.json(errorms.usernameTaken) 
            } 
        })
        .catch((err) => {
            console.log(err);
            res.json(errorms.errorGeneral)
        })
    } else {
        res.json(errorms.missingFields)
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
 *  coins: 
 *}
 */
exports.authenticateUser = function(req,res){
    let username = req.body.username;
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
                            Status: "Success",
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
            console.log(err);
            res.json(errorms.errorGeneral)
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

