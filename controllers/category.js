const queries = require("../database/categoryqueries") 
const errorms = require("./errorsms")

//fetch all available categories
exports.getCategories = function(req,res){
    queries.getAllCategories()
    .then((cats) => {
        if(cats){
            res.json({
                Status: "Ok",
                data: cats
            })
        } else {
            res.json(errorms.categoryError)
        }
    })
    .catch((err) => {
        console.log(err) 
        res.json(errorms.errorGeneral)
    })
}