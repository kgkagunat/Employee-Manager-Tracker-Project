const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

function initialize(passport){
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ where: { email: email } });
        if (user == null){
            return done(null, false, {message: 'Invalid email or password'});
        }
        try{
            if (await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid email or password'});
            }
        } catch (err){
            return done(err);
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email' }, authenticateUser));
    
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize;
