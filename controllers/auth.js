const passport = require("passport");
const hasher = require("../database/hasher");
const LocalStrategy = require("passport-local").Strategy;
const CustomStrategy = require("passport-custom");
const userqueries = require("../database/userqueries");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const config = require("../config").jwtconfig;

const userAuthenticationStrategy = new LocalStrategy({
   usernameField: "username",
   passwordField: "password" 
},(username,password,done) => {
    console.log(username + " " + password)
    userqueries.findUser(username)
    .then((user) => {
        if(!user) return done(null,false);
        hasher.compare(password,user.Password)
        .then((isMatch) => {
            if(isMatch)
                return done(null,user);
            return done(null,false)
        })
        .catch((err) => {
            return done(err,false);
        })
    })
    .catch((err) => {
        return done(err,false);
    })
})

const userExitsStrategy = new CustomStrategy((req,done) => {
    let user = req.query.username;
    if (!user)
        return done(null,false);
    userqueries.findUser(user)
    .then((foundUser) => {
        if (!foundUser)
            return done(null,false);
        return done(null,user);
    })
    .catch((err) => {
        return done(err,false);
    })
})


const JwtStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
    secretOrKey: config.secret
},(payload,done) => {
    console.log(payload)
    userqueries.findUser(payload)
    .then((user) => {
        if (user)
            return done(null,user)
        return done(null,false)
    })
    .catch((err) => {
        return done(err,false);
    })
})

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use("user-auth",userAuthenticationStrategy);
passport.use("user-exits",userExitsStrategy);
passport.use("jwt-strat",JwtStrategy);