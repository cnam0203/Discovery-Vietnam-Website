const express = require('express');
var app = express();
var path = require('path')
var fs = require('fs')
var mongo = require('mongodb');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const {register, login, logout} = require('./controllers/UserControllers')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const FacebookStrategy  = require('passport-facebook').Strategy;

const config = require('./config');
const bcrypt = require('bcrypt')
const User = require('./models/UserModels')

const db = mongoose.connection;

dotenv.config()

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

var ObjectId = require('mongodb').ObjectID;

var cookieParser = require('cookie-parser');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../uploads');
    },
    filename: function(req, file, callback) {
        console.log(file.originalname)
        var fileName = file.originalname
        callback(null, fileName);
    }
})

var upload = multer({storage:storage}).array('image')


app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cookieParser());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})

app.use(session({
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
    },
    secret: 'work hard',
    key: 'sid'
}));


// Passport session setup. 
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(obj, done) {
done(null, obj);
});


// Sử dụng FacebookStrategy cùng Passport.
passport.use(new FacebookStrategy({
    clientID: config.facebook.facebook_key,
    clientSecret:config.facebook.facebook_secret ,
    callbackURL: config.facebook.callback_url,
    profileFields: ['id', 'email', 'displayName', 'photos']
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
                console.log(profile)
                User.findOne({email: profile.emails[0].value, password: profile.id}, (err, user) => {
                    if (err) {
                        console.log(err, '\n')
                        return done(err)
                    }
                    if (user == null) {
                        const user = new User({
                            email: profile.emails[0].value,
                            password: profile.id,
                            username: profile.displayName
                        })
                        user.save((err, result) => {
                            if(err) {
                                console.log(err)
                                return done(null, false, {message: 'Cannot create new user'})
                            } else {
                                console.log(result)
                                return done(null, result)
                            }
                        })
                    } else {
                        console.log(user)
                        return done(null, user)
                    }
                })

                // User.find({email: profile.emails[0].value}, (err, result) => {
                //     if (err) return done(err)
                //     else {
                //         let find = false;
                //         let findUser = {};
                //         for (var index = 0; index < result.length; index++) {
                //             let user = result[index];
                //             let info = bcrypt.compareSync(profile.id, user.password)
                //             if (info) {
                //                 find = true;
                //                 findUser = user
                //                 break;
                //             }
                //         }
                //         if (find) {
                //             console.log('Find', findUser)
                //             return done(null, findUser)
                //         }
                //         else {
                //             bcrypt.hash(profile.id, 10, function(err, hash){ //Mã hóa mật khẩu trước khi lưu vào db
                //                 if (err) {return done(err)}
                //                 const user = new User({
                //                     email: profile.emails[0].value,
                //                     password: hash,
                //                     username: profile.displayName
                //                 })
                //                 user.save((err, result) => {
                //                     if(err) {return done(err)}
                //                     return done(null, result)
                //                 })
                //             })
                //         }
                //     }
                // })
        });
    }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../asset')));
app.use(express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../dist')));
mongoose.set('useCreateIndex', true)


app.post('/register', [
    check('email', 'Invalid email.').isEmail(),
    check('username', 'Require username').isLength({ min: 5 }),
    check('password', 'Password must be more than 6 characters').isLength({ min: 5 }),
    check('password', 'Password must contain at least 1 lowercase letter, 1 uppercase letter and 1 number').matches('[0-9]').matches('[a-z]').matches('[A-Z]')
  ], (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array())
            return res.status(422).json({ validator: errors.array() });
        }
        next()
    }, register
)

app.post('/login', (req, res, next) => {
    console.log(req.session)
        if (req.session && req.session.user) {
            return res.json({errors: 'You must be Logout in to Login continue'});        
        } else {
            return next();
        }
    }, login
)

app.get('/logout', (req, res, next) => {
        console.log(req.session)
        if (req.session.passport) {
            req.logout()
            req.session.destroy(function(err) {
                if(err) {
                    console.log('err')
                    return res.json({errors: err});
                } else {
                    console.log(req.session)
                    return res.redirect('/logOutSuccess')
                }
            });
        }
        else if (req.session.user) {
            return next();
        } else {
            return res.json({errors: 'You must be logged in to view this page.'});
        }
    }, logout
)

app.get('/logOutSuccess', (req, res) => {
    res.json({logout: 'success'})
})

app.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email']}));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect : '/loginFacebookOK', failureRedirect: '/loginFacebookFailed' }),
 );

app.get('/loginFacebookOK', (req, res) => {
     console.log(req.session.passport.user)
     res.json({user: req.session.passport.user})
 })

app.get('/loginFacebookFailed', (req, res) => {
     console.log('Failed')
     res.json({errors: 'Failed to authenticate with Facebook'})
 })

// app.get('/loginGoogleOK', (req, res) => {
//     console.log(req.session.passport.user)
//     res.json({user: req.session.passport.user})
// })

// app.get('/loginGoogleFailed', (req, res) => {
//     console.log('Failed')
//     res.json({errors: 'Failed to authenticate with Goole'})
// })

app.post('/uploadNewRecipe', function(req, res) {
    upload(req, res, function(err) {
        if(err) {
            res.json({errors: err})
        } else {
            MongoClient.connect(url, function(err, db) {
                if (err) res.json({errors: err})
                console.log('Connect OK')
                var dbo = db.db("mydb");
                var collection = dbo.collection('recipe');
                console.log("Create ok")
                var recipe = {user_id: 1, recipe: JSON.parse(req.body.recipe)}
                collection.insert([recipe], function (err, result) {
                    if (err) {
                        res.json({errors: err})
                    } else {
                      console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    }
                    db.close();
                });
              });
            res.json({result: 'OK'})
        }
    });
})

app.get('/getRecipes', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) res.end(err)
        console.log('Connect OK')
        var dbo = db.db("mydb");
        var collection = dbo.collection('recipe');
        collection.find().toArray(function (err, result) {
            if (err) {
              res.json({errors: err})
            } 
            db.close();
            console.log(result.length)
            res.json({recipes: result})
          });
      });
})

app.get('/getRecipeInfo/:id', function(req, res) {
    console.log('getRecipeInfo')
    const path = req.url.split('/')
    const index = path[path.length-1]
    console.log(index)
    MongoClient.connect(url, function(err, db) {
        if (err) res.json({errors: err})
        console.log('Connect OK')
        var dbo = db.db("mydb");
        var collection = dbo.collection('recipe');
        collection.find({_id: ObjectId(index)}).toArray(function (err, result) {
            if (err) {
              res.json({errors: err})
            } 
            db.close();
            console.log(result.length)
            res.json({recipe: result[0].recipe})
          });
        })
})


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
});



app.listen(process.env.PORT || 5000)


