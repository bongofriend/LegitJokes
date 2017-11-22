const queries = require("../database/userqueries")

//Handle requests and responses for Endpoint /api/users
exports.postUsers = function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        queries.insertUser(username,password)
        .then((result) => {
            if (result){
                res.json({
                    Status: "Ok",
                    Message: "Registering was successful"
                })
            } else {
                res.json({
                    Status: "Error",
                    Message: "Username already in use"
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
    } else {
        res.json({
            Status: "Error",
            Message: "Username/Password is missing"
        })
    }
}

