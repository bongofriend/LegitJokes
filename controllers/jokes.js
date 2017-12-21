const jokequeries = require("../database/jokequeries");
const categoryqueries = require("../database/categoryqueries");
const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const errorms = require("./errorsms");

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
        jokequeries.insertJoke(username,content,category)
        .then((isSuccess) => {
            if (isSuccess){
                res.json({
                    Status: "Ok",
                    Message: "Joke saved"
                })
            } else {
                res.json(errorms.userNotFound)
            }
        })
        .catch((err) => {
            console.log(err);
            res.json(errorms.errorGeneral)
        })
    }
    else {
        res.json(errorms.missingFields)
    }
}

/**
 * @api {get} /joke Get Jokes From A Category
 * @apiGroup Jokes 
 * @apiParam {Number} category CategoryID of the desired Jokes
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
 */
exports.getJoke = function(req,res){
    let category = req.query.category;
    let limit = req.query.limit;
    if (category){
        if(!limit){
            limit = 20;
        }
        jokequeries.getJokesByCategory(category,limit)
        .then((data) => {
            res.json({
                Status: "Ok",
                data: data
            })
        })
        .catch((err) => {
            res.json(errorms.jokeNotGet)
        })
    } else {
        res.json(errorms.errorGeneral)
    }
}

/**
 * @api {get} /vote Vote for a Joke
 * @apiGroup Jokes
 * @apiParam {Number} id ID of the Joke
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
        jokequeries.voteJoke(id,vote,username)
        .then((isSuccess) => {
            if(isSuccess){
                res.json({
                    Status: "Ok",
                    Message: "Vote saved"
                })
            } else {
                res.json(errorms.voteNotSaved)
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
 * @api {get} /joke/random Get A Random Joke
 * @apiGroup Jokes
 * 
 */
exports.getRandomJoke = function(req,res){
    categoryqueries.getRandomJoke()
    .then((joke) => {
        if(joke){
            res.json({
                Status: "Ok",
                data : joke
            })
        } else {
            res.json(errorms.jokeNotGet)
        }
    })
    .catch((err) => {
        console.log(err);
        res.json(errorms.errorGeneral)
    })
}