const Jokes = require("./dbconnection").Jokes;
const userqueries = require("../database/userqueries");
const Promise = require("bluebird");

var joke;

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
                    joke = res
                    return resolve(true);
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

module.exports = {
    getJokesByCategory: getJokesByCategory,
    insertJoke: insertJoke
}