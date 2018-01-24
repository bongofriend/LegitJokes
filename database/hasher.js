var bcrypt = require("bcrypt-nodejs") 
var Promise = require("bluebird") 
const rounds = 10 

//helper methods for hashing and comparing hashes

exports.hash = function(data){
    return new Promise((resolve,reject) => {
        bcrypt.genSalt(rounds,(err,salt) => {
            if(err){
                return reject(err) 
            }
            bcrypt.hash(data,salt,null,(err,hash) => {
                if (err){
                    return reject(err) 
                }
                return resolve(hash) 
            })
        })
    })
}

exports.compare = function(data,hash){
    return new Promise((resolve,reject) => {
        bcrypt.compare(data,hash,(err,isMatch) => {
            if (err){
                return reject(err)
            }
            return resolve(isMatch)
        })
    })
}