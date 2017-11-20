//Define tables
const Sequelize = require("sequelize");

const userSchema = {
    UName: { type: Sequelize.STRING, primaryKey: true },
    Password: { type: Sequelize.STRING },
}

module.exports = {
    userSchema: userSchema
}