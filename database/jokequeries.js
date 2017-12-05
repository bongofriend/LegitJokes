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
    }).select("-_id JokeID Username Content Category Upvotes Downvotes")
}

var getJokeById = function(id){
    return Joke.findOne({
        JokeID: id
    }).select("-_id JokeID Username Content Category Upvotes Downvotes")
}

var voteJoke = function(id,vote,username){
    return new Promise ((resolve,reject) => {
        getJokeById(id)
        .then((joke) => {
            if(!joke) return resolve(false);
            if(vote === "up"){
                Joke.findOneAndUpdate({JokeID: id},{Upvotes: joke.Upvotes + 1})
                .catch((err) => {return reject(err)});
            }    
            else if(vote === "down") {
                Joke.findOneAndUpdate({JokeID: id},{Downvotes: joke.Downvotes + 1})
                .catch((err) => {return reject(err)});                
            }
            votequeries.insertVote(username,id,vote)
            .then((isSuccess) => {return resolve(isSuccess)})
            .catch((err) => {return reject(err)})
        })
    .catch((err) => {return reject(err)});
    })
}

module.exports = {
    getJokesByCategory: getJokesByCategory,
    getJokeById: getJokeById,
    voteJoke: voteJoke,
    insertJoke: insertJoke
}
