const Vote = require("./dbconnection").Vote;
const Promise = require("bluebird");

var insertVote = function(username,jokeid,votetype){
    return new Promise((resolve,reject) => {
        getVote(username,jokeid,votetype)
        .then((votes) => {
            if(votes && votes.length == 1){
                return resolve(false)
            } else {
            let vote = new Vote({
                Username: username,
                JokeID: jokeid,
                VoteType: votetype
            });
            vote.save()
            .then((ins) => {
                if (ins)
                    return resolve(true)
                return resolve(false)
            })
            .catch((err) => {
                console.log(err)
                return reject(err)
            })
        }})
        .catch((err) => {
            console.log(err)
            return reject(err)
        })
    })
}

var getVote = function(username,jokeid,votetype){
    return new Promise((resolve,reject) => {
        Vote.find({
            Username: username,
            JokeID: jokeid,
        })
        .then((votes) => {
            if(votes)
                return resolve(votes)
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