//Define tables
const Sequelize = require("sequelize");
const moment = require("moment");

const userSchema = {
    UName: { type: Sequelize.STRING, primaryKey: true },
    Password: { type: Sequelize.STRING },
};

const jokeSchema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        defaultValue: moment.utc().format("YYYY-MM-DD")
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    category: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    upvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    downvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }

}

const voteSchema = {
    voteid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    jokeid: {
        type: Sequelize.INTEGER,
        //allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        //allowNull: false
    },
    votetype: {
        type: Sequelize.STRING,
        //allowNull: false
    }
}

module.exports = {
    userSchema: userSchema,
    jokeSchema: jokeSchema,
    voteSchema: voteSchema
}