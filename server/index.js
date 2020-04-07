const express = require('express');
var app = express();
var path = require('path')
var fs = require('fs')
var mongo = require('mongodb');

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



app.use(cookieParser());


app.use(express.static(path.join(__dirname, '../asset')));
app.use(express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../uploads')))


app.get('/emotion', (req, res) => {
        var spawn = require('child_process').spawn;
        var process = spawn('python', ["./emotion.py", '../uploads/url.png'])
        process.stdout.on('data', function(data) {
            res.send(data.toString())
        })
})

app.get('/getRandomImage/:id', (req, res) => {
   var reqUrl = req.url
   var index = reqUrl.split('/')
    var link = '../uploads/' + index[index.length - 1] + '.jpg';
    console.log(link)
    res.sendFile(path.join(__dirname, link))
})

app.post('/uploadNewRecipe', function(req, res) {
    upload(req, res, function(err) {
        if(err) {
            res.end('Error')
        } else {
            MongoClient.connect(url, function(err, db) {
                if (err) res.end(err)
                console.log('Connect OK')
                var dbo = db.db("mydb");
                var collection = dbo.collection('recipe');
                console.log("Create ok")
                var recipe = {user_id: 1, recipe: JSON.parse(req.body.recipe)}
                collection.insert([recipe], function (err, result) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    }
                    db.close();
                });
              });
            res.end('OK')
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
              console.log(err);
            } 
            db.close();
            console.log(result.length)
            res.send({recipes: result})
          });
      });
})

app.get('/getRecipeInfo/:id', function(req, res) {
    console.log('getRecipeInfo')
    const path = req.url.split('/')
    const index = path[path.length-1]
    console.log(index)
    MongoClient.connect(url, function(err, db) {
        if (err) res.end(err)
        console.log('Connect OK')
        var dbo = db.db("mydb");
        var collection = dbo.collection('recipe');
        collection.find({_id: ObjectId(index)}).toArray(function (err, result) {
            if (err) {
                console('wrong')
              console.log(err);
            } 
            db.close();
            console.log(result.length)
            res.send({recipe: result[0].recipe})
          });
      });
})

app.post('/upload/url', function(req, res) {
    console.log('uploaded')
    upload(req, res, function(err) {
        if(err) {
            console.log('err')
            return res.end('Err')
        } else {
            var { PythonShell } = require('python-shell');
            var options = {
                mode: 'text',
            };

            PythonShell.run('./emotion.py', options, function (err, results) {
                if (err) { 
                    console.log(err)
                    res.end(err)
                }
                console.log('results: %j', results);
                res.send(results)
            });
        }
    })
})

app.post('/upload/:id', function(req, res) {
    upload(req, res, function(err) {
        if(err) {
            return res.end('Err')
        } else {
            console.log(req.body)
        }
    })
})


app.get('/cookie', (req, res) => {
    res.cookie('facebook', 'demain');
    res.send('cookie is set');
})

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send('<b>hello Nam</b><ul><li>nam</li><li>hoi</li></ul>')
});


app.get('/hello', (req, res) => {
    var obj = {
        hello: 'bonjour',
        bonjour: 'xin chao'
    }
    res.send(JSON.stringify(obj))
});

app.get('/hi', (req, res) => {
    res.redirect('/hello')
})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
});



app.listen(process.env.PORT || 5000)


