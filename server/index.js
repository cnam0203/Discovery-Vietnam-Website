const express = require('express');
var app = express();
var path = require('path')

var cookieParser = require('cookie-parser');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, '../uploads');
    },
    filename: function(req, file, callback) {
        console.log(file.originalname);
        var path = req.url.split('/');
        var extension = file.originalname.split('.');
        var fileName = path[path.length - 1] + "." + extension[extension.length - 1];
        callback(null, fileName);
    }
})

var upload = multer({storage:storage}).single('myfile');



app.use(cookieParser());

// app.use(function(req, res, next) {
//     console.log(req.url);
//     next();
// })
app.use(express.static(path.join(__dirname, '../asset')));
app.use(express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
});

app.post('/upload/:id', function(req, res) {
    upload(req, res, function(err) {
        if(err) {
            return res.end('Err')
        } else {
            res.end('File is uploaded successfully');
        }
    })
})

app.get('/cookie', (req, res) => {
    res.cookie('facebook', 'demain');
    res.send('cookie is set');
})

app.use('/static', express.static(path.join(__dirname, '../uploads')))

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


app.listen(process.env.PORT || 5000)


