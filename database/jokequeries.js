const Joke = require("./dbconnection").Joke;
const userqueries = require("../database/userqueries");
const votequeries = require("../database/votequeries");
const Promise = require("bluebird");


var insertJoke = function(username,content,category){
    return new Promise((resolve,reject) => {
        userqueries.findUser(username)
        .then((user) => {
            if(user){
                let joke = new Joke({
                 Content: content,
                 Username: username,
                 Category: category   
                });
                joke.save()
                .then((res) => {
                    if(res)
                        return resolve(true);
                    return resolve(false);
                })
                .catch((err) => {
                    return reject(err);
                })
            }
            else{
                return resolve(false);
            }
        })
        .catch((err) => {
            return reject(err);
        })
    })
}

var getJokesByCategory = function(category,limit){
    return Joke.find({
        Category: category
    })
}

var getJokeById = function(id){
    return Joke.findOne({
        JokeID: id
    })
}

var voteJoke = function(id,vote,username){
    return new Promise ((resolve,reject) => {
        getJokeById(id)
        .then((result) => {
           if (result){
               votequeries.insertVote(username,id,vote)
               .then((isSuccess) => {
                   if(isSuccess){
                   if (vote === "up"){
                    Joke.findOneAndUpdate({
                        JokeID: id
                    },{
                        Upvotes: result.Upvotes + 1
                    })
                    return resolve(true) 
                   } else if (vote === "down"){
                    Joke.findOneAndUpdate({
                        JokeID: id
                    },{
                        Upvotes: result.Upvotes - 1
                    })
                    return resolve(true)
                   }
                }
                   else
                        return resolve(false)
               })
               .catch((err) => {
                   console.log(err)
                   return reject(err)
               })
           } else {
               return resolve(false)
           }
        })
        .catch((err) => {
            console.log(err)
            return reject(err)
        })
    })
}

module.exports = {
    getJokesByCategory: getJokesByCategory,
    getJokeById: getJokeById,
    voteJoke: voteJoke,
    insertJoke: insertJoke
}

