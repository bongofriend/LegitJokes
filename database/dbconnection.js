const mongoose = require("mongoose");
const Promise = require("bluebird");
const schemas = require("./models");
const autoInc = require("mongoose-sequence")(mongoose);
const dbconfig = require("../config").dbconfig;

mongoose.Promise = Promise;
mongoose.connect("mongodb://" + dbconfig.host + "/" + dbconfig.database,{useMongoClient:true});
mongoose.connection.on("error",console.error.bind(console,"Connection Error:"));
mongoose.connection.once("open",() => {
    console.log("Connection To Database Etablished");
});

schemas.jokeSchema.plugin(autoInc,{inc_field: "JokeID"});
schemas.categorySchema.plugin(autoInc,{inc_field: "CategoryID"});

module.exports = {
    User: mongoose.model("User",schemas.userSchema),
    Joke: mongoose.model("Joke",schemas.jokeSchema),
    Vote: mongoose.model("Vote",schemas.voteSchema),
    Category: mongoose.model("Category",schemas.categorySchema),
}

