import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

var music = document.getElementById("music")
music.addEventListener('ended', function() {
    music.pause();
    var i = Math.floor((Math.random() * 17) + 1);
    var source = '/static/' + i.toString() + '.mp3'
    music.src = source
    music.load();
    music.play();
})

ReactDOM.render(
        <App/>,
    document.getElementById("root")
)