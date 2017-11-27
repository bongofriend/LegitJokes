const queries = require("../database/categoryqueries");

exports.getCategories = function(req,res){
    queries.getAllCategories()
    .then((cats) => {
        if(cats){
            res.json({
                Status: "Ok",
                data: cats
            })
        } else {
            res.json({
                Status: "Error",
                Message: "Could not fetch Categories"
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.json({
            Status: "Error",
            Message: "An Error Occured"
        })
    })
}