const Jokes = require("./dbconnection").Jokes;
const userqueries = require("../database/userqueries");
const Promise = require("bluebird");


var insertJoke = function(username,content,category){
    return new Promise((resolve,reject) => {
        userqueries.findUser(username)
        .then((user) => {
            if(user){
                Jokes.create({
                    username: username,
                    content: content,
                    category: category,
                    id: 0,
                })
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
    return Jokes.findAll({
        where:{
            category: category
        }
    })
}

var getJokeById = function(id){
    return Jokes.findOne({
        where: {
            id: id
        }
    })
}

var voteJoke = function(id,vote){
    return new Promise ((resolve,reject) => {
        getJokeById(id)
        .then((result) => {
            if (result){
                if (vote == "up"){
                    Jokes.upsert({
                        id: id,
                        upvotes: result.upvotes + 1
                    })
                    return resolve(true)
                }
                else if (vote === "down"){
                        Jokes.upsert({
                            id: id,
                            downvotes: result.downvotes + 1
                        })
                        return resolve(true)
                }
            } else {
                return resolve(false);
            }
        })
        .catch((err) => {
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
