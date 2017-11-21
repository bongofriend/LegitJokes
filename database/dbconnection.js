const Sequelize = require("sequelize");
const tables = require("./tables");
const Promise = require("bluebird");

//Database configuration
const _config = {
    host: "",
    user: "",
    password: "",
    database: ""
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

//TODO: Add hooks for before/after executing a query
module.exports = {
    Users: Users
}
