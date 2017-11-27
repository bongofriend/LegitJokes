const queries = require("../database/jokequeries");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");

/**
 * @api {post} /joke/submit Submit a Joke with a Category
 * @apiGroup Jokes
 * @apiParam {String} content Contents of the Joke
 * @apiParam {Number} category Category ID for the Joke
 * @apiHeader {String} Authorization A Unique JWT Based on the Username
 * @apiHeaderExample {json} Authorization-Example: 
 *         {
 *             "Authorization": Bearer Token
 *         }
 */
exports.postJoke = function(req,res){
    let username = jwt.decode(req.header("Authorization").replace("Bearer ",""))
    let content = req.body.content;
    let category = req.body.category;
    if (username && content && category){
        queries.insertJoke(username,content,category)
        .then((isSuccess) => {
            if (isSuccess){
                res.json({
                    Status: "Ok",
                    Message: "Joke saved"
                })
            } else {
                res.json({
                    Status: "Error",
                    Message: "Could not find Username"
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
    else {
        res.json({
            Status: "Error",
            Message: "Missing fields"
        })
    }
}

/**
 * @api {get} /joke Get Jokes From A Category
 * @apiGroup Jokes 
 * @apiParam {Number} category CategoryID of the desired Jokes
 * @apiHeader {String} Authorization A Unique JWT Based on the Username
 * @apiSuccessExample {json} Response: 
 *{
 *  Status: "Ok"
 *  data:[{
 *      "id": 1,
 *      "content": "Was ist gelb, hat einen Arm und kann nicht schwimmen? Ein Bagger",
 *      "date": "2017-11-27",
 *      "username": "hanswurst",
 *      "category": 0,
 *      "upvotes": 0,
 *      "downvotes": 0
 *  }]                
 *}
 * @apiHeaderExample {json} Authorization-Example: 
 *{
 *  "Authorization": Bearer Token
 *}
 */
exports.getJoke = function(req,res){
    let category = req.query.category;
    let limit = req.query.limit;
    if (category){
        if(!limit){
            limit = 20;
        }
        queries.getJokesByCategory(category,limit)
        .then((data) => {
            res.json({
                Status: "Ok",
                data: data
            })
        })
        .catch((err) => {
            res.json({
                Status: "Error",
                Message: "Could fetch jokes"
            })
        })
    } else {
        res.json({
            Status: "Error",
            Message: "Catergory field is missing"
        })
    }
}

/**
 * @api {get} /vote Vote for a Joke
 * @apiGroup Jokes
 * @apiParam {Number} ID ID of the Joke
 * @apiParam {String} vote "up" for Upvote and "down" for Downvote
 * @apiHeader {String} Authorization A Unique JWT Based on the Username
 * @apiHeaderExample {json} Authorization-Example: 
 *         {
 *             "Authorization": Bearer Token
 *         }
 */
exports.voteForJoke = function(req,res){
    let id = req.query.id
    let vote = req.query.vote
    let username = jwt.decode(req.header("Authorization").replace("Bearer ",""))
    if (id && vote && username){
        queries.voteJoke(id,vote,username)
        .then((isSuccess) => {
            if(isSuccess){
                res.json({
                    Status: "Ok",
                    Message: "Vote saved"
                })
            } else {
                res.json({
                    Status: "Error",
                    Message: "Could not save vote"
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
            Message: "Missing fields"
        })
    }
}