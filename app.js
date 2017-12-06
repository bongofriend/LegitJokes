const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controllers/users");
const jokeController = require("./controllers/jokes");
const authController = require("./controllers/auth");
const categoryController = require("./controllers/category");
const passport = require("passport");
const cors = require("cors");

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

//Set up middleware
app.use(cors())
app.use(express.static(__dirname + "/views"))
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Config route
router.route("/user/register").post(userController.postUsers);
router.route("/user/authenticate").post(userController.authenticateUser);
router.route("/joke/submit").post(passport.authenticate("jwt-strat",{session: false}),jokeController.postJoke);
router.route("/user/coins").get(passport.authenticate("jwt-strat",{session: false}),userController.updateCoins);
router.route("/joke").get(jokeController.getJoke);
router.route("/joke/random").get(jokeController.getRandomJoke);
router.route("/categories").get(categoryController.getCategories);
router.route("/vote").get(passport.authenticate("jwt-strat",{session: false}),jokeController.voteForJoke);
app.use("/api",router);
app.use("/",(req,res) => {
	res.render(__dirname + "/api-docs-generator/index")
})


//Listen on defined port
app.listen(port,function(err){
	if (err){
		console.log("An Error Occured");
	} else {
		console.log("Server Listening On Port " + port);
	}
})