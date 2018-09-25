var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = (app, User) => {
    app.post('/register', function (req, res) {
        var password = req.body.password;
        var password2 = req.body.password2;

        if (password == password2) {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });

            User.createUser(newUser, function (err, user) {
                if (err) throw err;
                res.send(user).end()
            });
        } else {
            res.json({ error: "Passwords dont match" });
        }
    });


    passport.use(new LocalStrategy(
        function (username, password, done) {
            User.getUserByUsername(username, function (err, user) {
                if (err) throw err;
                if (!user) {
                    return done(null, false, { message: 'Unknown User' });
                }
                User.comparePassword(password, user.password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Invalid password' });
                    }
                });
            });
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.getUserById(id, function (err, user) {
            done(err, user);
        });
    });

    // Endpoint to login
    app.post('/login',
        passport.authenticate('local'),
        function (req, res) {
            res.redirect('/');
        }
    );

    // Endpoint to get current user
    app.get('/user', function (req, res) {
        res.json(req.user);
    })


    // Endpoint to logout
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

}