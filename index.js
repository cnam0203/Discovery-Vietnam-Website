const express = require('express');
var app = express();

app.use(express.static(__dirname + '/asset'));
app.get('/', (req, res) => {
    res.send('Hello Express')
});

app.get('/hello', (req, res) => {
    res.send('Hello Express!!!')
});

app.listen(process.env.PORT || 5000)

