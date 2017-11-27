const Categories = require("./dbconnection").Categories;

const getAllCategories = function(){
    return Categories.findAll()
}

module.exports = {
    getAllCategories: getAllCategories
}