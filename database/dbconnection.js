const Sequelize = require("sequelize");
const tables = require("./tables");
const Promise = require("bluebird");
const moment = require("moment");

//Database configuration
const _config = {
    host: "localhost",
    user: "root",
    password: "mertos2001",
    database: "jokeapi"
};

//Etablish connection to DB
const db = new Sequelize(_config.database, _config.user, _config.password, {
    host: _config.host,
    dialect: "mysql",
    logging: false
});

//Test conncetion
db.authenticate()
    .then(() => {
        console.log("Connection to Database etablished")
    })
    .catch((err) => {
        console.log("Could not Connect to Database");

    });

//Define used models
const Users = db.define("Users", tables.userSchema, {
    timestamps: false
});

const Jokes = db.define("Jokes",tables.jokeSchema,{
    timestamps: false
});

 
//TODO: Add hooks for before/after executing a query
Jokes.beforeCreate(function(joke,options){
    return new Promise((resolve,reject) => {
        Jokes.count()
        .then(count => {
            count += 1;
            joke.id = count;
            return resolve(true);
        })
        .catch((err) => {
            return reject(err);
        })
    }) 
})

module.exports = {
    Users: Users,
    Jokes: Jokes
}
