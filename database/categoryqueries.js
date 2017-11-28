const Categories = require("./dbconnection").Categories;
const Jokes = require("./dbconnection").Jokes;
const Promise = require("bluebird")

const getAllCategories = function(){
    return Categories.findAll()
}

const getRandomJoke = function(){
    return new Promise((resolve,reject) => {
        Categories.findAll()
        .then((cats) => {
            if (cats){
                let randomCat = getRandomInt(0,cats.length - 1);
                Jokes.findAll({
                    where: {
                        category: randomCat
                    }
                })
                .then((jokes) => {
                    if(jokes){
                        let randomJoke = getRandomInt(0,jokes.length - 1);
                        return resolve(jokes[randomJoke])
                    } else {
                        return resolve(false)
                    }
                })
                .catch((err) => {
                    return reject(err);
                })
            } else {
                return resolve(false)
            }
        })
        .catch((err) => {
            return reject(err);
        })
    })
}

const getRandomInt = function(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    getAllCategories: getAllCategories,
    getRandomJoke: getRandomJoke
}