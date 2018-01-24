const jokequeries = require("../database/jokequeries") 
const categoryqueries = require("../database/categoryqueries") 
const jwt = require("jsonwebtoken") 
const errorms = require("./errorsms") 

//fetch parameters from request and insert joke into database 
exports.postJoke = function(req,res){
    let username = jwt.decode(req.header("Authorization").replace("Bearer ",""))
    let content = req.body.content 
    let category = req.body.category 
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
            console.log(err) 
            res.json(errorms.errorGeneral)
        })
    }
    else {
        res.json(errorms.missingFields)
    }
}

//return all jokes of a given category
exports.getJoke = function(req,res){
    let category = req.query.category 
    if (category){
        jokequeries.getJokesByCategory(category)
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

//handle voting for jokes
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
            console.log(err) 
            res.json(errorms.errorGeneral)
        })
    } else {
        res.json(errorms.missingFields)
    }
}

//fetch a random joke from a random category
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
        console.log(err) 
        res.json(errorms.errorGeneral)
    })
}