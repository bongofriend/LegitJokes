const Category = require("./dbconnection").Category
const Joke = require("./dbconnection").Joke 
const Promise = require("bluebird")

//db queries for categories
const getAllCategories = function(){
    return Category.find()
    .select("-_id CategoryID Category")
}

const getRandomJoke = function(){
    return new Promise((resolve,reject) => {
        Joke.find()
        .select("-_id JokeID Username Content Date Category Upvotes Downvotes")
        .then((jokes) => {
            if(jokes){
                let rand = getRandomInt(0,jokes.length - 1)
                return resolve(jokes[rand])
            }
            return resolve(false)
        })
        .catch(err => {return reject(err)})
    })
}

const getRandomInt = function(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min 
}

module.exports = {
    getAllCategories: getAllCategories,
    getRandomJoke: getRandomJoke
}