const passport = require("passport");
const hasher = require("../database/hasher");
const userqueries = require("../database/userqueries");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const config = require("../config").jwtconfig;

const JwtStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
    secretOrKey: config.secret
},(payload,done) => {
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

passport.use("jwt-strat",JwtStrategy);