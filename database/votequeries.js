const Votes = require("./dbconnection").Votes;
const Promise = require("bluebird");

var insertVote = function(username,jokeid,votetype){
    return new Promise((resolve,reject) => {
        getVote(username,jokeid,votetype)
        .then((isFound) => {
            if (isFound)
                return resolve(false)
            Votes.create({
                username: username,
                jokeid: jokeid,
                votetype: votetype,
            })
            .then((ins) => {
                if (ins)
                    return resolve(true)
                return resolve(false)
            })
            .catch((err) => {
                console.log(err)
                return reject(err)
            })
        })
        .catch((err) => {
            console.log(err)
            return reject(err)
        })
    })
}

var getVote = function(username,jokeid,votetype){
    return new Promise((resolve,reject) => {
        Votes.findOne({
            where: {
                username: username,
                jokeid: jokeid,
                votetype: votetype,
            }
        })
        .then((vote) => {
            if(vote)
                return resolve(true)
            return resolve(false)
        })
        .catch((err) => {
            console.log(err)
            return reject(err)
        }) 
    }) 
}

module.exports = {
    insertVote: insertVote,
    getVote: getVote
}