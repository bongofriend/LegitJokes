const Categories = require("./dbconnection").Categories;
const Jokes = require("./dbconnection").Jokes;
const Promise = require("bluebird")

const getAllCategories = function(){
    return Categories.findAll()
}

const getRandomJoke = function(){
    return new Promise((resolve,reject) => {
        Jokes.findAll()
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
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    getAllCategories: getAllCategories,
    getRandomJoke: getRandomJoke
}