const User = require("./dbconnection").User 
const Promise = require("bluebird") 

//user related db queries

var findUser = function(username){
    return User.findOne({
        Username: username
    })
}

var insertUser = function(username,password){
    return new Promise((resolve,reject) => {
        findUser(username)
        .then((user) => {
            if(user) return resolve(false) 
            let newUser = new User({
                Username: username,
                Password: password
            }) 
            newUser.save()
            .then((isSuccess) => {
                if(isSuccess) return resolve(true) 
                return resolve(false)
            })
            .catch((err) => {return reject(err)}) 
        })
        .catch((err) => {return reject(err)}) 
    })
}

var updateCoins = function(username,coin){
    return new Promise((resolve,reject) => {
        findUser(username)
        .then((user) => {
            if(!user) return resolve(false) 
            let newCoins = user.Coins 
            if (coin === "up") newCoins+=1 
            else if(user.Coins > 0 && coin === "down") newCoins-=1 
            else return resolve(false) 
            User.findOneAndUpdate({Username: username},{Coins: newCoins})
            .then((isSuccess) => {
                if(isSuccess) return resolve(true) 
                return resolve(false) 
            })
            .catch((err) => {return reject(err)}) 
        })
        .catch((err) => {return reject(err)}) 
    })
}

module.exports = {
    insertUser: insertUser,
    findUser: findUser,
    updateCoins: updateCoins
}


